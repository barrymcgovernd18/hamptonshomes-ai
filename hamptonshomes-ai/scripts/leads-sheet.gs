/**
 * HamptonsHomes.ai leads sheet: Apps Script web app bound to the "HamptonsHomes.ai Leads" Google Sheet.
 *
 * Setup (once, signed in as the sheet owner):
 *  1. Open the sheet > Extensions > Apps Script. Replace Code.gs with this file.
 *  2. Project Settings > Script properties > add LEADS_SHEET_SECRET = (a long random string; the same value goes in Vercel).
 *  3. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone. Deploy, authorize, copy the /exec URL.
 *  4. In Vercel (hamptonshomes-ai > Settings > Environment Variables, Production): LEADS_SHEET_URL = the /exec URL,
 *     LEADS_SHEET_SECRET = the same secret.
 *
 * POST {secret, row:[Date (ET), Name, Email, Phone, Form, Page URL, Message]} appends a row.
 * GET ?secret=...&hours=24 returns {rows} received in that window, for the daily digest.
 */

var HEADERS = ["Date (ET)", "Name", "Email", "Phone", "Form", "Page URL", "Message"];

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss.getSpreadsheetTimeZone() !== "America/New_York") ss.setSpreadsheetTimeZone("America/New_York");
  var sh = ss.getSheets()[0];
  if (sh.getLastRow() === 0) sh.appendRow(HEADERS);
  return sh;
}

function authorized_(secret) {
  var expected = PropertiesService.getScriptProperties().getProperty("LEADS_SHEET_SECRET");
  return expected && secret === expected;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var data = {};
  try { data = JSON.parse(e.postData.contents); } catch (err) { return json_({ ok: false }); }
  if (!authorized_(data.secret)) return json_({ ok: false });
  var row = (data.row || []).slice(0, 7).map(function (v) {
    var s = String(v == null ? "" : v).slice(0, 4000);
    return /^[=+\-@]/.test(s) ? "'" + s : s; // keep cells as plain text
  });
  while (row.length < 7) row.push("");
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try { sheet_().appendRow(row); } finally { lock.releaseLock(); }
  return json_({ ok: true });
}

function doGet(e) {
  if (!authorized_(e.parameter.secret)) return json_({ ok: false });
  var hours = Math.min(Number(e.parameter.hours) || 24, 24 * 7);
  var since = Date.now() - hours * 3600 * 1000;
  var range = sheet_().getDataRange();
  var raw = range.getValues().slice(1);
  var shown = range.getDisplayValues().slice(1);
  var rows = shown.filter(function (r, i) {
    var t = toTime_(raw[i][0]);
    return !isNaN(t) && t >= since;
  });
  return json_({ ok: true, rows: rows });
}

/** Column A is written as "MM/DD/YYYY HH:MM" in Eastern time; Sheets may also store it as a date. */
function toTime_(v) {
  if (v instanceof Date) return v.getTime();
  var m = String(v).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4}),? (\d{1,2}):(\d{2})/);
  if (!m) return NaN;
  var iso = m[3] + "-" + pad_(m[1]) + "-" + pad_(m[2]) + "T" + pad_(m[4]) + ":" + m[5] + ":00" + etOffset_();
  return Date.parse(iso);
}

function pad_(n) { return ("0" + n).slice(-2); }

/** Current America/New_York UTC offset, e.g. "-04:00". */
function etOffset_() {
  var z = Utilities.formatDate(new Date(), "America/New_York", "Z");
  return z.slice(0, 3) + ":" + z.slice(3);
}
