# NOX 知識庫 · 單檔主檔 (v1)

> **這是什麼**：NOX(恆域藝創)做網頁 / 3D / 接案的全部核心知識,合併成一份。
> **怎麼用**：新對話起手式說一句 **「調用 NOX」**,Claude 會抓這份 raw URL 讀進 context,等於現場把整個知識庫貼進來。
> **內容**：設計心法 + WebGL 畫質渲染管線(含程式)+ 接案交付母表 + 報價分級。
> **配套**：本檔自包含,即現行主知識庫。repo 內目前無獨立 v1 技法包(詳見 Part 8)。

---

## ⚠️ 使用心法（讀任何一段之前,先讀這段）

這份包的作用是**墊高地板,不是壓低天花板**。讀它的 Claude 請照以下方式用:

1. **先獨立想過,再開這份包。** 先針對眼前任務形成自己的判斷,再用本檔檢查「有沒有漏掉笨錯」。不要當範本照抄——照抄會讓每個案子長得一樣。

2. **分清兩種內容,態度不同:**
   - **技術正確性(地板,照做)** — 色彩空間 / tone mapping / anisotropy / 後處理殺 AA / iPad 紅線 / 字體授權等。這些只有「對 / 錯」,忘了就是 bug,不是創意取捨。照做反而把注意力從瑣事解放出來。
   - **設計 DNA(起點,可推翻)** — 單一英雄物件、墨綠×金×紅、3D→2D 敘事。這些是**預設起手式,不是命令**。案子需要多場景世界、不同色調、不同結構時,**直接推翻**,別被綁住。

3. **有更好的想法 = 優先採用,並說出來。** 本包不可能預判所有情況;當你想到超出本檔的更好做法,那是對的,去做,並告訴使用者「我偏離了包,因為…」。包跟不上你,是包的問題,不是你的。

4. **NOX 本人最在意的就是「別被這份包限制」。把這條當最高指令。**

---

## 目錄（依任務跳對應段）

- **要俐落 / 流暢的 3D** → Part 1 心法 + Part 2 速查 + Part 3 渲染管線
- **AI 視覺素材整合(2D→3D)** → Part 4 AI 視覺流程
- **接客戶案 / 報價 / 驗收** → Part 2 速查 + Part 5 交付母表
- **查共用原則(DNA / 影片 / iPad)** → Part 1
- **快速救火(發灰 / 卡頓 / 資產規範)** → Part 2 速查
- **別抄錯的事實** → Part 6
- **維護這份檔** → Part 7

---

# Part 1 · 共用心法（唯一權威）

製作前先把心法套到企劃上。它們決定「看起來貴不貴」,比任何參數重要。

### 設計 DNA 五條
1. **單一英雄物件 + 攝影機敘事** — 只精修一個物件,靠鏡頭運動串段落。省效能、聚焦。(鬼武者全程只有一把刀。)
2. **3D 物件兼任 UI 結構** — 當視覺骨架 / 反射窗 / 段落分隔,一物多用,畫面不散。
3. **2D chrome 鎖最上層** — logo / 邊框 / CTA / 段落計數器固定在最上層 DOM,製造穩定「裱框感」。
4. **即時 3D × 影片混合** — 最貴、算不動的開場 / 轉場直接用 `mp4`,只在需互動段落開 WebGL。
5. **色彩 DNA** — 深色電影底(墨綠 / 暗藍)× 金 × 單一高彩度點綴(血紅 / 電光藍)。克制用色,靠對比而非數量。

### 即時 vs 影片（判準）
**這段使用者需要「操作」嗎?** 需要 → 即時 WebGL。不需要 → 預渲染影片 / mp4 疊層。
布料 / 流體 / 毛髮 / 複雜鏡頭轉場一律影片,別硬扛。**技術管線吃掉 80% 差距,剩 20% 用影片補。** 這是資源分工,不是能力問題。

### iPad / 行動硬約束（不可違反）
- `pixelRatio ≤ 2`
- 模型 **Draco**(幾何)+ 貼圖 **KTX2 / Basis**,未壓縮大貼圖會讓 iPad 當掉
- 離窗 / 切分頁暫停 RAF(`IntersectionObserver` + `document.hidden`)
- 投影燈 ≤ 3(陰影最貴)；material instance 盡量共用
- 盯 `renderer.info` 的 draw call 與三角形數；切場景 `dispose()` 不漏記憶體

