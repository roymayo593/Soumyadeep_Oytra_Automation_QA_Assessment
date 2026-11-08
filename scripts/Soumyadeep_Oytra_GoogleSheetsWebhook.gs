const SHEET_ID = 'REPLACE_WITH_GOOGLE_SHEET_ID';
const SHEET_NAME = 'Morning Brief';

function doGet() {
  return jsonResponse_({ ok: true, service: 'Soumyadeep Oytra Morning Brief' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  let locked = false;

  try {
    lock.waitLock(30000);
    locked = true;

    const payload = JSON.parse((e.postData && e.postData.contents) || '{}');
    const records = Array.isArray(payload) ? payload : [payload];
    if (!records.length) throw new Error('No records supplied');

    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Target sheet not found');

    const values = records.map((record) => [
      record.runTime || new Date().toISOString(),
      record.branch || '',
      Number(record.rank || 0),
      record.title || '(untitled)',
      Number(record.score || 0),
      record.author || 'unknown',
      record.storyUrl || '',
      Number(record.enrichedCommentCount || 0),
      record.status || 'READY'
    ]);

    sheet.getRange(sheet.getLastRow() + 1, 1, values.length, values[0].length)
      .setValues(values);

    return jsonResponse_({ ok: true, appended: values.length });
  } catch (error) {
    return jsonResponse_({ ok: false, error: String(error.message || error) });
  } finally {
    if (locked) lock.releaseLock();
  }
}

function jsonResponse_(body) {
  return ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}

