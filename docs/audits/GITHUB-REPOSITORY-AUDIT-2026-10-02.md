# GitHub 結構檢查 · 2026-10-02

## 範圍與結論

檢查帳號 `racky0977108658-boop` 的 8 個倉庫：預設分支檔案樹、檔案大小、存在的 README，以及 nox-assets 的文件／入口。檔案樹皆未截斷。這是結構與文件檢查，未執行其他網站，也不是完整程式、安全、授權或部署審核。

**nox-assets 本身不亂；跨倉庫的用途、成熟度與入口說明不一致，較容易誤用舊成果。** 檢查前 nox-assets 共 17 個檔案、46,240 bytes，根目錄只有 AGENTS.md、README.md、docs/、prompts/。沒有整份內容 SHA 相同的重複檔案。八個倉庫的目前檔案樹都未追蹤 node_modules/ 或 dist/。

## 檢查前倉庫地圖

| 倉庫 | 依本次證據可辨識的定位 | 結構判斷／下一步 |
|---|---|---|
| [nox-assets](https://github.com/racky0977108658-boop/nox-assets) | 共用知識／技能 | 結構清楚，作為唯一共用入口 |
| [everflow](https://github.com/racky0977108658-boop/everflow) | 獨立產品開發 | 已有 src、依賴鎖檔、部署設定；本次不判定上線成熟度 |
| [leorich](https://github.com/racky0977108658-boop/leorich) | 獨立珠寶網站 | 缺 README，需補用途、啟動及管理入口說明 |
| [my-site](https://github.com/racky0977108658-boop/my-site) | 用途待確認的工具／網站集合 | README 只有「# -」；Okya、nox 等名稱不易辨識 |
| [nox-collection-001](https://github.com/racky0977108658-boop/nox-collection-001) | 雕塑展廳／案例候選 | 有復盤；需清楚區別歷史案例與可複用模板 |
| [nox-earth-demo](https://github.com/racky0977108658-boop/nox-earth-demo) | 3D 首頁原型 | index.html 約 3.90 MB；README 僅標題 |
| [nox-ever-artico](https://github.com/racky0977108658-boop/nox-ever-artico) | 品牌網站展示；維護成熟度待確認 | index.html 約 1.24 MB；README 只有名稱／定位 |
| [spline-hero](https://github.com/racky0977108658-boop/spline-hero) | Spline 展示 | README 簡短；宜補外部場景依賴及維護狀態 |

「產品」「案例候選」是內容分類，不代表正式上線或已停用。是否仍有公開流量、外部引用、商業用途，本次未驗證；不據此直接封存或刪除。

## 具體問題與本次修正

1. README 的檢查入口仍指向 9/16；已新增本報告並改為目前入口，保留歷史報告供追溯。
2. README／prompt／Codex 執行規範對後續模組的路由不完整；已補 06、07、08 的相關入口，保留按需閱讀。
3. Blender 品質長段落在 README、執行規範、prompt、QA 文件重複。三個入口縮為指向 07 模組的連結；QA 頁保留驗收提示。
4. 新流體技能集中保存於 skills/nox-threejs-fluid-art/，包含 SKILL.md、兩份參考與介面素材。08 模組僅做導覽，不複製整份技能。
5. 釐清主捲動時間軸與固定步長模擬的分工，避免把新增物理解算器誤當成第二套敘事時間軸。

## 仍建議改善

- leorich、my-site 的 README 已補齊；my-site 的 Okya、nox 等檔案仍須先確認用途，再決定命名與歸類。
- 所有倉庫已有用途、維護狀態與模板適用性說明。仍需按實際專案補足已驗證的啟動方式與部署位置；不由名稱推定驗收結果。
- nox-earth-demo 與 nox-ever-artico 若持續開發，找回原始 source 與建置流程；單一大 HTML 不適合作為新案的預設起點。若僅保留展示，再由用途決定是否標成歷史展示。
- 不為了視覺整齊，把獨立產品搬進共用知識庫。

## 檢查前快照

以下是本次讀取時的 main ref；本次提交後 nox-assets 會更新。檔案數不含目錄，大小為目前檔案合計，非 Git 歷史儲存量。

| 倉庫 | Ref | 檔案數 | Bytes |
|---|---|---:|---:|
| nox-assets | `23f23a8024ecc96918755d5597e7a0f58d617a0b` | 17 | 46240 |
| everflow | `3f9552aa31e29c183d6c6a5d8cdea2dad9dc87ed` | 29 | 153406 |
| leorich | `3a91536da4d94c06de28a12b11c615e6de0e4d4b` | 4 | 163306 |
| my-site | `a842ff766e49d98193b45bbc7f9ccc6bc8076b3f` | 10 | 61251 |
| nox-collection-001 | `d1fb0db272daba9e7d697f1057ee8738c17626f1` | 4 | 1988918 |
| nox-earth-demo | `08d54c535430ae0767a6a0079cd7f54f3b756f1b` | 3 | 3912096 |
| nox-ever-artico | `311fe2834449f8e45a7cefc094401a4c0b1abdda` | 2 | 1235280 |
| spline-hero | `42f05430651baef0b3f2fe02440c35728fe479f7` | 2 | 4709 |

## 變更邊界與驗證

nox-assets 更新技能與導覽／檢查文件；其他七個倉庫只更新或新增 README，補齊用途、維護狀態、主要檔案與新案適用性。沒有改網站程式、部署設定或 Codex config.toml。nox-assets 的技能變更經專用分支與 PR 整合；各倉庫的 README 小幅文件變更直接提交。已讀回線上檔案雜湊，並比對其餘原始檔未被修改。

驗證項目：技能副本與已建立版本比對、相對文件連結與介面圖示路徑檢查、文件 diff／空白檢查。這些檢查不代表流體效果已在任何網站運行。

## 完成紀錄

| 倉庫 | 已完成內容 | 提交 |
|---|---|---|
| nox-assets | 流體技能、索引與檢查報告 | [3c05e3d](https://github.com/racky0977108658-boop/nox-assets/commit/3c05e3d05ec5f80c77fb9d72385c3f017e3cf7f0) |
| everflow | README 用途與維護標示 | [a96a779](https://github.com/racky0977108658-boop/everflow/commit/a96a7791d0ead26a8f8905a3b987b7241005c2f4) |
| leorich | README 用途與維護標示 | [8822564](https://github.com/racky0977108658-boop/leorich/commit/882256447fafec3efd4dc607c69355ae725e6b34) |
| my-site | README 用途與維護標示 | [98a78d2](https://github.com/racky0977108658-boop/my-site/commit/98a78d21fe4c6278ce1278522941bb71777b6ea5) |
| nox-collection-001 | README 用途與維護標示 | [561e819](https://github.com/racky0977108658-boop/nox-collection-001/commit/561e819199f51e81c737df20acd36b8a1f479f83) |
| nox-earth-demo | README 用途與維護標示 | [6ac687d](https://github.com/racky0977108658-boop/nox-earth-demo/commit/6ac687d9233e735d54f44ed63dc6e6617aeaf235) |
| nox-ever-artico | README 用途與維護標示 | [2750d51](https://github.com/racky0977108658-boop/nox-ever-artico/commit/2750d51709af0de67c82b0370c3dc3e30cf741ad) |
| spline-hero | README 用途與維護標示 | [96dbecb](https://github.com/racky0977108658-boop/spline-hero/commit/96dbecb17cdc9180f1cc5304da01903651ed2a44) |
