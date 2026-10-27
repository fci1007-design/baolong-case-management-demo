# 發布紀錄

## 2026-10-28 01:04:38 +0800：GitHub Pages 首次發布成功

- 公開展示網址：<https://fci1007-design.github.io/baolong-case-management-demo/>；HTTPS 已啟用，來源儲存庫維持私人。
- 部署環境：GitHub Pages / github-pages，GitHub Actions workflow 模式；僅發布 `dist/`。
- 部署來源：main，commit `d22e193a4a7ab0130dde62100a129dea44b5c51e`；[Actions run](https://github.com/fci1007-design/baolong-case-management-demo/actions/runs/40546768132) 已完成且 conclusion=success。
- 驗證通過：公開 HTML、app.js、data.js、products.js、styles.css、favicon.svg 均 HTTP 200；六檔 SHA-256 與本機 dist 完全一致。GitHub API 確認 has_pages=true、private=true。
- Chrome 線上實測通過：首頁顯示正常，酒品類別可切換，案件看板顯示專屬階段、瓶／箱數及最後更新日期。截圖 `artifacts/demo-github-pages.png` 為本機證據，不發布。
- 必要自訂環境變數／密鑰：無。未變更產品程式；本輪未重跑完整產品回歸與三尺寸驗證，沿用前輪結果。
- 後續 main 的 dist 或 workflow 變更自動發布，純文件提交不觸發；本次成功紀錄另以文件提交推送。未使用 Sites。

## 2026-10-28 01:02:20 +0800：啟用 GitHub Pages，首次發布準備

- Aaron 明確要求啟用 GitHub Pages，覆蓋前輪不部署的限制；不使用 Sites。
- GitHub Pages API 建立成功，build_type=workflow、public=true、https_enforced=true；儲存庫仍為私人。
- GitHub 回傳網址：<https://fci1007-design.github.io/baolong-case-management-demo/>。
- Workflow：`.github/workflows/pages.yml`，僅發布 dist，main 的 dist／workflow 推送及手動執行觸發，使用 github-pages environment。
- Actions 版本依官方 release 查證；目前只完成設定，workflow 推送與成功發布尚待驗證，不把 API 建立當成網站已上線。
- 必要自訂環境變數／密鑰：無。歷史 Sites 與其他服務不變。

## 2026-10-28 00:48:11 +0800：GitHub 原始碼推送成功

- 依 Aaron 本輪指示，已建立並推送至私人儲存庫：[https://github.com/fci1007-design/baolong-case-management-demo](https://github.com/fci1007-design/baolong-case-management-demo)。
- 帳號／擁有者：`fci1007-design`；分支 `main`；本機 `origin` 為該儲存庫，追蹤 `origin/main`。
- 功能版本 commit：`f8152ea1308a75e6060602463f7a8ab056163eb8`。包括商務版介面、櫥櫃／晶石板／酒品流程、產品數量、報表及說明。
- 已驗證：`git ls-remote --heads origin main` 與本機 HEAD 完全相同；GitHub API `private=true`、`default_branch=main`、`has_pages=false`；遠端 dist 的 6 個資產存在，包含 products.js。
- 本紀錄為推送後補記，將另行以文件提交保存；查詢最終文件 commit 可執行 `git log -1 --oneline`。
- Git 作者身分只設定在此專案，使用 GitHub noreply 信箱；未改全域設定。
- 必要環境變數：無；忽略的 artifacts、瀏覽器操作資料與暫存檔未上傳。
- 沒有網站部署、沒有啟用 GitHub Pages，也沒有更新原 Sites。

## 2026-10-28 00:39:17 +0800：三產品類別擴充，僅本機

- 依 Aaron 指示加入廚房櫥櫃、晶石板、酒品三類，支援專屬階段、產品數量、分類報表及同戶多產品明細。
- 新增靜態資產 `dist/products.js`，由本機 HTML 依序載入，無套件安裝或外部服務。
- 本輪未提交、未推送、未使用 Sites 同步或發布；既有線上版本未更新。後續發布平台與時機須由 Aaron 另行指定。
- 本機操作與手機／平板版面已檢查，結果及限制見 CHAT_HANDOFF。

## 2026-10-27 23:55 +0800：本機修訂，不部署

- Aaron 明確要求不使用 Sites 發布，修改後先不部署；本輪沒有執行來源推送、封裝或部署工具，也沒有改動既有線上 Site。
- 本機修訂：改用商務文案、移除宣傳區塊、加大字體與加深文字，案件卡片／列表／明細加入獨立的狀態更新日期。
- 本機入口：`start-demo.command`，或 `python3 serve.py --open`。
- 下列 Sites 記錄僅代表上一版歷史，不能當成本機最新版本的發布證據。後續發布平台待 Aaron 另行指定。

## 2026-10-27（Asia/Taipei）：首次 Demo 發布準備

- 目標：Sites 私有展示，保留建立時的 owner-only 受眾。
- project_id：`appgprj_6ae0b5274490819186aeffcf0ee112fa`。
- 預期網址：`https://baolong-followup-demo.fci1007.chatgpt.site`；此條目為發布準備，不代表已上線，完成狀態另於下方追加。
- 發布內容：`dist/` 的 buildless 靜態應用，設定由 `.openai/hosting.json` 持有。
- 必要環境變數：無。無資料庫遷移、外部 API key 或正式資料。
- 資料保存：各瀏覽器 localStorage，展示操作不跨瀏覽器共享。
- 驗證：JavaScript 語法與 Chrome 核心旅程通過；依純 Demo 要求未做正式安全、負載與外部介接驗證。
- 回復方式：Sites 版本紀錄回復，或用本機原始檔啟動。

## 2026-10-27 22:59:47 +0800：首次私有發布成功

- 原生發布工具結果：`succeeded`。
- 網址：<https://baolong-followup-demo.fci1007.chatgpt.site>。
- 受眾：建立時的私有 owner-only；沒有變更分享設定。
- 發布 commit：`b838d979726c7812543c60e6750b99f423b0079b`，分支 `main`，已推送 Sites 來源庫。
- deployment_id：`appgdep_6ae0bc5372488191a4d0fa9e02c7a38b`。
- version_id：`appgprj_6ae0b5274490819186aeffcf0ee112fa~appgver_62515e570d108191ab5da7cb00af147f`。
- 發布檔：`/tmp/baolong-followup-demo-deploy.tar.gz`（暫存封裝，不是 canonical 原件）。
- 必要環境變數：無；無正式資料遷移。
- 驗證界線：本機主要流程與三種尺寸有實際證據；Sites 回覆發布成功。Chrome 開啟線上網址逾時，尚未驗證線上頁面實開，不將本機操作當作線上驗收。
- 本次發布後只補充本機發布與交接文件，未再修改應用程式。
- 未登入 HTTP 檢查回覆 401；保留私有存取，未改為公開或繞過驗證。
