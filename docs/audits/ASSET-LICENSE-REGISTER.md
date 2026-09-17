# Asset & License Register

狀態：`CLEARED` 可按記錄用途使用；`REVIEW` 尚需確認限制；`BLOCKED` 不得進商業成品。

目前核心 repo 不包含可直接投入製作的第三方資產。舊測試模型、外部場景與來源不完整的 lab 程式已於 2026-09-16 移除；下表用作未來入庫模板，而不是舊素材墓地。

## 新資產登錄欄位

```text
asset_id:
title:
author:
source_url:
acquired_at:
license_name:
license_url_or_file:
commercial_use:
attribution_required:
modification_allowed:
account_or_receipt_evidence:
original_sha256:
derived_files:
tool_versions_and_commands:
project_scope:
reviewer:
status: BLOCKED | REVIEW | CLEARED
```

## 規則

1. 「免費下載」「AI 生成」「已付款」都不等於自動可商用。
2. license 截圖／文字要與取得日期一起保存；服務條款會變更。
3. 衍生檔沿用原資產限制，壓縮或改材質不會創造新授權。
4. 沒有證據時一律 `BLOCKED`，且不得加入核心 repo；需要研究時放在專案外的暫存環境。
5. 專案 LICENSE 只處理本 repo 自有程式的再利用權，不會覆蓋第三方資產。
