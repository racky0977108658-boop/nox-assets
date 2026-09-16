# Storyboard、Camera 與 Motion Language

## 1. 先做 15–20 秒 vertical slice

第一個 slice 只需要四件事：入口、第一次揭露、主體近景、一次有理由的過場。每一鏡先用低成本 animatic 驗證節奏，再決定是否建模或寫 WebGL。

逐鏡規格：

| 欄位 | 內容 |
|---|---|
| progress | 0–1 的開始與結束 |
| duration feel | 快、標準、慢；不要只寫實際秒數 |
| camera | position、target／focus、FOV、roll、景別 |
| subject | 畫面位置、佔比、進出方式 |
| transition | cut、crossfade、遮擋、光變、材質或空間穿越 |
| layers | DOM／image／video／WebGL |
| audio | cue、環境、是否需使用者開啟 |
| fallback | reduced motion 與低階裝置替代畫面 |

## 2. Camera language

- Dolly 建立進入感；orbit 用來揭露形體，不用來炫技。
- 轉場優先靠前景遮擋、光色改變、焦點轉移與 match cut。
- 每一鏡只保留一個主要相機意圖；不要同時 dolly、orbit、roll、zoom。
- Camera path 使用 curve／keyframe，focus path 獨立；避免散落大量猜測座標。
- 必要時用 Theatre.js 做製作期調鏡，輸出確定資料後再決定 runtime 是否保留依賴。
- 手機不是裁切桌機鏡頭；需要重新定義 FOV、主體位置、路徑與轉場遮擋。

## 3. Motion tokens

預設值是共同語言，不是不可改的品牌定律：

| Token | 建議 | 用途 |
|---|---|---|
| micro | 120–220ms | hover、按壓、狀態回饋 |
| ui | 300–500ms | 標題、標籤、面板 |
| reveal | 700–1200ms | 章節揭露、遮罩、光變 |
| cinematic | 1400–3000ms | 鏡頭與主要空間事件 |
| ease-standard | `cubic-bezier(.16,1,.3,1)` | 多數進場與停止 |
| ease-linear | `linear` | scroll progress 映射本身 |

同一個元素不得同時使用超過兩種主要變化。優先 opacity + transform；blur 只作短暫轉場，不能長時間覆蓋主畫面。

## 4. 單一時間軸

```text
Lenis input
  → GSAP ticker
    → ScrollTrigger progress
      → DOM timeline
      → camera target / object state
      → video currentTime（需要時）
      → one render loop
```

- scroll event 只記錄輸入或要求更新，不讀寫大量 DOM、不重建幾何。
- Three.js 相機以 `lerp`／`slerp` 接近 target，避免硬跳。
- Motion／Anime.js 若使用，只控制局部 UI；不得另管主 scroll timeline。
- 音效預設靜音，由使用者主動開啟，並提供明顯狀態。

## 5. Reduced motion

`prefers-reduced-motion` 不是把所有動畫設成 0.01 秒。替代方案應：

- 停止自動漂移、連續旋轉與快速視差。
- 以切換、短淡入或靜態關鍵 frame 呈現同一資訊。
- 保留導覽、CTA、焦點與內容順序。
- 不讓影片或 WebGL 成為唯一可理解內容。
