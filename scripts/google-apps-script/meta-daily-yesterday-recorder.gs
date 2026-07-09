/**
 * Meta daily report recorder.
 *
 * Daily premise:
 * - On 2026-07-09, record 2026-07-08 numbers.
 * - Values are written as fixed numbers, not long-lived formulas.
 * - Paste the L-step CSV into "昨日のデータ" before running the daily command.
 */

const META_DAILY_CONFIG = {
  spreadsheetId: '1enOPyfKDTw5Xf5m6rsLznZRqLfTXV9ZkaWvlEkhY1R4',
  timeZone: 'Asia/Tokyo',
  rawAdsSheetName: 'RAW_ADS',
  linePasteSheetName: '昨日のデータ',
  dailyStartRow: 9,
  dailyEndRow: 233,

  // Optional. The original script used this parent sheet, but this function is
  // intentionally separate so daily recording can run even when RAW_ADS is
  // updated by another workflow.
  parentSpreadsheetId: '1iNhzT12mSEo__INUg9iRunPfmvWekKgrt6boadldmYE',
  parentRawAdsSheetName: 'RAW_ADS',
  accountId: '1274532609362360',

  campaigns: [
    {
      sheetName: 'D121',
      rawCodes: ['D121', '広告_FB_徳武_D121', '広告_FB_ベルラス_D121'],
      lineKeywords: ['D121'],
    },
    {
      sheetName: 'D122',
      rawCodes: ['D122', '広告_FB_ベルラス_D122'],
      lineKeywords: ['D122'],
    },
    {
      sheetName: 'D123',
      rawCodes: ['D123', '広告_FB_ベルラス_D123'],
      lineKeywords: ['D123'],
    },
    {
      sheetName: 'K111',
      rawCodes: ['K111', '広告_FB_ベルラス_K111'],
      lineKeywords: ['K111'],
    },
    {
      sheetName: 'K113',
      rawCodes: ['K113', '広告_FB_ベルラス_K113'],
      lineKeywords: ['K113'],
    },
    {
      sheetName: 'N113',
      rawCodes: ['N113', '広告_FB_ベルラス_N113'],
      lineKeywords: ['N113'],
    },
    {
      sheetName: 'N114',
      rawCodes: ['N114', '広告_FB_ベルラス_N114'],
      lineKeywords: ['N114'],
    },
    {
      sheetName: 'N115',
      rawCodes: ['N115', '広告_FB_ベルラス_N115'],
      lineKeywords: ['N115'],
    },
    {
      sheetName: 'N116',
      rawCodes: ['N116', '広告_FB_ベルラス_N116'],
      lineKeywords: ['N116'],
    },
    {
      sheetName: 'N117',
      rawCodes: ['N117', '広告_FB_ベルラス_N117', '広告_FB_ベルラス_N117_A', '広告_FB_ベルラス_N117_B'],
      lineKeywords: ['N117'],
    },
    {
      sheetName: 'N118 ',
      rawCodes: ['N118', '広告_FB_ベルラス_N118'],
      lineKeywords: ['N118'],
    },
    {
      sheetName: 'N119',
      rawCodes: ['N119', '広告_FB_ベルラス_N119'],
      lineKeywords: ['N119'],
    },
    {
      sheetName: 'N120',
      rawCodes: ['N120', '広告_FB_ベルラス_N120'],
      lineKeywords: ['N120'],
    },
    {
      sheetName: 'N121',
      rawCodes: ['N121', '広告_FB_ベルラス_N121'],
      lineKeywords: ['N121'],
    },
    {
      sheetName: 'N122',
      rawCodes: ['N122', '広告_FB_ベルラス_N122'],
      lineKeywords: ['N122'],
    },
    {
      sheetName: 'C101',
      rawCodes: ['C101', '広告_FB_ベルラス_C101'],
      lineKeywords: ['C101'],
    },
    {
      sheetName: 'N104',
      rawCodes: ['N104', '広告_FB_徳武_N104'],
      lineKeywords: ['N104'],
    },
    {
      sheetName: '（セミナー誘導）ダイエット001',
      rawCodes: ['ダイエット001', 'ダイエット1', '広告_FB_ベルラス_ダイエット001（冒頭セミナー誘導）', '広告_FB_ベルラス_ダイエット001'],
      lineKeywords: ['ダイエット001'],
    },
    {
      sheetName: '（普通）ダイエット002',
      rawCodes: ['ダイエット002', 'ダイエット2', '広告_FB_ベルラス_ダイエット002'],
      lineKeywords: ['ダイエット002'],
    },
    {
      sheetName: '（普通）ダイエット003',
      rawCodes: ['ダイエット003', 'ダイエット3', '広告_FB_ベルラス_ダイエット003'],
      lineKeywords: ['ダイエット003'],
    },
    {
      sheetName: '（セミナー誘導）ダイエット004',
      rawCodes: ['ダイエット004', 'ダイエット4', '広告_FB_ベルラス_ダイエット004（セミナー誘導）', '広告_FB_ベルラス_ダイエット004'],
      lineKeywords: ['ダイエット004'],
    },
    {
      sheetName: '（セミナー誘導）ダイエット005',
      rawCodes: ['ダイエット005', '広告_FB_ベルラス_ダイエット005（セミナー誘導）', '広告_FB_ベルラス_ダイエット005'],
      lineKeywords: ['ダイエット005'],
    },
    {
      sheetName: '（普通）ダイエット006',
      rawCodes: ['ダイエット006', 'ダイエット6', '広告_FB_ベルラス_ダイエット006'],
      lineKeywords: ['ダイエット006'],
    },
    {
      sheetName: 'ダイエット05',
      rawCodes: ['ダイエット訴求', 'ダイエット05', 'ダイエット5'],
      lineKeywords: ['ダイエット05'],
    },
  ],
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Meta日報 日次')
    .addItem('前日分を記録', 'recordYesterdayMetrics')
    .addItem('指定日を記録', 'promptRecordDateMetrics')
    .addSeparator()
    .addItem('RAW同期してから前日分を記録', 'syncRawAdsThenRecordYesterday')
    .addItem('毎日トリガーを作成', 'createDailyRecordTrigger')
    .addItem('毎日トリガーを削除', 'deleteDailyRecordTriggers')
    .addToUi();
}

