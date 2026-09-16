# Codex Execution Spec

## 目標

維護或建立 NOX 專案時，以「使用者控制進度的電影」為北極星，先完成一段達標的 vertical slice，再擴張整站。

## 必讀順序

1. `README.md`
2. `docs/NOX-CINEMATIC-WEB-SYSTEM-v2.md`
3. 依任務讀 `docs/01` 至 `docs/05` 中最多三份
4. 新專案填 `docs/templates/VERTICAL-SLICE-SPEC.md`
5. 使用既有素材前讀 `docs/audits/ASSET-LICENSE-REGISTER.md`

## 執行約束

- 不直接在 `main` 做大改；使用專用 branch。
- 舊原型若不能直接提升頂級網站的構圖、鏡頭、敘事、效能或 QA，就移除；有價值的失敗教訓只保留為精簡 case study。
- 不因現有程式可執行就宣稱 production-ready。
- 不新增第二套主動畫時鐘。
- 不把大型二進位轉成 Base64 放進正式 JS／JSX。
- 不使用未登記授權的模型、字體、圖片、影片、音訊或第三方場景。
- 不改 `everflow`、`leorich`、`my-site` 等獨立產品 repo，除非任務明確指定。

## 開發順序

1. 建立或更新 Vertical Slice Spec。
2. 鎖定逐鏡表、Art Bible、asset register、performance budget。
3. 實作 DOM／媒體 fallback。
4. 實作單一 global Canvas、camera rig 與單一 timeline。
5. 加入主體與一個關鍵過場。
6. 跑 production build、靜態檢查、效能測量與固定座標截圖。
7. 記錄差異、風險與未通過項目；Gate 未通過不擴張。

## 完成回報

回報必須包含：改了什麼、沒有改什麼、測了什麼、哪一個 Gate 通過、仍被什麼阻擋、branch／commit、以及是否已推送。不得把「檔案已建立」等同「網站品質已達標」。
