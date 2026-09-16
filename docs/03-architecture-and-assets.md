# Architecture 與 Asset Strategy

## 1. 預設架構

```text
App shell / routes / semantic DOM
├─ Fixed UI chrome
├─ Story sections and accessible content
├─ Media layer (image / video)
└─ One global WebGL canvas
   ├─ Scene controller
   ├─ Camera rig
   ├─ Asset registry
   ├─ Chapter modules
   └─ Post-processing profile

GSAP timeline is the only cross-layer clock.
```

Canvas 不是內容容器。可搜尋、可選取、可操作的資訊留在 DOM；WebGL 只承擔它最擅長的空間與互動。

## 2. 章節模組界面

每章至少定義：

```ts
type Chapter = {
  id: string
  range: [number, number]
  assets: string[]
  enter(): void
  update(localProgress: number): void
  exit(): void
  dispose?(): void
  fallback: 'image' | 'video' | 'dom'
}
```

章節不得自行註冊永久 RAF。共用 renderer、camera、loaders、post-processing 與 frame loop。

## 3. 3D 資產入庫流程

```text
來源與授權證據
  → Blender／DCC 整理比例、pivot、UV、材質
  → 烘焙與貼圖整理
  → glTF Transform／gltfjsx
  → Draco 或 Meshopt；貼圖 WebP／KTX2
  → glTF Validator
  → 手機真機載入與記憶體測試
  → 登記 hash、版本與用途
```

每個資產必須記錄：原始來源、作者、授權、取得日期、原檔、衍生檔、壓縮方式、三角形數、材質數、貼圖尺寸、檔案大小與允許用途。

## 4. 舊資產處置

2026-09-16 清理已移除：無授權證據的 Tripo 測試模型、Base64 內嵌 GLB 元件、通用粒子 Hero、Spline 基礎範例與舊站拷貝。`nox-collection-001` 只保留萃取後的 [`Case Study`](case-studies/NOX-COLLECTION-001.md)，避免未來 AI 把失敗原型當成正式模板。

新資產必須同時具備：對當前分鏡的明確用途、可追溯授權、可重現處理流程、效能數據與 fallback。只有「看起來很炫」或「以前做過」不足以入庫。

## 5. 禁止大型 Base64 資產進正式程式

Base64 會放大傳輸、阻止獨立快取、增加 JS parse／decode 與記憶體峰值，也讓版本差異不可讀。只有離線單檔展示或嚴格 sandbox 無法發出資產請求時才可例外，並在檔頭註明理由。

正式路徑使用可 cache 的內容雜湊資產 URL，搭配 preload／lazy load 與可取消的載入流程。

## 6. Fallback 階梯

1. 完整 WebGL + post-processing。
2. WebGL 簡化材質、關閉昂貴 pass、降低粒子／陰影。
3. 預渲染影片或影像序列。
4. 靜態 hero + 完整 DOM 內容。

降級必須保留構圖、品牌、內容與 CTA，不以空白 Canvas 或錯誤訊息結束。