---

# Part 2 · 80% 速查（多數任務看這段就夠）

### 畫質「一定要設」(發灰 / 塑膠的解藥,細節→Part 3)
```js
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
colorTexture.colorSpace = THREE.SRGBColorSpace;        // 只有顏色貼圖要設
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
// + 掛 HDR envMap (scene.environment)；有後處理時 AA 改用 MSAA/SMAA
```

### 手感「一定要做」
- 相機 `lerp / slerp` 阻尼,不要硬設座標
- ScrollTrigger `scrub: 0.8`(不要 `true`)
- Lenis + render 同一個 `gsap.ticker`,**scroll 事件內零運算**

### 資產分工（每案照抄）
- 線條 icon / logo → **SVG**｜透明立繪 → **PNG(含 alpha)**｜大面積點陣 → **WebP**
- 多語系字體 → **Noto Sans 家族**(含 CJK,防豆腐塊 ☐)；授權 **SIL OFL 1.1**(可免費商用嵌入)
- 重影片 → **YouTube 嵌入**(頻寬轉嫁 + 自適應串流 + 導流官方頻道)

### 接案必問（漏一個就漏報價）
多語系?｜要跑廣告 / 追蹤?｜跨國合規(GDPR/CCPA)?｜高併發發表日?｜電商導流?
→ 任一 yes,翻 Part 5 對應層,當加購模組報價。

---

# Part 3 · WebGL 畫質渲染管線（完整,含程式）

> 業餘與專業的畫質差距,**80% 出在 rendering pipeline 沒設對**,不是模型或才華。先補管線。

## 3.1 俐落 (crisp) — 非協商項,順序即 CP 值排序

**① 色彩管理 + Tone Mapping（90% 發灰元兇）**
```js
renderer.outputColorSpace = THREE.SRGBColorSpace;       // r152+ 名稱
renderer.toneMapping = THREE.ACESFilmicToneMapping;     // 電影感的黑、通透的金
renderer.toneMappingExposure = 1.0;                     // 視場景微調 0.8–1.4
colorTexture.colorSpace = THREE.SRGBColorSpace;         // 只有顏色貼圖(albedo/emissive)
// normal / roughness / metalness / ao 是資料貼圖,保持預設 Linear,設錯會壞
```
GLTFLoader 載入的模型通常已正確,**自己手動載的貼圖一定要檢查。**

**② HDR 環境反射 envMap（瞬間變專業第一名）**
```js
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
const pmrem = new THREE.PMREMGenerator(renderer);
pmrem.compileEquirectangularShader();
new RGBELoader().load('/hdri/studio.hdr', (hdr) => {
  const envMap = pmrem.fromEquirectangular(hdr).texture;
  scene.environment = envMap;       // 所有 StandardMaterial 自動吃反射
  // scene.background = envMap;      // 需要可見背景才開
  hdr.dispose(); pmrem.dispose();
});
```
反射深度不是燈光,是 envMap。免費 HDRI：**Poly Haven**。

**③ 各向異性過濾 anisotropy（救斜面閃爍 / 模糊）**
```js
texture.anisotropy = renderer.capabilities.getMaxAnisotropy();  // 每張貼圖
```

**④ 抗鋸齒陷阱（鋸齒粗糙感常見真兇）**
掛了 EffectComposer 後,`antialias:true` 會**失效**。二選一補回：
```js
// A：WebGL2 MSAA render target（畫質好、最簡單）
const rt = new THREE.WebGLRenderTarget(w, h, { samples: 4 });
const composer = new EffectComposer(renderer, rt);
// B：SMAA pass（相容性廣）
import { SMAAPass } from 'three/addons/postprocessing/SMAAPass.js';
composer.addPass(new SMAAPass(w * dpr, h * dpr));
```
沒做後處理時,保留 `antialias:true` 即可。

**⑤ 解析度**：`pixelRatio` 上限 2；貼圖要高解析降採樣,不是低解析硬撐放大(模糊常因源檔太小)。

## 3.2 流暢 (smooth) — 捲動與相機

