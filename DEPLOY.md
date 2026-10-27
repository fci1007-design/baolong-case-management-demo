# 發布紀錄

## 2026-10-27（Asia/Taipei）：首次 Demo 發布準備

- 目標：Sites 私有展示，保留建立時的 owner-only 受眾。
- project_id：`appgprj_6ae0b5274490819186aeffcf0ee112fa`。
- 預期網址：`https://baolong-followup-demo.fci1007.chatgpt.site`；此條目為發布準備，不代表已上線，完成狀態另於下方追加。
- 發布內容：`dist/` 的 buildless 靜態應用，設定由 `.openai/hosting.json` 持有。
- 必要環境變數：無。無資料庫遷移、外部 API key 或正式資料。
- 資料保存：各瀏覽器 localStorage，展示操作不跨瀏覽器共享。
- 驗證：JavaScript 語法與 Chrome 核心旅程通過；依純 Demo 要求未做正式安全、負載與外部介接驗證。
- 回復方式：Sites 版本紀錄回復，或用本機原始檔啟動。
