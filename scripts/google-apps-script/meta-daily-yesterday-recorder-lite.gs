var META_DAILY_SHEET_ID = '1enOPyfKDTw5Xf5m6rsLznZRqLfTXV9ZkaWvlEkhY1R4';

// Format: [target tab name, RAW_ADS matching codes, L-step route keyword for I2]
var META_DAILY_CAMPAIGNS = [
  ['D121', ['D121', '広告_FB_徳武_D121', '広告_FB_ベルラス_D121'], 'D121'],
  ['D122', ['D122', '広告_FB_ベルラス_D122'], 'D122'],
  ['D123', ['D123', '広告_FB_ベルラス_D123'], 'D123'],
  ['K111', ['K111', '広告_FB_ベルラス_K111'], 'K111'],
  ['K113', ['K113', '広告_FB_ベルラス_K113'], 'K113'],
  ['N113', ['N113', '広告_FB_ベルラス_N113'], 'N113'],
  ['N114', ['N114', '広告_FB_ベルラス_N114'], 'N114'],
  ['N115', ['N115', '広告_FB_ベルラス_N115'], 'N115'],
  ['N116', ['N116', '広告_FB_ベルラス_N116'], 'N116'],
  ['N117', ['N117', '広告_FB_ベルラス_N117', '広告_FB_ベルラス_N117_A', '広告_FB_ベルラス_N117_B'], 'N117'],
  ['N118 ', ['N118', '広告_FB_ベルラス_N118'], 'N118'],
  ['N119', ['N119', '広告_FB_ベルラス_N119'], 'N119'],
  ['N120', ['N120', '広告_FB_ベルラス_N120'], 'N120'],
  ['N121', ['N121', '広告_FB_ベルラス_N121'], 'N121'],
  ['N122', ['N122', '広告_FB_ベルラス_N122'], 'N122'],
  ['C101', ['C101', '広告_FB_ベルラス_C101'], 'C101'],
  ['N104', ['N104', '広告_FB_徳武_N104'], 'N104'],
  ['（セミナー誘導）ダイエット001', ['ダイエット001', 'ダイエット1', '広告_FB_ベルラス_ダイエット001'], 'ダイエット001'],
  ['（普通）ダイエット002', ['ダイエット002', 'ダイエット2', '広告_FB_ベルラス_ダイエット002'], 'ダイエット002'],
  ['（普通）ダイエット003', ['ダイエット003', 'ダイエット3', '広告_FB_ベルラス_ダイエット003'], 'ダイエット003'],
  ['（セミナー誘導）ダイエット004', ['ダイエット004', 'ダイエット4', '広告_FB_ベルラス_ダイエット004'], 'ダイエット004'],
  ['（セミナー誘導）ダイエット005', ['ダイエット005', '広告_FB_ベルラス_ダイエット005'], 'ダイエット005'],
  ['（普通）ダイエット006', ['ダイエット006', 'ダイエット6', '広告_FB_ベルラス_ダイエット006'], 'ダイエット006'],
  ['ダイエット05', ['ダイエット訴求', 'ダイエット05', 'ダイエット5'], 'ダイエット05']
];

function recordYesterdayMetrics() {
  var dateKey = Utilities.formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000), 'Asia/Tokyo', 'yyyy-MM-dd');
  recordDateMetrics(dateKey);
}

function recordDateMetrics(dateKey) {
  var ss = SpreadsheetApp.openById(META_DAILY_SHEET_ID);
  var rawMap = collectRawMap_(ss, dateKey);

  META_DAILY_CAMPAIGNS.forEach(function(campaign) {
    var sheetName = campaign[0];
    var rawCodes = campaign[1];
    var lineKey = campaign[2];
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) return;

    sheet.getRange('I2').setValue(lineKey);
    sheet.getRange('J2').clearContent();

    var row = findDateRow_(sheet, dateKey);
    if (!row) return;

    var raw = sumRaw_(rawMap, rawCodes);
    if (raw.hasData) {
      sheet.getRange(row, 2, 1, 3).setValues([[raw.imp, raw.click, raw.cost]]);
      sheet.getRange(row, 8).setValue(raw.cv);
    } else {
      sheet.getRange(row, 2, 1, 3).clearContent();
      sheet.getRange(row, 8).clearContent();
    }
    sheet.getRange(row, 9).setFormula(makeRealCvFormula_(row));
    sheet.getRange(row, 5, 1, 3).setFormulas([[
      '=IF(B' + row + '=0,"",C' + row + '/B' + row + ')',
      '=IF(C' + row + '=0,"",D' + row + '/C' + row + ')',
      '=IF(B' + row + '=0,"",D' + row + '/B' + row + '*1000)'
    ]]);
    sheet.getRange(row, 10, 1, 2).setFormulas([[
      '=IF(C' + row + '=0,"",I' + row + '/C' + row + ')',
      '=IF(OR(I' + row + '=0,D' + row + '=""),"",D' + row + '/I' + row + ')'
    ]]);
  });

  SpreadsheetApp.flush();
}

function makeRealCvFormula_(row) {
  return '=IFERROR(COUNTIFS(\'昨日のデータ\'!$C$2:$C,">="&INT($A' + row + '),\'昨日のデータ\'!$C$2:$C,"<"&INT($A' + row + ')+1,\'昨日のデータ\'!$E$2:$E,"*"&$I$2&"*",\'昨日のデータ\'!$B$2:$B,"<>"),0)';
}

function collectRawMap_(ss, dateKey) {
  var sheet = ss.getSheetByName('RAW_ADS');
  var map = {};
  if (!sheet) return map;

  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    if (normalizeDateKey_(row[0]) !== dateKey) continue;
    var code = String(row[6] || '').trim();
    if (!map[code]) map[code] = {imp: 0, click: 0, cost: 0, cv: 0};
    map[code].imp += number_(row[1]);
    map[code].click += number_(row[2]);
    map[code].cost += number_(row[3]);
    map[code].cv += number_(row[4]);
  }
  return map;
}

function sumRaw_(rawMap, codes) {
  var result = {imp: 0, click: 0, cost: 0, cv: 0, hasData: false};
  codes.forEach(function(code) {
    var item = rawMap[String(code || '').trim()];
    if (!item) return;
    result.hasData = true;
    result.imp += item.imp;
    result.click += item.click;
    result.cost += item.cost;
    result.cv += item.cv;
  });
  return result;
}

function findDateRow_(sheet, dateKey) {
  var values = sheet.getRange(9, 1, 225, 1).getValues();
  for (var i = 0; i < values.length; i++) {
    if (normalizeDateKey_(values[i][0]) === dateKey) return i + 9;
  }
  return null;
}

function normalizeDateKey_(value) {
  if (value instanceof Date) {
    return Utilities.formatDate(value, 'Asia/Tokyo', 'yyyy-MM-dd');
  }
  if (typeof value === 'number' && value > 30000) {
    var date = new Date(Date.UTC(1899, 11, 30) + Math.floor(value) * 24 * 60 * 60 * 1000);
    return Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy-MM-dd');
  }
  var text = String(value || '').trim();
  var match = text.match(/^(\d{4})[\/\-\.](\d{1,2})[\/\-\.](\d{1,2})/);
  if (!match) return '';
  return match[1] + '-' + ('0' + match[2]).slice(-2) + '-' + ('0' + match[3]).slice(-2);
}

function number_(value) {
  var num = Number(String(value || 0).replace(/[,\s¥￥]/g, ''));
  return isNaN(num) ? 0 : num;
}
