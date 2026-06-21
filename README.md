# NOX 3D 素材與資源庫清單
> 更新：2026-06-11 · 基於 GitHub @racky0977108658-boop 的追蹤與星標 + 補充
> 🧭 **主知識庫入口**：做網頁 / 3D / 接案,先調用 [`prompts/NOX.md`](prompts/NOX.md)(觸發語「調用 NOX」)。本檔是 3D 素材資源清單,與主知識庫互補。

## 你已追蹤的帳號

| 帳號 | 是誰 | 重點 repo |
|---|---|---|
| [mrdoob](https://github.com/mrdoob) | three.js 作者 | `three.js`（已星標）— `/examples/models` 內含大量可直接用的 GLB/GLTF 測試模型 |
| [brunosimon](https://github.com/brunosimon) | Three.js Journey 課程作者 | `folio-2019`（傳奇 3D 作品集，完整開源）、`my-room-in-3d` — 學 Blender→three.js 工作流的最佳範本 |
| [21st-dev](https://github.com/21st-dev) | 21st.dev 元件庫 | `magic-mcp`（AI 生成元件的 MCP server）、`cli` — 元件素材來源，注意各元件授權各自獨立 |

## GLB / GLTF 模型來源（可直接餵 three.js）

| 來源 | 內容 | 授權 |
|---|---|---|
| [KhronosGroup/glTF-Sample-Assets](https://github.com/KhronosGroup/glTF-Sample-Assets) | 官方範例模型庫（頭盔、材質球、動畫角色等） | 多為 CC0 / CC-BY，每個模型附授權檔 |
| [pmndrs market](https://market.pmnd.rs) | 精選 CC0 模型 + 材質，專為 R3F 生態挑選 | CC0 |
| [Poly Haven](https://polyhaven.com) | HDRI 環境光、材質、模型 — 打光質感的關鍵 | CC0 |
| [Sketchfab](https://sketchfab.com/search?licenses=322a749bcfa841b29dff1e8a1bb74b0b&type=models) | 海量模型，篩 CC0/CC-BY 下載 GLB | 逐件確認 |
| [quaternius.com](https://quaternius.com) | 低多邊形角色/場景包，含骨架動畫 | CC0 |

## three.js / R3F 工具鏈（pmndrs 生態）

- [pmndrs/drei](https://github.com/pmndrs/drei) — R3F 必備 helper 集（相機控制、環境光、文字、載入器）
- [pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber) — React 的 three.js 渲染器（AXIOM 用過）
- [pmndrs/postprocessing](https://github.com/pmndrs/postprocessing) — Bloom、DOF 等後製效果，電影感來源
- [donmccurdy/glTF-Transform](https://github.com/donmccurdy/glTF-Transform) — GLB 壓縮優化（Draco/Meshopt），iPad 載入速度關鍵
- [gltf.report](https://gltf.report) — 瀏覽器直接檢查/壓縮 GLB，iPad 可用

## 靈感與範例

- [brunosimon/folio-2019](https://github.com/brunosimon/folio-2019) — 完整可拆解的 Awwwards 級專案
- [three.js examples](https://threejs.org/examples/) — 官方互動範例 + 原始碼
- [Spline 社群場景](https://spline.design/community) — 可 remix，商用前確認各場景授權

## 使用備忘

1. **格式優先序**：GLB（含骨架動畫）> GLTF > FBX/OBJ（需轉檔）。`.splinecode` 只能在 Spline runtime 用，無法拆解。
2. **iPad 效能紅線**：單一模型壓縮後 < 5MB，貼圖 ≤ 2048px，上 Draco 壓縮。
3. **行為層交給 Claude**：視線追蹤、眨眼、idle 動畫混合 — 拿到 GLB 即可寫。
4. **商用案授權三查**：CC0 直接用；CC-BY 要標註；21st.dev 元件逐個看授權頁。

## Repo 結構

- `prompts/` — 可重用的 AI 整合提示詞（Lovable / Cursor 用）
  - `spline-hero-integration-prompt.md` — Spline 機器人 hero 區塊，已修正 Tailwind keyframes / loader / 重複 Spotlight 等坑
- `components/` — 可直接用的元件代碼
  - `interactive-3d-hero.jsx` — three.js 金色粒子 torus knot，游標追蹤 + 自訂 shader，零外部資產依賴
- `models/` — GLB / GLTF 模型檔，命名規則見資料夾內說明

## AI 生成 3D 工作流（iPad 可行版）

文字 → 3D 模型 → 網頁互動，全程瀏覽器操作：

1. **生成**（雲端文字生 3D，輸出 GLB）
   - [Meshy](https://www.meshy.ai) — 文字/圖片生 3D，品質穩定
   - [Tripo3D](https://www.tripo3d.ai) — 速度快，適合快速迭代
   - [Luma Genie](https://lumalabs.ai/genie) — 免費額度可先試
2. **檢查/壓縮** — [gltf.report](https://gltf.report) 瀏覽器直接開，看面數、貼圖大小，套 Draco 壓縮
3. **入庫** — 存到本 repo `models/`，命名 `來源_名稱_授權.glb`
4. **行為層** — 丟給 Claude 寫 three.js 載入 + 互動（視線追蹤、動畫混合等）

備註：NVIDIA build.nvidia.com 的 3D Object Generation Blueprint（TRELLIS）品質好但需本地 RTX 4080+ 顯卡，iPad 工作流不適用；其雲端 LLM API 端點留作 AI 自動化案備選。
