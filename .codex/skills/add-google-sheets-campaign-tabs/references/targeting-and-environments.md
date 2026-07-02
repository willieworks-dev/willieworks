# Targeting and Environments

## Environment Model

The user's Google Sheets workflow uses a confirmation spreadsheet first. After the confirmation sheet is checked, the result is copied into production outside this skill's normal workflow.

Default behavior:

- Treat the Google Sheets URL or spreadsheet ID in the user's latest request as the current confirmation sheet.
- Do not assume the confirmation spreadsheet URL, spreadsheet ID, or `gid` stays the same across months or tab-addition requests.
- Do not edit production unless the user explicitly says to edit production.
- If the user gives both a confirmation URL and a production URL, edit only the one they name as the target. If unclear, ask before editing.

## Target Resolution

Before making any spreadsheet edit:

1. Extract the spreadsheet ID from the latest URL or ID provided by the user.
2. If a `gid` is present, use it only as a starting tab hint; read spreadsheet metadata to resolve actual sheet titles and `sheetId` values.
3. Read metadata for the resolved spreadsheet and verify that expected tabs such as `📊レポート`, `養成講座合計`, and `ダイエット合計` exist before applying campaign-tab or monthly-rollover workflows.
4. Use the live metadata from the current target for all `sheetId`, index, row-count, and tab-color decisions.

Never carry over sheet IDs, row indexes, or `gid` values from an earlier confirmation spreadsheet without verifying them against the current target.

## When URLs Change

When the user provides a new confirmation-sheet URL, the same campaign-tab and monthly-rollover workflows still apply as long as the sheet structure matches. Start from metadata and formula inspection on that new spreadsheet, then duplicate same-category patterns from the live sheet.