function recordYesterdayMetrics() {
  const dateKey = getYesterdayDateKey_();
  recordDailyMetrics_(dateKey);
}

function promptRecordDateMetrics() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.prompt('指定日を記録', 'YYYY-MM-DD 形式で入力してください。例: 2026-07-08', ui.ButtonSet.OK_CANCEL);
  if (response.getSelectedButton() !== ui.Button.OK) return;

  const dateKey = normalizeDateKey_(response.getResponseText());
  if (!dateKey) {
    ui.alert('日付を認識できませんでした。YYYY-MM-DD 形式で入力してください。');
    return;
  }
  recordDailyMetrics_(dateKey);
}

function syncRawAdsThenRecordYesterday() {
  const dateKey = getYesterdayDateKey_();
  syncRawAdsFromParentForDate_(dateKey);
  recordDailyMetrics_(dateKey);
}

function createDailyRecordTrigger() {
  deleteDailyRecordTriggers();
  ScriptApp.newTrigger('recordYesterdayMetrics')
    .timeBased()
    .everyDays(1)
    .atHour(9)
    .create();
  SpreadsheetApp.getUi().alert('毎日9時ごろに前日分を記録するトリガーを作成しました。');
}

function deleteDailyRecordTriggers() {
  ScriptApp.getProjectTriggers().forEach((trigger) => {
    const handler = trigger.getHandlerFunction();
    if (handler === 'recordYesterdayMetrics') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
}

function recordDailyMetrics_(dateKey) {
  const ss = SpreadsheetApp.openById(META_DAILY_CONFIG.spreadsheetId);
  const campaignConfigs = META_DAILY_CONFIG.campaigns;
  prepareCampaignHelperCells_(ss, campaignConfigs);

  const rawMetricsBySheet = collectRawAdsMetrics_(ss, campaignConfigs, dateKey);

  const results = [];
  campaignConfigs.forEach((campaign) => {
    const sheet = ss.getSheetByName(campaign.sheetName);
    if (!sheet) {
      results.push([campaign.sheetName, 'SKIP', 'tab not found']);
      return;
    }

    const rowNumber = findDateRow_(sheet, dateKey);
    if (!rowNumber) {
      results.push([campaign.sheetName, 'SKIP', `date row not found: ${dateKey}`]);
      return;
    }

    const raw = rawMetricsBySheet[campaign.sheetName] || emptyRawMetrics_();

    if (raw.hasData) {
      sheet.getRange(rowNumber, 2, 1, 3).setValues([[
        raw.impressions,
        raw.clicks,
        raw.cost,
      ]]);
      sheet.getRange(rowNumber, 8).setValue(raw.cv);
    } else {
      sheet.getRange(rowNumber, 2, 1, 3).clearContent();
      sheet.getRange(rowNumber, 8).clearContent();
    }
    sheet.getRange(rowNumber, 9).setFormula(makeRealCvFormula_(rowNumber));
    setMetricFormulas_(sheet, rowNumber);

    results.push([
      campaign.sheetName,
      'OK',
      raw.hasData
        ? `row ${rowNumber}: imp=${raw.impressions}, click=${raw.clicks}, cost=${raw.cost}, cv=${raw.cv}, realCvFormula=I${rowNumber}`
        : `row ${rowNumber}: RAW not found, cleared B:D/H, realCvFormula=I${rowNumber}`,
    ]);
  });

  SpreadsheetApp.flush();
  Logger.log(`recordDailyMetrics_: ${dateKey}`);
  results.forEach((row) => Logger.log(row.join(' | ')));
  SpreadsheetApp.getUi().alert(`${dateKey} 分の記録が完了しました。\n詳細はApps Scriptの実行ログを確認してください。`);
}

function collectRawAdsMetrics_(ss, campaignConfigs, dateKey) {
  const sheet = ss.getSheetByName(META_DAILY_CONFIG.rawAdsSheetName);
  if (!sheet) throw new Error(`RAW sheet not found: ${META_DAILY_CONFIG.rawAdsSheetName}`);

  const values = sheet.getDataRange().getValues();
  const result = {};
  campaignConfigs.forEach((campaign) => {
    result[campaign.sheetName] = emptyRawMetrics_();
    campaign._rawCodeSet = makeTextSet_(campaign.rawCodes);
  });

  for (let rowIndex = 1; rowIndex < values.length; rowIndex++) {
    const row = values[rowIndex];
    if (normalizeDateKey_(row[0]) !== dateKey) continue;

    const code = normalizeText_(row[6]);
    const campaignName = normalizeText_(row[5]);
    campaignConfigs.forEach((campaign) => {
      if (!matchesRawCampaign_(campaign, code, campaignName)) return;

      const bucket = result[campaign.sheetName];
      bucket.hasData = true;
      bucket.impressions += toNumber_(row[1]);
      bucket.clicks += toNumber_(row[2]);
      bucket.cost += toNumber_(row[3]);
      bucket.cv += toNumber_(row[4]);
    });
  }

  campaignConfigs.forEach((campaign) => delete campaign._rawCodeSet);
  return result;
}

function collectRealCvMetrics_(ss, campaignConfigs, dateKey) {
  const sheet = ss.getSheetByName(META_DAILY_CONFIG.linePasteSheetName);
  if (!sheet) throw new Error(`LINE CSV sheet not found: ${META_DAILY_CONFIG.linePasteSheetName}`);

  const values = sheet.getDataRange().getValues();
  const result = {};
  campaignConfigs.forEach((campaign) => {
    result[campaign.sheetName] = 0;
    campaign._lineKeywords = (campaign.lineKeywords || []).map(normalizeText_).filter(Boolean);
  });

  for (let rowIndex = 1; rowIndex < values.length; rowIndex++) {
    const row = values[rowIndex];
    if (normalizeDateKey_(row[2]) !== dateKey) continue;
    if (!normalizeText_(row[1])) continue;

    const route = normalizeText_(row[4]);
    if (!route) continue;

    campaignConfigs.forEach((campaign) => {
      if (campaign._lineKeywords.some((keyword) => route.indexOf(keyword) !== -1)) {
        result[campaign.sheetName]++;
      }
    });
  }

  campaignConfigs.forEach((campaign) => delete campaign._lineKeywords);
  return result;
}

function syncRawAdsFromParentForDate_(dateKey) {
  const parentId = META_DAILY_CONFIG.parentSpreadsheetId;
  if (!parentId) throw new Error('parentSpreadsheetId is empty.');

  const ss = SpreadsheetApp.openById(META_DAILY_CONFIG.spreadsheetId);
  const parent = SpreadsheetApp.openById(parentId);
  const source = parent.getSheetByName(META_DAILY_CONFIG.parentRawAdsSheetName);
  if (!source) throw new Error(`Parent RAW sheet not found: ${META_DAILY_CONFIG.parentRawAdsSheetName}`);

  const target = ss.getSheetByName(META_DAILY_CONFIG.rawAdsSheetName) || ss.insertSheet(META_DAILY_CONFIG.rawAdsSheetName);
  const sourceValues = source.getDataRange().getValues();
  if (sourceValues.length < 2) return;

  const header = sourceValues[0];
  const sourceRows = sourceValues.slice(1).filter((row) => {
    if (normalizeDateKey_(row[0]) !== dateKey) return false;
    if (!META_DAILY_CONFIG.accountId) return true;
    const accountId = normalizeText_(row[8]);
    return !accountId || accountId === META_DAILY_CONFIG.accountId;
  });

  const targetValues = target.getDataRange().getValues();
  const existingRows = targetValues.length > 1 ? targetValues.slice(1).filter((row) => {
    return normalizeDateKey_(row[0]) !== dateKey;
  }) : [];

  const nextValues = [header].concat(existingRows, sourceRows);
  target.clearContents();
  target.getRange(1, 1, nextValues.length, header.length).setValues(nextValues);
}

function prepareCampaignHelperCells_(ss, campaignConfigs) {
  campaignConfigs.forEach((campaign) => {
    const sheet = ss.getSheetByName(campaign.sheetName);
    if (!sheet) return;

    const lineKey = (campaign.lineKeywords || [])[0] || '';
    sheet.getRange('I2').setValue(lineKey);
    sheet.getRange('J2').clearContent();
  });
}

function setMetricFormulas_(sheet, rowNumber) {
  sheet.getRange(rowNumber, 5, 1, 3).setFormulas([[
    `=IF(B${rowNumber}=0,"",C${rowNumber}/B${rowNumber})`,
    `=IF(C${rowNumber}=0,"",D${rowNumber}/C${rowNumber})`,
    `=IF(B${rowNumber}=0,"",D${rowNumber}/B${rowNumber}*1000)`,
  ]]);
  sheet.getRange(rowNumber, 10, 1, 2).setFormulas([[
    `=IF(C${rowNumber}=0,"",I${rowNumber}/C${rowNumber})`,
    `=IF(OR(I${rowNumber}=0,D${rowNumber}=""),"",D${rowNumber}/I${rowNumber})`,
  ]]);
}

function makeRealCvFormula_(rowNumber) {
  return `=IFERROR(COUNTIFS('昨日のデータ'!$C$2:$C,">="&INT($A${rowNumber}),'昨日のデータ'!$C$2:$C,"<"&INT($A${rowNumber})+1,'昨日のデータ'!$E$2:$E,"*"&$I$2&"*",'昨日のデータ'!$B$2:$B,"<>"),0)`;
}

function findDateRow_(sheet, dateKey) {
  const start = META_DAILY_CONFIG.dailyStartRow;
  const end = Math.min(META_DAILY_CONFIG.dailyEndRow, sheet.getMaxRows());
  const values = sheet.getRange(start, 1, end - start + 1, 1).getValues();

  for (let index = 0; index < values.length; index++) {
    if (normalizeDateKey_(values[index][0]) === dateKey) {
      return start + index;
    }
  }
  return null;
}

function matchesRawCampaign_(campaign, code, campaignName) {
  if (campaign._rawCodeSet[code]) return true;

  return (campaign.rawCodes || []).some((rawCode) => {
    const normalized = normalizeText_(rawCode);
    return normalized && campaignName.indexOf(normalized) !== -1;
  });
}

function emptyRawMetrics_() {
  return {
    impressions: 0,
    clicks: 0,
    cost: 0,
    cv: 0,
    hasData: false,
  };
}

function makeTextSet_(values) {
  const result = {};
  (values || []).forEach((value) => {
    const normalized = normalizeText_(value);
    if (normalized) result[normalized] = true;
  });
  return result;
}

function normalizeText_(value) {
  return String(value == null ? '' : value).trim();
}

function toNumber_(value) {
  if (typeof value === 'number') return value;
  const normalized = normalizeText_(value).replace(/[,\s¥￥]/g, '');
  if (!normalized) return 0;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function getYesterdayDateKey_() {
  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  return Utilities.formatDate(yesterday, META_DAILY_CONFIG.timeZone, 'yyyy-MM-dd');
}

function normalizeDateKey_(value) {
  if (value instanceof Date) {
    return Utilities.formatDate(value, META_DAILY_CONFIG.timeZone, 'yyyy-MM-dd');
  }

  if (typeof value === 'number' && value > 30000 && value < 100000) {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const date = new Date(excelEpoch.getTime() + Math.floor(value) * 24 * 60 * 60 * 1000);
    return Utilities.formatDate(date, META_DAILY_CONFIG.timeZone, 'yyyy-MM-dd');
  }

  const text = normalizeText_(value);
  if (!text) return '';

  const match = text.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})/);
  if (!match) return '';

  const year = match[1];
  const month = match[2].padStart(2, '0');
  const day = match[3].padStart(2, '0');
  return `${year}-${month}-${day}`;
}
