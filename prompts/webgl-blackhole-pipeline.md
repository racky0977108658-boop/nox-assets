# WebGL 黑洞渲染管線(KERR v4 定案)

> 來源實驗:GARGANTUA → KERR → 相對論墜入 + TAA(v1–v4)
> 適用:品牌視覺、畫廊背景、任何需要「測地線扭曲 + 電影級後製」的單檔 HTML 專案
> 環境:WebGL2 + `EXT_color_buffer_float`,iPad Safari 驗證通過(M4 電影級 60fps)

---

## 一、測地線光線追蹤核心

### 1.1 史瓦西彎曲(每步)

幾何單位 rs = 1(M = 0.5)。進場算一次角動量守恆量,之後每步偏折:

```glsl
vec3 hv = cross(pos, dir);        // 只算一次
float h2 = dot(hv, hv);
// 迴圈內:
vec3 acc = -1.5 * h2 * pos / pow(r*r, 2.5);
dir += acc * dt;
pos += dir * dt;
```

光子環、背後吸積盤翻折拱橋、二次成像全部自然湧現,不需手繪。

### 1.2 自適應步長

```glsl
float dt = clamp(r*0.09, 0.02, 0.55) * (r < 4.0 ? 0.5 : 1.0);
```

近視界 0.02 保精度,遠處 0.55 省算力。步數:流暢 160 / 高 250 / 電影級 380。

### 1.3 Kerr 參考系拖曳(Lense–Thirring)

每步把光子「位置與方向」一起繞自轉軸旋轉,即得不對稱光子環:

```glsl
float wd = 2.0 * uSpin * 0.25 / max(r*r*r, 0.2);
float th = wd * dt * 6.0;
// pos 與 dir 同時繞 y 軸旋轉 th
```

### 1.4 Kerr 幾何量

```glsl
float horizonR(float a){ return 0.5*(1.0 + sqrt(max(1.0 - a*a, 0.0))); } // a→1 視界縮半
float iscoR(float a){ return mix(3.0, 0.72, pow(a, 1.4)); }              // 順行 ISCO 近似
```

盤內緣 `rin = max(rH + 0.18, iscoR(a))`。

---

## 二、相對論吸積盤著色

### 2.1 三個物理修正(缺一不可)

```glsl
float beta  = clamp(sqrt(0.5/max(R - rH*0.9, .3)), 0., .78);  // 克卜勒速度
vec3  vDir  = normalize(vec3(-pos.z, 0., pos.x));              // 公轉方向
float D     = 1.0/(gamma*(1.0 - beta*dot(vDir, -rayDir)));     // 都卜勒因子
float gRed  = sqrt(max(1.0 - 1.0/R, .02));                     // 重力紅移
bright *= pow(D, 3.0) * pow(gRed, 1.5);   // 相對論射束 I ∝ D³ → 左右不對稱
tempShift = temp * D * gRed;               // 色溫藍移/紅移
```

### 2.2 差速旋轉旋臂(免手繪)

先把採樣座標「反向旋轉」再取 FBM,內圈 ω ∝ r⁻¹·⁵ 快於外圈,雜訊自動拉成螺旋:

```glsl
float omega = 0.45 / pow(r, 1.5) * 14.0;
vec2 q = rot2(uTime * omega) * pos.xz;
float n = fbm(vec2(log(r)*7.0, atan(q.y,q.x)*3.0)) * ... ;
```

### 2.3 盤面取樣方式

赤道面穿越偵測(`prevY * pos.y < 0`)+ 線性插值命中點 + front-to-back alpha 累積
→ 一條光線可累積多次穿越 = 透鏡後的二次/三次成像。

### 2.4 黑體色溫 ramp

深琥珀 (1,.36,.08) → NOX 金 (1,.72,.30) → 熾白 (1,.96,.88) → 藍移 (.78,.86,1)。

---

## 三、相對論相機(墜入模式)

### 3.1 光行差(相機速度 β 向量餵入 shader)

```glsl
vec3 n = uVel/b;  float g = 1.0/sqrt(1.0-b*b);  float dn = dot(dir,n);
dir = normalize( ((dn + b)*n + (dir - dn*n)/g) / (1.0 + b*dn) );
float dopp = 1.0/(g*(1.0 - b*dot(dir,n)));   // 視野都卜勒
col *= pow(clamp(dopp,.35,2.6), 3.0);        // 前亮後暗 + 前藍後紅色偏
```

