# NOX Robotics Resource Strategy

日期：2026-09-21  
狀態：`RESEARCH / NO THIRD-PARTY ASSETS INCLUDED`

本文件整理「寫實機器人隨捲動從零到完整組裝」所需資源與入庫規則。它補充 NOX v2，不改寫核心方法論。

## 1. 目標與不可妥協條件

- 捲動控制同一條可逆時間軸；往下組裝、往上精準倒放。
- 鏡頭、場景與物件共同前進，不是只放大或旋轉模型。
- 機器人必須有工業級硬表面、PBR 材質、正確接觸陰影與可讀的明亮燈光。
- 手機版重新設計鏡頭、FOV、構圖與 LOD，不直接縮小桌機版。
- 保留可重用技術；配色、字體、排版、場景與材質語言由每位客戶重新定義。
- 不複製 UBTECH 等現有品牌產品；參考工業設計語言，最終外觀需原創或取得正式授權。

## 2. 採用順序

1. 先使用免費、開源且授權清楚的工具與元件。
2. 完成 15–20 秒 vertical slice，確認真正缺少的能力。
3. 免費方案無法補足時，才購買單月素材庫或商業工具。
4. 任何第三方內容先登記授權，再進專案。
5. 公開的 `nox-assets` 只保存方法、清單與可合法再散布內容；付費模板原始碼不得公開轉存。

## 3. 可直接進程式專案的技術

| 能力 | 建議工具 | 定位 |
|---|---|---|
| WebGL／3D | Three.js、React Three Fiber、Drei | 場景、鏡頭、模型與燈光 |
| 主時間軸 | GSAP + ScrollTrigger | 唯一跨層動畫時鐘 |
| 平滑輸入 | Lenis | 只處理捲動輸入 |
| glTF 處理 | glTF Transform、gltfjsx | 壓縮、清理、產生可控節點 |
| 幾何壓縮 | Meshopt 或 Draco | 降低模型傳輸量 |
| 貼圖壓縮 | KTX2／WebP | 降低 GPU 記憶體與下載量 |
| 元件素材 | Magic UI、21st.dev | 只抽取功能，不繼承整套視覺風格 |

來源：

- https://threejs.org/
- https://docs.pmnd.rs/react-three-fiber
- https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- https://lenis.darkroom.engineering/
- https://gltf-transform.dev/
- https://github.com/pmndrs/gltfjsx
- https://magicui.design/ — 官方標示 150+ 免費開源元件。
- https://21st.dev/ — 可免費瀏覽；官方目前提供每日 2 次免費元件複製。

## 4. 外部製作工具

這些軟體不會「裝進 GitHub」。GitHub 保存的是製作規格、合法來源紀錄、匯出的 GLB／貼圖，以及必要時以 Git LFS 管理的原始檔。

| 階段 | 工具 | 輸出 |
|---|---|---|
| 精密硬表面 | Plasticity | STEP／OBJ／FBX 等中間檔 |
| 拓樸、UV、Rig、Pivot | Blender | `.blend` 與分件 GLB |
| PBR 材質 | Substance 3D Painter | Base Color、Metallic、Roughness、Normal、AO |
| AI 粗模 | Meshy | 僅作 blockout；必須人工重修 |
| 網頁最佳化 | glTF Transform | 最終 `.glb` 與處理紀錄 |

推薦流程：

```text
Reference / Original Design
  → Plasticity or Blender hard-surface model
  → Blender topology, UV, pivots and part hierarchy
  → Substance PBR materials
  → glTF Transform + Meshopt/Draco + KTX2
  → R3F/Three.js
  → GSAP ScrollTrigger assembly timeline
```

## 5. HorizonX：付費補強，不作風格母版

官方入口：https://horizonx.so/pricing

截至 2026-09-21 的 Starter 月繳方案：

- US$24.99／月；官網顯示首次付款自動套用 `WELCOME20` 20% 優惠。
- Premium：每月 3 個。
- 一般素材：每天 3 個。
- 下載內容含原始碼與商業專案使用權；實際限制仍以取得當日條款為準。

優先候選：

