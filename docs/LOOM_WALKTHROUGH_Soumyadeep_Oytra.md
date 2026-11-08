# Loom Walkthrough Guide (4–5 minutes)

## 0:00–0:30 — Introduction

Introduce yourself and open the repository. State that the submission covers exploratory QA on RealWorld, an n8n automation, Google Sheets output, and a bonus uptime monitor.

## 0:30–1:30 — Task 1

Open `Task1_QA_Report_Soumyadeep_Oytra.pdf`. Briefly show the tested signup/login/article CRUD/logout coverage, the seven-row defect table, and the root-cause analysis. Call out the strongest findings: weak password acceptance, empty avatar-link names, and favorite buttons exposing icon glyphs.

## 1:30–3:30 — Task 2

Open n8n and show the full 14-node canvas. Explain: hourly/manual trigger → Algolia Hacker News API → five IDs → official HN item enrichment → score sort and formatting → `score > 200` IF branches → merge → sorted batch → Apps Script → Google Sheet. Point out the API error outputs and `ERROR_LOGGED` fallback path. Open the successful execution (`Succeeded in 5.543s`) and show the item counts, then open the Sheet and show ranks 1–5.

## 3:30–4:15 — Reliability decisions

Explain that self-hosted n8n needs a Google OAuth client, so the submission uses a credentialless Apps Script web endpoint. Mention the script lock and single-batch POST, which prevent parallel requests from overwriting or reordering rows. State that the public export contains a placeholder rather than the live writable endpoint.

## 4:15–4:45 — Bonus and close

Open `Bonus_UptimeMonitor_Soumyadeep_Oytra.json`. Explain the five-minute schedule, response-time capture, non-200 IF branch, 10-second wait, single retry, and Google Sheet alert. Close by pointing reviewers to the report, workflow JSON, screenshots, and setup README.