### 3.2 時間膨脹遙測

```
dτ = √(1 − rs/r) · √(1 − β²) dt
```

本徵時間 τ 與座標時間 t 分開累積、並排顯示;外界動畫時間乘 `min(8, 1/膨脹係數)` 加速播放(《星際效應》體感)。

### 3.3 墜落動力學

初速 = 圓軌速 × 0.62(次圓軌 → 螺旋內落),半隱式 Euler 4 子步,含後牛頓修正 `(1 + 2.2/r)` 與拖曳旋轉,限速 0.92c。

---

## 四、TAA(無運動向量版)—— 本次最重要教訓

### 4.1 v3 踩坑:未重投影的歷史幀 = 全畫面微殘影

自轉時鏡頭每幀平移 ~2px,固定低混合率(0.09)拿 91% 錯位歷史來疊,觀感直接變軟。
**教訓:沒有 motion vector 的 TAA,混合率必須跟著螢幕像素位移走。**

### 4.2 正確做法(v4)

```js
// 角位移 → 螢幕像素位移
const angPix = (|Δaz| + |Δel|) / FOV_X * W + |Δdist|/dist * W * 0.5;
const blend  = min(0.85, 0.085 + angPix * 0.20);   // 靜止累積、移動即棄
```

配合:
- **Halton(2,3) 16 幀次像素抖動**(靜止時 = 超採樣)
- **3×3 鄰域夾取**(neighborhood clamping)防鬼影
- **銳化補償**:TAA 後 unsharp mask,收斂 0.42、運動歸零

```glsl
vec3 nb = 上下左右四鄰和;
c = max(vec3(0.), c + (c - nb*0.25) * uSharp);
```

- 畫質/自旋切換、視窗 resize 時 `firstFrame = 1` 重置歷史。

### 4.3 徑向動態模糊(墜入高潮)

final pass 沿螢幕中心 8 taps,強度 ∝ β:

```glsl
vec2 p = mix(vUV, vec2(.5), t * uMB * 0.11);
```

---

## 五、HDR 後製管線(定案順序)

```
場景(抖動+光行差) → RGBA16F FBO
→ TAA 解算(ping-pong 歷史)
→ 亮部萃取(smoothstep .55–1.6)降採樣
→ 兩輪水平/垂直分離高斯 Bloom
→ 合成:銳化 → Bloom×1.35 → 曝光 → 暈影 → ACES → 顆粒 0.028 → gamma 0.92
```

- 全程單一 fullscreen triangle(非 quad),省對角線重複片元
- `EXT_color_buffer_float` 不在則退 RGBA8(Bloom 仍可用)

---

## 六、視覺設計教訓

1. **「壓縮感」取決於背景紋理密度,不是彎曲強度。** 彎曲一直是物理正確的,背景太空就讀不出來。解法:4 層星場(密度 ×2.4)、高斯尖銳星點、星等冪律分佈(`pow(hash,3)` 少數亮星)、高頻細塵埃層讓「時空流」可讀。
2. 機位拉近(16.5 → 14.5)讓黑影與光子環佔比放大,壓縮感直接翻倍。
3. 明暗對比三件套:視界純黑 + ISCO 熾白核心 + 暈影 `1 − dot(q,q)*0.85` + gamma 0.92 壓黑。
4. 噴流與自旋做因果綁定(強度 ∝ a²,Blandford–Znajek),互動本身即敘事。

---

## 七、iPad Safari 慣例(沿用)

- `devicePixelRatio` 封頂 2×
- Pointer Events 統一滑鼠/觸控;雙指以 Map 追蹤兩 pointer 距離比縮放
- 慣性:速度 ×0.94/幀衰減
- `touch-action:none` + `overscroll-behavior:none` 防回彈
- safe-area inset、`prefers-reduced-motion` 關自轉
- 面板 `flex-wrap` + 窄幅隱藏 fps/分隔線

---

*NOX 恆域藝創 · 2026-07 黑洞實驗定案*