**① 相機阻尼**
```js
camera.position.lerp(targetPos, 0.08);      // 0.06–0.1
camera.quaternion.slerp(targetQuat, 0.08);
```
**② scrub 平滑**：`scrub: 0.8`(0.6–1),不要 `true`。
**③ Lenis + GSAP 正確整合（單一 RAF,杜絕卡頓）**
```js
import Lenis from 'lenis';
const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
  renderer.render(scene, camera);   // Three.js 也在這 render,全部同迴圈
});
gsap.ticker.lagSmoothing(0);
```
**絕不**在 `scroll` callback 內算 3D / 讀 DOM 尺寸(layout thrash = 卡頓主因)。
**④ 每幀不重建**：不在 loop 內 new geometry / 重算頂點 / `getBoundingClientRect`。

## 3.3 材質與打光（去塑膠味）
**單燈 + 純色 MeshStandard = 塑膠。** 三招疊：
1. **PBR + envMap 打底**。金屬 metalness≈1、roughness 低；有機體 metalness=0、roughness 0.4–0.8。
2. **Fresnel 邊緣光 (rim light)**：
```glsl
float fresnel = pow(1.0 - dot(normalize(vNormal), normalize(vViewDir)), 3.0);
vec3 rim = fresnel * rimColor * rimStrength;   // 加到最終 color
```
3. **法線貼圖**給低模 / 程序化幾何假裝細節(先 `computeVertexNormals()` 做 smooth normal)。
打光基本盤：一盞 key light(有方向、投影)+ 環境靠 envMap。「黑得乾淨」=少燈 + 強對比 + envMap,不是多燈。

## 3.4 滾動相機旅程骨架（鬼武者結構,可直接改）
```
1. Three.js + GLTFLoader 載入 hero GLB(刀 / 鯨 / 主物件)
2. renderer 套 3.1 全部(色彩 / envMap / anisotropy / AA)
3. 攝影機關鍵幀陣列 [{ pos, lookAt, atProgress }] 對應捲動進度
4. ScrollTrigger(scrub 0.8)把 scroll 進度 → 插值出 targetPos / targetQuat
5. render loop 內 camera.lerp 逼近 target(3.2①)+ Lenis 同迴圈(3.2③)
6. 內容卡純 DOM/CSS(鑽石徽章 + 標題 + 內文)疊 <canvas> 上,ScrollTrigger 控進場
7. 金框 chrome + CTA + 段落計數器 = 固定定位最上層 DOM
8. intro.mp4 / transition.mp4 疊層,算不動的交給影片
```
節奏沿用 **3D→2D→3D→2D**：鏡頭運動串接,停定點時 2D 內容卡淡入。

## 3.5 渲染出貨檢查
```
[ ] outputColorSpace = sRGB  [ ] ACESFilmic + exposure 調過
[ ] 顏色貼圖 sRGB / 資料貼圖 Linear  [ ] HDR envMap 已掛
[ ] 每張貼圖 anisotropy = max  [ ] 後處理時 AA 補回
[ ] 主物件 Fresnel rim / 低模 normal map  [ ] 貼圖源夠高解析
[ ] 相機 lerp/slerp  [ ] scrub 0.6–1  [ ] Lenis+render 同 ticker
[ ] loop 內無重建幾何  [ ] pixelRatio≤2  [ ] Draco+KTX2  [ ] 離窗暫停 RAF
```

---

# Part 4 · AI 視覺素材整合流程（2D 生成圖 → 3D 管線）

> 定位:AI 生成圖是**配料,不是主角**。主流「Figma → Framer → 2D 影片 hero」那套是**入門款 / 快案用**;NOX 的進階款是「AI 背景板 + 即時 3D + 鏡頭敘事」。同一張素材放進 3D 管線,價值高得多。**別淪為 AI 素材組裝工——那沒有護城河。**

## 4.1 素材來源（優先自產）
- 優先**自己生**(NOX / Higgsfield 影像工具,Nano Banana Pro 等):on-brand、零授權風險、IP 是自己的。
- 付費庫(如 sceneai.art)只當**逆向工程參考 / mood board**,不當素材農場。要用付費項目就訂閱,別爬付費牆(違反 ToS / 侵權,接商業案風險高);免費項目先讀 License 確認可否商用。

## 4.2 資產前置優化（與 iPad 紅線同源）
- 靜態圖 → **WebP**,高解析降採樣
- Hero 影片 → 剪**無縫 loop**、壓到 ~5MB、MP4 / WebM
- ⚠️ **iOS Safari 雷**:`loop muted playsinline` 只是基本盤;自動播放影片仍有解碼 / 記憶體成本,5MB loop 在 iPad 上可能 jank。搭 `IntersectionObserver` 離屏暫停(沿用既有 GPU 休眠手法),別讓 hero 影片拖垮行動端。

