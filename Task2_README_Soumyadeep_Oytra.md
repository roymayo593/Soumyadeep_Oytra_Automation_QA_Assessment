# Task 2 — Hacker News Morning Brief

This n8n workflow runs hourly (or manually), reads Hacker News front-page stories from the Algolia API, keeps five IDs, enriches each story with the official Hacker News item API, sorts by score, applies a `score > 200` branch, and appends an ordered five-row batch to Google Sheets. HTTP failures use n8n error outputs to build and send an `ERROR_LOGGED` fallback row.

## Setup

1. Import `workflows/Task2_Workflow_Soumyadeep_Oytra.json` into n8n.
2. Create a Google Sheet with a tab named `Morning Brief` and columns: `Run Time`, `Branch`, `Rank`, `Story Title`, `Score`, `Author`, `Story URL`, `Enriched Comment Count`, `Status`.
3. Copy `scripts/Soumyadeep_Oytra_GoogleSheetsWebhook.gs` into Google Apps Script, replace `REPLACE_WITH_GOOGLE_SHEET_ID`, then deploy it as a Web App that executes as you and is accessible to Anyone.
4. Replace `REPLACE_WITH_APPS_SCRIPT_DEPLOYMENT_ID` in both workflow HTTP output nodes with the Web App deployment ID.
5. Execute from `Manual Test Trigger`; confirm one success response with `appended: 5`, then activate the hourly schedule.

No API keys or passwords are stored in the workflow. The Apps Script uses a script lock so concurrent requests cannot overwrite the same row, and n8n bundles the five sorted records into one POST to preserve rank order. The live assessment Sheet is available at https://docs.google.com/spreadsheets/d/1D_6R13k-R9c-26GUwOSC8IfPwDEfsaweuaUGWEmhaLE/edit.

Evidence: `screenshots/task2/Soumyadeep_Oytra_Workflow_Logic.png` and `screenshots/task2/Soumyadeep_Oytra_Execution_Success.png`.

