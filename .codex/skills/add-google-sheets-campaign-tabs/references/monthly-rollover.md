# Monthly Rollover

Use this reference when adding a new month to the shared marketing spreadsheet.

## Scope

Apply the new month total row to visible campaign/total tabs that match this summary stack:

- one or more month total rows, such as `【2026年】6月 合計`
- `2026年トータル`
- `直近7日間`

Do not apply it to `📊レポート`, management tabs, raw tabs, or hidden historical tabs unless the user asks.

## Month Total Row

1. Read each candidate tab around the summary area and confirm the row containing `2026年トータル`.
2. Insert one row immediately above `2026年トータル`.
3. Copy the latest existing month-total row format into the new row.
4. Re-read column `A` after insertion and identify the actual first and last daily rows for the target month.
5. Set the new row label:

```text
【YYYY年】M月 合計
```

6. Source-data columns sum the target month daily rows:

```gs
B: =SUM(B{first}:B{last})
C: =SUM(C{first}:C{last})
D: =SUM(D{first}:D{last})
H: =SUM(H{first}:H{last})
I: =SUM(I{first}:I{last})
L: =SUM(L{first}:L{last})
O: =SUM(O{first}:O{last})
R: =SUM(R{first}:R{last})
T: =SUM(T{first}:T{last})
```

7. Calculated columns use the local new month row number `{R}`:

```gs
E: =IF(B{R}=0,"",C{R}/B{R})
F: =IF(C{R}=0,"",D{R}/C{R})
G: =IF(B{R}=0,"",D{R}/B{R}*1000)
J: =IF(C{R}=0,"",I{R}/C{R})
K: =IF(I{R}=0,"",D{R}/I{R})
M: =IF(I{R}=0,"",L{R}/I{R})
N: =IF(L{R}=0,"",D{R}/L{R})
P: =IF(L{R}=0,"",O{R}/L{R})
Q: =IF(O{R}=0,"",D{R}/O{R})
S: =IF(O{R}=0,"",R{R}/O{R})
U: =IF(D{R}=0,"",T{R}/D{R})
V: =IF(D{R}=0,"",T{R}/(D{R}*1.2))
```

For July 2026 in the current workbook, inserting the month row above `2026年トータル` shifted July daily rows to `50:80`, so the new row used `=SUM(B50:B80)` etc. Recompute this every month from the live date rows.

## Report Monthly Block

Monthly blocks on `📊レポート` use the same columns as campaign tabs, but source columns map to campaign summary rows:

| Report column | Source tab column |
| --- | --- |
| B | D, cost |
| C | H, CV |
| D | I, actual CV |
| G | B, impressions |
| H | C, clicks |
| L | L, interview applications |
| O | O, interviews held |
| R | R, contracts |
| T | T, sales |

Procedure:

1. Read the previous month block in formula mode. Also read labels in column `A` to understand block boundaries.
2. If the user already added a target-month heading row, keep it and build from there. Otherwise insert a new target-month block before the previous month block.
3. Insert enough rows so the full target month block fits before the previous month block.
4. Copy formats from the previous month block. Overwrite only `userEnteredValue`.
5. Build diet and training sections using current visible campaign tabs. Include newly added tabs from the same session.
6. Campaign rows reference the new month total row on each source tab. If the new month total row is row `{M}`, a campaign report row `{R}` uses:

```gs
B: ='<TAB>'!D{M}
C: ='<TAB>'!H{M}
D: ='<TAB>'!I{M}
E: =IFERROR(D{R}/H{R},0)
F: =IFERROR(B{R}/D{R},0)
G: ='<TAB>'!B{M}
H: ='<TAB>'!C{M}
I: =IFERROR(B{R}/G{R}*1000,0)
J: =IFERROR(H{R}/G{R},0)
K: =IFERROR(B{R}/H{R},0)
L: ='<TAB>'!L{M}
M: =IF(D{R}=0,"",L{R}/D{R})
N: =IFERROR(B{R}/L{R},"-")
O: ='<TAB>'!O{M}
P: =IF(L{R}=0,"",O{R}/L{R})
Q: =IF(O{R}=0,"",B{R}/O{R})
R: ='<TAB>'!R{M}
S: =IF(O{R}=0,"",R{R}/O{R})
T: ='<TAB>'!T{M}
U: =T{R}/B{R}
V: =IF(B{R}=0,"",T{R}/(D{R}*1.2))
```

7. Category total rows sum the local campaign rows and any blank separator row used by the existing layout:

```gs
B: =SUM(B{first_campaign}:B{blank_after_campaigns})
...
T: =SUM(T{first_campaign}:T{blank_after_campaigns})
```

Calculated total columns use the same local formulas as campaign rows, pointed at the total row.

## Validation

Before replying:

- Confirm every qualifying tab has the new month total label and formulas.
- Confirm `2026年トータル` and `直近7日間` shifted down and still point at daily rows.
- Confirm the report tab has the target month date heading, both category sections, all current campaigns, and category totals.
- Confirm the previous month block still exists below the new block.
- Spot-check formulas in source columns and total ranges.
