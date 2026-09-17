# Production QA

## 1. 每次部署的固定證據

- commit SHA 與 build ID。
- 測試網址、日期、瀏覽器與裝置。
- 0%、25%、50%、75%、100% 的桌機與手機截圖。
- 冷載入錄影與完整捲動錄影。
- console error、network failure、WebGL context loss 與效能數據。

沒有這組證據，不得宣稱「正式版與本機一致」。

## 2. 視覺驗收

- 第一屏在尚未互動時就是可發布的構圖。
- 主體在關鍵鏡頭有明確視覺權重，不長時間縮在遠處。
- 每章只看截圖就能辨識，不是同一空間換文字。
- 黑位仍看得見材質，不靠過量 Bloom、霧、顆粒或色差假裝電影感。
- Typography 在 390px 寬度仍無孤字、溢出、過小操作字或缺字。
- UI chrome 不遮擋主體、系統列、瀏海與底部手勢區。

## 3. 互動與可存取性

- 鍵盤可到達所有控制，focus ring 清楚。
- Canvas 非唯一資訊來源；重要文字與 CTA 在 DOM。
- 音效預設關閉或靜音，使用者可明確開關。
- `prefers-reduced-motion` 有真正的替代敘事。
- 觸控不阻止正常頁面捲動；滑鼠、觸控、trackpad 都驗收。
- loading、失敗、低階 fallback 與 WebGL 不支援狀態都有可用畫面。

## 4. 工程驗收

- production build 成功，無未處理錯誤。
- 模型、影片、字體與 CDN 資源沒有指向會變動的 `main` raw URL。
- 所有第三方資源的版本已 pin，授權已登記。
- 所有 listener、RAF、observer、texture、material、render target 可釋放。
- 路由離開再返回不重複建立 Canvas 或 animation loop。
- 斷網、慢 3G、資產 404、影片 autoplay 失敗時仍可使用。

## 5. 最終 sign-off

```text
[ ] Gate 0–6 皆通過
[ ] Art Bible 與逐鏡表已鎖版
[ ] 資產 register 無 BLOCKED 項目
[ ] Mobile / Desktop performance budget 通過
[ ] Reduced motion / keyboard / contrast 通過
[ ] 0/25/50/75/100 截圖已比較
[ ] 正式網址 = 驗收 commit / build
[ ] 回退方式已測試
```
