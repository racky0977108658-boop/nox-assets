# NOX Cinematic Web System v2

NOX 的 3D／動態網站製作知識庫。目標不是堆疊特效，而是製作一支可由使用者控制進度的高級電影：

> Scroll 控制時間，Camera 負責敘事，3D 建立空間，DOM 傳達資訊，特效最後才加入。

## 快速入口

| 你現在要做什麼 | 先讀 |
|---|---|
| 了解完整方法 | [`docs/NOX-CINEMATIC-WEB-SYSTEM-v2.md`](docs/NOX-CINEMATIC-WEB-SYSTEM-v2.md) |
| 拆參考、定美術 | [`docs/01-art-direction-and-reference.md`](docs/01-art-direction-and-reference.md) |
| 寫分鏡、鏡頭與動效 | [`docs/02-storyboard-camera-motion.md`](docs/02-storyboard-camera-motion.md) |
| 決定 3D／影片／DOM 與工程架構 | [`docs/03-architecture-and-assets.md`](docs/03-architecture-and-assets.md) |
| 設效能紅線 | [`docs/04-performance-budget.md`](docs/04-performance-budget.md) |
| 驗收與部署 | [`docs/05-production-qa.md`](docs/05-production-qa.md) |
| 開始一個 15–20 秒原型 | [`docs/templates/VERTICAL-SLICE-SPEC.md`](docs/templates/VERTICAL-SLICE-SPEC.md) |
| 查看現有 GitHub 整理結果 | [`docs/audits/GITHUB-REPOSITORY-AUDIT-2026-09-16.md`](docs/audits/GITHUB-REPOSITORY-AUDIT-2026-09-16.md) |
| 交給 Codex 執行 | [`docs/CODEX-EXECUTION-SPEC.md`](docs/CODEX-EXECUTION-SPEC.md) |

相容舊用法的「調用 NOX」入口仍在 [`prompts/NOX.md`](prompts/NOX.md)，但它現在只負責把 AI 導向需要的模組，不再把全部知識一次塞進 context。

## v2 的製作順序

```text
Art Direction
  → Reference Deconstruction
  → Storyboard
  → Camera Language
  → Asset Strategy
  → Scroll Timeline
  → 3D / Video / DOM 分工
  → Performance Budget
  → Production QA
  → 技術實作
```

技術不再決定設計。React、R3F、GSAP、Lenis、Spline、Shader 都只是已定義畫面之後的執行工具。

## 倉庫定位

- `docs/`：v2 現行規範、Audit、案例與模板。
- `prompts/`：讓 AI 依任務載入正確 v2 模組的入口。

舊版大全、通用粒子 Hero、內嵌 Base64 模型、無授權證據的測試模型、Spline 範例與舊站拷貝已從現行分支移除。它們會增加選型噪音，卻不能直接提高電影級網站的構圖、鏡頭、敘事、效能或交付品質。

## 不可妥協原則

1. 未完成鏡頭表、Art Bible 與資產盤點，不開始整站開發。
2. 第一個交付物永遠是 15–20 秒 vertical slice，不是六章完整網站。
3. 只有需要空間、視角、互動或即時光影時才用 WebGL；其餘優先使用影像、影片或 DOM。
4. GSAP + ScrollTrigger 是主時間軸，Lenis 只負責輸入，R3F／Three.js 只負責渲染；不要建立多套互相競爭的動畫時鐘。
5. 手機版是構圖與資產策略的一部分，不是桌機版降畫質後的殘缺版本。
6. 沒有來源、授權與版本紀錄的素材，不得進入商業成品。
7. 正式部署必須能追溯到同一個 commit，並完成固定座標截圖與真機驗收。

## 現行內容門檻

內容只有在能直接回答下列至少一項時才進入核心：如何拆頂級參考、如何寫分鏡與鏡頭、如何選 3D／影片／DOM、如何守住手機效能、如何完成 production QA。失敗原型只保留萃取後的結論，不保留會被誤用的成品拷貝。

> 授權提醒：此 repo 尚未提供整體 LICENSE；任何未來加入的第三方模型、字體、場景、程式、圖片、影片與音訊，都必須先完成 [`docs/audits/ASSET-LICENSE-REGISTER.md`](docs/audits/ASSET-LICENSE-REGISTER.md) 才能商用。