1. `Immersive Robotics`：Vite + React + GSAP；研究滑動敘事、組裝節奏與技術型介面。
2. `Hand Prosthesis Simulator`：Three.js + Draco；研究分層、explode view 與機械零件控制。
3. 第三個 Premium 額度先保留，等 vertical slice 明確暴露缺口後再選。
4. 一般素材優先研究 `GSAP Scroll Motion Lab` 與 `Apex Roadster` 的可逆捲動、構圖與效能做法。

限制：

- `Immersive Robotics` 以 scroll-scrubbed canvas sequence 為主，不能直接取代真正可拆解的 3D 機器人。
- 不把 HorizonX 的配色、字體與品牌語言寫入 NOX 核心。
- 不得將付費模板原始檔公開提交到本 repo；只記錄分析結論、整合介面與授權證據。實際整合應在有權限控制的客戶／製作 repo 進行。

## 6. 使用者提供的設計來源如何分類

| 來源 | 用法 | 是否直接入庫 |
|---|---|---|
| Motion Sites、Landing Love、Curations Supply、SaaSpo | 參考拆解、鏡頭與版式研究 | 否；只保存分析結論與來源 URL |
| 21st.dev、Magic UI、Origin UI | 可修改的 UI／動效元件 | 逐項審查授權後才可 |
| UNCUT.wtf | 字體探索 | 每套字體分別確認授權 |
| Sleek、其他 AI builder | 原型與流程測試 | 不把生成風格當作 NOX 預設 |
| HorizonX | 商業模板與完整原始碼參考 | 付費原檔不得公開再散布 |

## 7. 機器人 GLB 交付契約

模型必須分件，並為每件設定正確 pivot。最低建議節點：

```text
robot_root
├─ head_shell / sensor_head / neck
├─ torso_core / chest_shell / back_shell
├─ shoulder_L/R / upper_arm_L/R / forearm_L/R / hand_L/R
├─ hip_core / thigh_L/R / shin_L/R / foot_L/R
└─ joint_* / cable_* / fastener_* / sensor_*
```

每一節點需要：

- 穩定且唯一的名稱。
- 正確局部座標與 pivot。
- `assembledTransform` 與 `explodedTransform`。
- 所屬組裝階段、進場方向與時間範圍。
- 桌機與手機的 LOD／fallback。

動畫只控制節點 transform、材質參數、燈光和鏡頭；不能依賴不可重現的隨機值。

## 8. 技術與客戶風格隔離

概念上分為兩層：

```text
cinematic-engine/
  scroll clock, camera rig, scene controller, loaders,
  assembly timeline, performance tiers, fallbacks

client-art-direction/
  palette, typography, composition, lighting profile,
  material language, environment, copy and scene assets
```

禁止在 engine 預設中固化黑金、霓虹、科幻藍、特定字體或既有模板版式。技術可以重用，視覺必須由客戶的 Art Bible 重新產生。

## 9. Git 與授權規則

- 第三方資產沿用 [`../audits/ASSET-LICENSE-REGISTER.md`](../audits/ASSET-LICENSE-REGISTER.md) 登記。
- 未取得授權證據前狀態一律為 `REVIEW` 或 `BLOCKED`。
- `.blend`、`.spp`、`.step`、高解析貼圖與大型 GLB 使用 Git LFS 或受控資產儲存，不直接塞進一般 Git history。
- 下載時保存來源頁、取得日期、版本、收據／會員證據與當日 license。
- 公開 repo 不保存無再散布權的商業模板、模型或貼圖。

## 10. 下一階段

- [ ] 先盤點免費來源，建立候選清單，不批量下載。
- [ ] 選定一個原創機器人外觀並補齊正面、背面、側面與細節參考。
- [ ] 建立 15–20 秒、明亮攝影棚場景的組裝 vertical slice。
- [ ] 在 0／25／50／75／100% 捲動位置驗證正向與倒放一致性。
- [ ] 免費資源確認無法補足後，才訂閱 HorizonX Starter 一個月。
- [ ] 所有正式資產完成授權、效能與手機真機驗證後才標記 `CLEARED`。