## 4.3 可讀性與調色
- **漸層 scrim(保文字可讀)**:AI 圖色彩濃,白字會糊。在「視覺層之上、UI 之下」墊一層透明漸層(例:底部 `rgba(0,0,0,.8)` → 頂部 `0`)。這是 2D chrome 的延伸,但目的是可讀性。
- **抽色 → CSS 變數**:從圖提主色 + 輔色設成變數,讓按鈕 / 字 / 3D 燈光跟背景氛圍呼應(接 Part 1 色彩 DNA)。

## 4.4 接進 3D 的三種用法
1. 當 Three.js **貼圖 / matcap / 背景板**,墊在即時 3D 後面
2. 當**前期 mood / 風格探索**,定調後再進 3D
3. Hero = **2D AI 背景 + 前景即時 3D 物件 + chrome 疊層**(三明治)

## 4.5 定位提醒（寫給未來的 instance）
**Framer 不是 NOX 的路;手刻 code(Three.js / GSAP)才是,而且高一階。** 視差(parallax)只是最入門的捲動效果,NOX 的相機旅程(Part 3.4)高好幾階。看到「Figma → Framer → 影片 hero」這類流程,當入門參考就好,別被它帶偏核心定位。

---

# Part 5 · 接案交付母表（完整六層 + 報價分級）

> 用法：**報價時**逐層勾,決定客戶要哪幾層；**驗收時**逐項過,當交付 QA。

## 報價分級速查
| 階 | 適用 | 含哪幾層 | NOX 甜蜜點 |
|---|---|---|---|
| **A 體驗站** | 品牌 / 形象 / 單品發表 | 體驗層 + 基本資產 + 基本 SEO | ⭐ 最強 |
| **B 行銷站** | 要追蹤 / 跑廣告 / A/B | A + 數據行銷 + 合規 | 常見 |
| **C 企業級** | 多語系 / 高併發 / 電商 / 法務嚴 | B + 完整 infra + 完整合規 + CMS | 需協力 |

報價邏輯：**先報體驗層 craft(護城河),infra / 追蹤 / 合規當加購模組往上疊。** 別把 C 階東西免費塞進 A 階報價。

## 第 1 層 體驗層 (WebGL Craft) — 核心,程式見 Part 3
- [ ] DNA 五條(Part 1) ｜ [ ] 畫質俐落 ｜ [ ] 手感流暢 ｜ [ ] iPad 效能

## 第 2 層 基礎設施與工程
- [ ] 靜態資產上 CDN 邊緣(CloudFront / Cloudflare / Vercel Edge / Netlify)→ 拉高 FCP
- [ ] 你的工作流：GitHub Pages / Netlify / Vercel(web 部署,自帶 CDN),階 A/B 夠用
- [ ] 快取策略(長 cache + hash 檔名)
- [ ] Bot 防護(防黃牛 / 爬蟲)｜ [ ] 全站 HTTPS ｜ [ ] 表單端點防濫用
- [ ] CMS 選型 + 多語系路由(`/zh-hant/` + 語言記憶 cookie)+ 客戶可自改文案
- [ ] CI/CD(內容改 → 自動 rebuild → 推 CDN)+ 版本回滾

## 第 3 層 數位資產規範（CP 值最高,每案照抄）
- [ ] 平台 icon / logo 線條 → **SVG**
- [ ] 角色立繪 / 需透明疊底 → **PNG(含 alpha)**
- [ ] 次要 / 大面積點陣 → **WebP**(可再考慮 AVIF)；響應式 `srcset`
- [ ] 多語系字體 → **Noto Sans 家族**(繁中 TC/HK,防豆腐塊)
- [ ] 字體授權 → **SIL OFL 1.1**(可免費商用嵌入,不可單獨販售字體本身);付費字體留授權證明
- [ ] 重影片外包 **YouTube / Vimeo**;短轉場才自託管 mp4,加 poster + lazy load

