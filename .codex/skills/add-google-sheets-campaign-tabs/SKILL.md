---
name: add-google-sheets-campaign-tabs
description: Add campaign tabs and monthly rollovers to the shared Google Sheets marketing report. Use when the user asks to add N-series training-course tabs or diet campaign tabs, wire formulas into total/report tabs, add a new month total row to every campaign/total tab, or create monthly report blocks.
---

# Add Google Sheets Campaign Tabs

## Overview

Use this skill to update the shared marketing report spreadsheet when new campaign tabs are added or when a new monthly reporting period needs to be rolled forward. The workflow is intentionally conservative: inspect live formulas first, duplicate or insert from existing same-pattern rows, then overwrite only the campaign names, month labels, and formulas that must change.

For target spreadsheet selection and environment handling, read `references/targeting-and-environments.md` before editing. For exact formula templates, column mappings, and validation checks, read `references/formula-patterns.md` before editing. For monthly rollover work, also read `references/monthly-rollover.md`.

## Required Tools

- Use the Google Drive / Google Sheets connector for live spreadsheet metadata, bounded cell reads, and `batch_update_spreadsheet`.
- If the general `google-drive:google-sheets` skill is available, use it first and follow its edit and live-read safety references.
- Do not rely on whole-sheet guesses. Read metadata and exact visible sheet names before any edit.

## Workflow

1. Confirm the target spreadsheet URL or ID from the user's latest message. Treat it as the confirmation sheet unless the user explicitly says it is production.
2. Read spreadsheet metadata and record visible sheet titles, `sheetId`, tab colors, row counts, and indexes.
3. Read affected formulas from:
   - `📊レポート`
   - `養成講座合計`
   - `ダイエット合計`
   - the same-category source tabs to duplicate
4. Choose a source tab:
   - Training-course tabs: duplicate the closest existing training tab, usually the previous `N` tab or another same-format pink tab.
   - Diet tabs: duplicate the closest existing diet tab, usually the previous blue diet tab.
5. Duplicate the source sheet, place it near related tabs, and set tab color:
   - Training-course tabs: pink, matching existing training tabs.
   - Diet tabs: blue, matching existing diet tabs.
6. Clear only manual daily input cells on new tabs, starting at row 8. Keep date formulas, summary formulas, calculated metric formulas, formatting, frozen rows, and tab color.
7. Update daily aggregate formulas:
   - `養成講座合計` for training tabs.
   - `ダイエット合計` for diet tabs.
   - Add new tab references to the SUM formulas in row 8 for each source-data column, then fill formulas down through the existing daily range.
8. Update `📊レポート`:
   - Add previous-day rows under the correct category.
   - Add weekly rows under the correct category.
   - Update category total rows so their ranges include the new rows.
9. Re-read the edited ranges and verify every new row, aggregate formula, and new tab exists before replying.

## Monthly Rollover Workflow

Use this workflow when the user asks to add a new month, such as "add July total rows" or "create the monthly report for 2026-07".

1. Read `references/monthly-rollover.md`.
2. Read metadata and identify visible campaign/total tabs that have the summary stack:
   - latest month total row(s)
   - `2026年トータル`
   - `直近7日間`
   Exclude the report tab, management tabs, raw tabs, and hidden tabs unless the user explicitly asks for them.
3. Insert the new month total row immediately above `2026年トータル` on every qualifying tab. Copy the existing month-total row format, then set formulas from the actual target-month daily rows after insertion.
4. Update the report tab monthly section:
   - Use the user's provided month heading row if it already exists.
   - Otherwise insert the new month block before the previous month block.
   - Build diet and training sections from the existing previous-month block format.
   - Reference each campaign tab's new month total row.
   - Include all current visible campaigns in the category, including any tabs added in the same session.
5. Re-read representative formulas and labels before replying.

## Safety Rules

- Use bounded reads. Do not scan whole grids unless a tool-specific export is needed and safe.
- The confirmation sheet URL, spreadsheet ID, and `gid` can change between requests. Do not reuse spreadsheet IDs, tab IDs, or URLs from prior sessions unless the user provides that exact target again.
- Production is updated by copying after confirmation. Do not edit a production spreadsheet unless the user explicitly asks for production edits.
- If the user asks to add tabs or monthly rows but does not provide a current confirmation-sheet URL or spreadsheet ID, ask for it before editing.
- After inserting rows in `📊レポート`, re-read the shifted section before building subsequent row references.
- Preserve existing row order unless the user asks for a different order.
- Preserve existing statuses and daily budgets for old rows. For new rows, leave daily budget blank unless the user provides one and default status to `配信済` unless the user gives another status.
- Clear only source input columns on new tabs: `B:D`, `H:I`, `L`, `O`, `R`, and `T` from row 8 downward.
- Do not clear rows 4-7 on new campaign tabs; those are summary formulas.
- For monthly rollovers, do not hard-code daily row ranges unless you have just verified the date rows. Inserted summary rows shift daily rows downward.

## Final Response

Briefly list the added tabs or monthly rows, the updated aggregate/report sections, and the verification performed. Mention any uncertainty or skipped verification explicitly.
