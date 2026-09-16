# Performance Budget

以下是 vertical slice 的預設目標，不是宣稱所有裝置都能固定 60 fps。每案可調整，但必須在開發前寫下新的數字與理由。

## 1. 預算表

| 指標 | Mobile target | Desktop target |
|---|---:|---:|
| 首屏關鍵傳輸量（壓縮後） | ≤ 2.5 MB | ≤ 4 MB |
| 延遲載入後互動體驗總量 | ≤ 10 MB | ≤ 20 MB |
| 單一 hero GLB（壓縮後） | ≤ 5 MB | ≤ 8 MB |
| 同時可見三角形 | ≤ 350k | ≤ 750k |
| Draw calls | ≤ 80 | ≤ 120 |
| 同時可見材質 | ≤ 25 | ≤ 40 |
| 一般貼圖長邊 | ≤ 2048 | ≤ 4096（需裝置分流） |
| DPR 上限 | 1.5 | 2 |
| 穩態 frame rate | p50 ≥ 55、p5 ≥ 40 | p50 ≥ 55、p5 ≥ 45 |
| WebGL texture memory 估算 | ≤ 128 MB | ≤ 256 MB |

不要只看平均 fps。至少記錄 p50、p5、最長 frame、載入峰值與 30 秒後是否持續降速。

## 2. 優化順序

1. 減少與壓縮資產：貼圖尺寸、材質數、draw calls、重複 mesh、不可見內容。
2. 分章載入與釋放；避免一開始把全站模型塞進 GPU。
3. 烘焙可烘焙的光影，合併靜態 mesh，必要時 LOD／instancing。
4. 關閉或降低陰影、SSR、DOF、Bloom、粒子等昂貴效果。
5. 最後才調 DPR；不得用全屏模糊、霧或顆粒掩飾低解析。

## 3. Runtime 規則

- `renderer.setPixelRatio(Math.min(devicePixelRatio, deviceBudget))`。
- 後處理開啟時確認 AA 路徑，不能假設 `antialias: true` 仍有效。
- 顏色貼圖使用 sRGB；normal／roughness／metalness 保持 linear。
- 設定 tone mapping 與曝光，並用已授權 HDR environment 或烘焙環境。
- 離屏、分頁背景與頁面隱藏時暫停或降頻 RAF／影片／音訊。
- resize、pointer、visibility、media query listener 全部要 cleanup。
- scene 切換時 dispose geometry、material、texture、render target 與 loader 產生的暫存。
- 不在 frame loop 建立 geometry、material、vector 陣列或執行 `getBoundingClientRect()`。

## 4. 動態降級觸發

以能力與實測為準，不只看 user agent。可參考：低核心數、低記憶體、WebGL capability、首 120 frames 的 frame time、熱降頻跡象與 `prefers-reduced-motion`。

降級順序：post-processing → shadow quality → particle count → reflection quality → DPR → video／image fallback。每一步都要防止構圖突然改變。

## 5. 驗收方法

- 測試冷快取與熱快取。
- 測試 390×844、768×1024、1440×900；再加一台真實 iPhone／Android 與一台一般筆電。
- 至少完整來回捲動三次，檢查 GPU／heap 是否持續成長。
- 切換分頁 10 秒再回來，確認時鐘、影片與相機不跳躍。
- 保留版本、裝置、瀏覽器、日期、build ID 與測量值。