## 第 4 層 數據與行銷（階 B/C,全部受第 5 層同意管制）
- [ ] GA4(來源 / 停留 / 路徑 / 轉換)
- [ ] 熱點圖 Heatmap：Ptengine / Hotjar / Clarity
- [ ] 廣告轉換 tag(Google Ads)
- [ ] 重定向像素(按渠道裝,別全裝)：Meta ｜ X ｜ TikTok ｜ Reddit
- [ ] SEO 結構化資料：規格用 HTML table / Schema.org → 搶 Featured Snippet
- [ ] OG / Twitter Card(share 圖 1200×630)｜子頁獨立 title/desc/canonical ｜ sitemap + robots

## 第 5 層 隱私與合規（跨國 / 歐盟 / 加州必備）
- [ ] CMP 同意管理(Cookiebot / Osano / 自建)→ 載追蹤前先取得同意
- [ ] Cookie 四類:必要 / 偏好 / 統計 / 行銷,各自可獨立開關
- [ ] 記錄同意狀態(Consent ID + 時間戳),保稽核軌跡
- [ ] 隱私政策頁(區分 session / 持久 cookie,說明用途)
- [ ] CCPA「請勿出售/分享我的個資」｜ 資料去識別化 / 聚合,不可反查
- [ ] 第三方腳本全納入同意閘門,不可先載再問

## 出貨前最終母表（一頁勾完）
```
體驗   [ ] DNA  [ ] 畫質  [ ] 手感  [ ] iPad
infra  [ ] CDN  [ ] Bot  [ ] HTTPS  [ ] CMS/多語系  [ ] CI/CD
資產   [ ] SVG/PNG/WebP  [ ] 字體+OFL  [ ] 影片外包
數據   [ ] GA4  [ ] 熱點圖  [ ] 廣告轉換  [ ] 像素(按渠道)  [ ] Schema
合規   [ ] CMP  [ ] Cookie四類  [ ] 隱私政策  [ ] 同意閘門
SEO    [ ] OG/Card  [ ] 子頁 meta  [ ] sitemap/robots
驗證   [ ] DevTools 核對所有第三方腳本與 cookie 實際存在
```

## 報價話術（直接用）
> 「網站分兩塊:**看得到的體驗(NOX 的 WebGL craft)**,跟**看不到的商業基礎(CDN / 追蹤 / 合規 / 字體授權)**。前者是我們的價值,後者是上線運營的必要模組。我先報體驗,基礎模組依你要跑廣告 / 多語系 / 跨國合規的程度往上加購。」

---

# Part 6 · 鎖死的事實修正（別再抄錯）

1. 拆鬼武者官網時:它是**經典單體 WordPress + Polylang**,**不是** headless + React/Vue。證據(瀏覽域上的 `pll_language` cookie + 伺服器吐 `<br class="sp">` PHP 主題標記)往相反方向走。別亂推銷「全 headless 重構」。
2. 它**不是純 SPA**:首頁=長捲動 3D 體驗,about/character/action/location/products 是**真獨立頁**。
3. 凡「精確 IP / 第三方工具名 / 像素清單」→ **一律 DevTools(Network/Application 分頁)自驗再寫進提案。** 這類具體名目是 AI 分析最易編造的部分。

---

# Part 7 · 維護規約（讓 repo 不亂長）

- **新共用心法** → Part 1（唯一權威,不散進別處）
- **新程式 / 管線技法** → Part 3
- **新接案 / 合規 / 工具** → Part 5 對應層
- **全新主題(GPU 粒子 / shader 庫等)** → Part 3 開新小節或拆獨立檔,並更新目錄
- 重大改動在檔尾留變更註記,版本號遞增

---

# Part 8 · 倉庫現況註記

檢查 `racky0977108658-boop/nox-assets` 後:**並無獨立的「NOX v1」技法包檔案**。
`prompts/` 內目前只有 `spline-hero-integration-prompt.md`;root `README.md` 是 3D 素材資源清單(mrdoob / brunosimon / Poly Haven / glTF-Transform 等)。
- 因此本檔(`NOX.md`)即現行**主知識庫**,內容自包含,不依賴任何 v1 檔。
- 若你手上另有「NOX v1」逐字內容(別處 / 本機),貼來即可併進 Part 1/3。
- 素材資源清單與本檔互補,不重複收錄;需要時一併參考 root `README.md`。

---

_單檔主檔 v1 — 觸發語「調用 NOX」。出處:拆解 Capcom《鬼武者 Way of the Sword》官網(體驗層由 NOX 分析,infra/合規層整合自外部分析並修正)。_
