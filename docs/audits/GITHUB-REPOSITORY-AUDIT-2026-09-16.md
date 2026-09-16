# GitHub Repository Audit · 2026-09-16

範圍：`racky0977108658-boop` 公開可讀的 8 個 repository。判斷依據是 2026-09-16 clone 的預設分支快照；未改動其他 repo。

## 結論矩陣

| Repo | 實際定位 | 決策 | 不可當成什麼 |
|---|---|---|---|
| `nox-assets` | NOX 電影級網站決策系統 | **升級為精簡 v2 核心** | 舊素材倉庫或範例大全 |
| `nox-collection-001` | 技術原型 + 高價值 postmortem | **保留為 case study / failure library** | 下一案直接 fork 的正式模板 |
| `nox-ever-artico` | 約 1.24 MB 單檔 bundled artifact；React/R3F/Spline 痕跡 | **不併入 v2；repo 待另行封存／移除** | 可維護的 source template |
| `nox-earth-demo` | 約 3.90 MB 單檔首頁 + admin；多種技術痕跡混合 | **不併入 v2；repo 待另行封存／移除** | production architecture |
| `spline-hero` | 約 4.8 KB 的 Spline 外部場景展示 | **不併入 v2；repo 待另行封存／移除** | 自有 3D pipeline |
| `leorich` | 珠寶品牌前台 + 管理頁，與 3D 知識庫目的不同 | **保持獨立產品** | NOX 3D 核心的一部分 |
| `everflow` | Vite + React + Supabase + Netlify Functions 的產品型 Web App | **保持獨立並另做產品安全審核** | 3D 素材或 creative-web 實驗庫 |
| `my-site` | NOX AI Company OS／automation 原型 | **保持獨立或日後另行封存** | Cinematic Web template |

## 主要發現

### 1. `nox-assets`

優點：已有 `components`、`models`、`prompts`、`sites` 分類；舊 `NOX.md` 包含色彩管理、相機阻尼、Lenis／GSAP、行動效能等有效知識。

問題：知識、設計 DNA、接案、黑洞 Shader、資產清單混在單一文件；lab component 沒有成熟度標籤；模型沒有授權證據；Base64 GLB 元件不適合正式架構。

決策：移除舊單檔與未達門檻的素材／範例，改成 Master Bible + 模組手冊 + Audit + Case Study + Template。

### 2. `nox-collection-001`

可保留：GLB 載入、錯誤 fallback、自適應 DPR、六章進度骨架，以及 2026-07-29 的完整復盤。

不可沿用：先建長路徑再貼文字、同一雕塑反覆使用、缺少 Art Direction／分鏡／資產管線、以降低清晰度換效能、正式版與本機缺少 build 對應。

決策：復盤比成品更有價值。下一次必須先做 15–20 秒高品質 slice。

### 3. `nox-ever-artico` 與 `nox-earth-demo`

兩者主要提交物都是巨大單檔 HTML，包含打包後程式與樣式。它們可被瀏覽器執行，但不具備清楚的原始 source module、依賴鎖定、測試與可維護結構，因此只能做視覺／技術考古。

`nox-ever-artico` 同時存在 R3F Canvas 與外部 Spline viewer；`nox-earth-demo` 同時出現 Three.js CDN、應用／後台與多種框架痕跡。這正是 v2 要避免的「成品能跑，但決策與責任邊界不可追溯」。

### 4. `spline-hero`

它只能快速確認 Spline scene、loader 與 responsive split hero，沒有足以支援電影級網站的鏡頭、敘事或 production pipeline；不納入 v2 核心。

### 5. 獨立產品

`everflow` 已有產品資料、登入、金流、RLS 與 server function 的責任；任何整理都可能影響真實商業流程。`leorich` 與 `my-site` 也有各自品牌／營運目的。它們不應為了讓 GitHub 看起來整齊而搬進 `nox-assets`。

## 跨 repo 風險

1. 八個 repo 根目錄均未發現 LICENSE；這不代表第三方素材可自由商用。
2. 多個 repo 直接依賴外部 CDN、Google Fonts、Spline scene 或 raw `main` 資產；版本與可重現性不足。
3. 大型單檔 HTML 隱藏原始架構與 dependency provenance，不利維護、差異審查與安全更新。
4. prototype、case study、正式產品目前缺少一致的成熟度標籤。

## 建議標籤

在各 repo README 明示其中一種：

- `PRODUCTION`：有 source、build、測試、授權、部署與回退。
- `LAB`：可執行實驗，不承諾完整 QA。
- `CASE STUDY`：保留過程、失敗與結論。
- `ARCHIVE`：不再維護，只供追溯。

## 本次已執行

- `nox-assets` 建立獨立 v2 branch。
- 建立 v2 Master Bible、模組手冊、vertical-slice template、Codex spec、repo audit 與 license register。
- 移除舊 `NOX.md`、通用／未達標元件、無授權證據模型、Spline 範例、舊站拷貝與無可重現測試的特效筆記。
- `nox-collection-001` 只保留萃取後的 Case Study；歷史原文仍可由 Git history 追溯。

## 後續 repo 級工作

1. 先將 `nox-assets` v2 branch review、commit、push。
2. 再逐 repo 決定封存或刪除；不要在沒有備份與明確清單時同時改八個 `main`。
3. `everflow` 若要繼續，應另開安全／金流／RLS 專案，不併入本次 creative-web 重構。
