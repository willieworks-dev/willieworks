# Formula Patterns

Use these patterns after reading live sheet metadata and existing formulas. Prefer adapting from existing rows through copy/paste, then overwrite only `userEnteredValue` where campaign names and sheet references change.

For monthly total rows and monthly report blocks, also read `monthly-rollover.md`.

## Workbook Structure

Expected key tabs:

- `📊レポート`: previous-day and weekly report tables.
- `養成講座合計`: daily aggregate for training-course tabs.
- `ダイエット合計`: daily aggregate for diet tabs.
- Training tabs: same daily table structure, usually pink.
- Diet tabs: same daily table structure, usually blue and often frozen through row 3.

Daily campaign tab columns:

| Column | Meaning |
| --- | --- |
| A | Date |
| B | Impressions |
| C | Clicks |
| D | Cost |
| E | CTR |
| F | CPC |
| G | CPM |
| H | CV |
| I | Actual CV |
| L | Interview applications |
| O | Interviews held |
| R | Contracts |
| T | Sales |

Manual source input columns to clear on newly duplicated campaign tabs: `B:D`, `H:I`, `L`, `O`, `R`, `T`, starting at row 8.

## Previous-Day Report Row

`📊レポート` previous-day columns `A:M` are:

`CP名`, `日予算`, `広告費`, `CV`, `実CV`, `CVR`, `CPA`, `IMP`, `クリック`, `CPM`, `CTR`, `CPC`, `前日ステータス`.

For a new campaign tab named `<TAB>` on report row `{R}`:

```gs
A: <display campaign name>
B: blank unless user provides daily budget
C: =IFERROR(INDEX('<TAB>'!D:D,MATCH(TEXT(TODAY()-1,"yyyy/mm/dd"),ARRAYFORMULA(TEXT('<TAB>'!A:A,"yyyy/mm/dd")),0)),0)
D: =IFERROR(INDEX('<TAB>'!H:H,MATCH(TEXT(TODAY()-1,"yyyy/mm/dd"),ARRAYFORMULA(TEXT('<TAB>'!A:A,"yyyy/mm/dd")),0)),0)
E: =IFERROR(INDEX('<TAB>'!I:I,MATCH(TEXT(TODAY()-1,"yyyy/mm/dd"),ARRAYFORMULA(TEXT('<TAB>'!A:A,"yyyy/mm/dd")),0)),0)
F: =IFERROR(E{R}/I{R},0)
G: =IFERROR(C{R}/E{R},0)
H: =IFERROR(INDEX('<TAB>'!B:B,MATCH(TEXT(TODAY()-1,"yyyy/mm/dd"),ARRAYFORMULA(TEXT('<TAB>'!A:A,"yyyy/mm/dd")),0)),0)
I: =IFERROR(INDEX('<TAB>'!C:C,MATCH(TEXT(TODAY()-1,"yyyy/mm/dd"),ARRAYFORMULA(TEXT('<TAB>'!A:A,"yyyy/mm/dd")),0)),0)
J: =IFERROR(C{R}/H{R}*1000,0)
K: =IFERROR(I{R}/H{R},0)
L: =IFERROR(C{R}/I{R},0)
M: 配信済
```

Google Sheets may remove quotes around sheet names like `N118_AB`; that is acceptable.

## Weekly Report Row

`📊レポート` weekly columns `A:M` are:

`CP名`, `広告費`, `CV`, `実CV`, `CVR`, `CPA`, `IMP`, `クリック`, `CPM`, `CTR`, `CPC`, `面談申込数`, `申込率`.

For a new campaign tab named `<TAB>` on weekly row `{R}`:

```gs
A: <display campaign name>
B: =SUM(FILTER('<TAB>'!D:D,'<TAB>'!A:A>=TODAY()-7,'<TAB>'!A:A<TODAY()))
C: =SUM(FILTER('<TAB>'!H:H,'<TAB>'!A:A>=TODAY()-7,'<TAB>'!A:A<TODAY()))
D: =SUM(FILTER('<TAB>'!I:I,'<TAB>'!A:A>=TODAY()-7,'<TAB>'!A:A<TODAY()))
E: =IFERROR(D{R}/H{R},0)
F: =IFERROR(B{R}/D{R},0)
G: =SUM(FILTER('<TAB>'!B:B,'<TAB>'!A:A>=TODAY()-7,'<TAB>'!A:A<TODAY()))
H: =SUM(FILTER('<TAB>'!C:C,'<TAB>'!A:A>=TODAY()-7,'<TAB>'!A:A<TODAY()))
I: =IFERROR(B{R}/G{R}*1000,0)
J: =IFERROR(H{R}/G{R},0)
K: =IFERROR(B{R}/H{R},0)
L: =SUM(FILTER('<TAB>'!L:L,'<TAB>'!A:A>=TODAY()-7,'<TAB>'!A:A<TODAY()))
M: =IF(D{R}=0,"",L{R}/D{R})
```

Replace `{R}` with the local report row number. If adapting from an existing row, verify the final 申込率 formula after writing; the expected zero-check pattern is `=IF(D{R}=0,"",L{R}/D{R})`.

## Aggregate Daily Rows

For `養成講座合計` and `ダイエット合計`, rows 8:232 are daily aggregate rows. Source-data columns use `SUM` of same-cell references from campaign tabs. Calculated metric columns use local row formulas.

Source-data columns to append new tab references to:

- `B:D`
- `H:I`
- `L`
- `O`
- `R`
- `T`

Calculated columns to preserve/fill down:

- `E:G`
- `J:K`
- `M:N`
- `P:Q`
- `S`
- `U:V`

Procedure:

1. Read row 8 formulas from the target aggregate tab.
2. Append new campaign tabs to every source-data `SUM(...)` formula.
3. Keep the calculated formulas row-relative.
4. Fill row 8 formulas down through the existing daily range, usually row 232.
5. Leave monthly, total, and recent-7-days summary rows unchanged unless their daily ranges need extension.

## Validation Checklist

Before final response, verify:

- Metadata shows every requested new tab, in the expected area, with the expected tab color.
- New campaign tabs keep summary formulas in rows 4-7.
- Sample new tab rows 8-10 have blank manual input cells and retained date/formula structure.
- `養成講座合計` or `ダイエット合計` row 8 formulas include the new tabs in each source-data column.
- `📊レポート` previous-day rows exist under the right category.
- `📊レポート` weekly rows exist under the right category.
- Category total rows include the newly inserted rows.
- No formulas in nearby existing rows were accidentally retargeted to the wrong campaign.
