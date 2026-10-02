# 調用 NOX · v2 路由入口

> 現行版本：NOX Cinematic Web System v2（入口更新：2026-10-02）

收到「調用 NOX」時，不要把整個倉庫一次讀入。先讀 [`../docs/NOX-CINEMATIC-WEB-SYSTEM-v2.md`](../docs/NOX-CINEMATIC-WEB-SYSTEM-v2.md)，再依任務選擇最多三份模組。

## 任務路由

| 任務 | 加讀文件 |
|---|---|
| 拆參考、定風格、選字體 | `01-art-direction-and-reference.md` |
| 寫分鏡、捲動節奏、鏡頭 | `02-storyboard-camera-motion.md` |
| 選技術、拆 3D／影片／DOM、處理資產 | `03-architecture-and-assets.md` |
| 查 fps、draw call、貼圖、DPR、載入紅線 | `04-performance-budget.md` |
| 測試、驗收、部署、回歸 | `05-production-qa.md` |
| 啟動新原型 | `templates/VERTICAL-SLICE-SPEC.md` |
| 判斷目前 GitHub 結構 | [最新檢查報告](../docs/audits/GITHUB-REPOSITORY-AUDIT-2026-10-02.md) |
| 查設計參考與素材來源 | [06 素材探索](../docs/06-design-reference-and-asset-discovery.md) |
| Blender／建築與室內視覺驗收 | [07 視覺驗收](../docs/07-blender-skills-visual-acceptance.md) |
| 流體、布料、軟體、煙霧 | [08 流體技術與 Skill](../docs/08-threejs-fluid-art.md) |

## 回答與執行規則

1. 先說清楚畫面與敘事問題，再談 library。
2. 先交付一段達標的 vertical slice，再擴張整站。
3. 明確說明每個畫面由 3D、影片、圖片或 DOM 哪一層負責。
4. 不因為 repo 裡已有某段程式就預設沿用；先確認它是否通過現行效能、授權與 QA 門檻。
5. 不把 21st.dev、Magic UI、Origin UI／OriginKit、Spline 或任何範例庫當成視覺總監；它們只能提供局部零件。
6. 若偏離 v2，必須說明偏離原因與驗證方式。

舊單檔知識庫已移除。需要歷史追溯時使用 Git history；現行任務只以 v2 模組為準。

## Blender／3D 視覺品質固定準則

涉及 Blender、3D 建築／室內質感、參考圖對照或視覺修正時，按需必讀 [Blender Skills 與 3D 網頁視覺驗收](../docs/07-blender-skills-visual-acceptance.md)。

完整要求以 [07 視覺驗收](../docs/07-blender-skills-visual-acceptance.md) 為準；保留按需讀取，避免在入口重複載入規則。

