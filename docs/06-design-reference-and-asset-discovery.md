# NOX 設計參考與素材探索索引

更新：2026-09-23。

此頁記錄**來源與用途**，不代表素材已下載、MCP 已連線、原始碼已整合，或個別資產已取得商用授權。實際使用前須核對來源頁、方案、授權，並填寫 [素材授權登錄表](audits/ASSET-LICENSE-REGISTER.md)。

## 按需求選工具

| 要做什麼 | 來源 | 能幫我們做什麼 | NOX 的使用方法 |
|---|---|---|---|
| 3D 首屏、場景、互動漸層、動態背景、動效區塊 | [GetLayers](https://www.getlayers.ai/) · [文件](https://www.getlayers.ai/docs) · [MCP](https://www.getlayers.ai/mcp) | 瀏覽 3D 場景、背景、漸層、區塊和模板；各項目可用提示詞、原始碼或媒體的範圍依方案而異 | 按分鏡挑一個候選做原型，核對是否能接主捲動時間軸、手機負擔、素材取得方式和授權；不得直接堆滿效果 |
| 真實產品畫面與操作流程 | [Mobbin](https://mobbin.com/) · [MCP](https://mobbin.com/mcp) | 研究已上線 app／網頁的導覽、購物、預約、註冊、文案與微互動 | 設計藝術品收藏、會員、預約導覽、購物或後台時先查流程；轉化資訊架構，不複製畫面 |
| 完整網站的藝術方向 | [SiteInspire](https://www.siteinspire.com/) · [Art 類別](https://www.siteinspire.com/websites/category/art) · [互動網站](https://www.siteinspire.com/websites/category/web-and-interactive-design) | 比較整站構圖、字體、色彩、排版和節奏 | 挑 2–3 個案例，記錄 URL、日期、具體借用元素、鏡頭與捲動；再寫進 NOX 的 [參考拆解](01-art-direction-and-reference.md) |
| 首屏 Hero、標題、CTA 和主視覺 | [Supahero](https://supahero.io/) | 查網站首屏範例與視覺層級 | 為藝術網站入口、畫作揭露找構圖；重建品牌排版和畫面比例 |
| 局部介面元件 | [Collect UI](https://collectui.com/) | 研究卡片、選單、表單、篩選、作品資訊等小單元 | 用於作品卡、導覽、展覽資料和管理介面；套入 NOX 自己的字體、留白與配色 |

## 每次查找的固定步驟

1. 先寫清當前畫面／功能的任務、裝置、互動與效能限制。電影式首頁先看 [分鏡與鏡頭](02-storyboard-camera-motion.md)。
2. 按上表找一類來源，記錄候選的原始 URL、名稱、擷取日期和想借用的具體元素。
3. 指定實作媒介（DOM、影像、影片或 WebGL）、手機預案及與捲動時間軸的關係。
4. 區分「靈感參考」與「可取得資產」。別人的網站截圖、圖片、動畫和程式不能因可瀏覽就當作可複製素材。付費、免費、商用及修改條件逐項核對。
5. 做一個 15–20 秒原型並在手機檢查；通過後才把實際素材、授權證據和版本登錄入庫。

## 快速例子

- 「捲動時揭露一個藝術 3D 場景」→ GetLayers 找場景候選；檢查是否可編輯、能否對齊 GSAP 時間軸、手機效能及授權。
- 「藝術品收藏與預約導覽」→ Mobbin 找流程，Collect UI 找局部元件。
- 「首頁要有高級藝術殿堂的感覺」→ SiteInspire 找整站視覺，Supahero 找首屏構圖。
- 「作品卡和篩選介面太平凡」→ Collect UI 找元件語法，再與 SiteInspire 的整體美術對照。

狀態：五個來源均已分類；**沒有匯入個別素材**。服務內容和授權會變，採用前重新查官方網站。來源於 2026-09-23 核對。
