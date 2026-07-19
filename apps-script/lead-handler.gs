/**
 * Lead handler — quote calculator job requests → Google Sheet + email notify.
 *
 * Deploy as a Web App (see SETUP.md), paste the /exec URL into
 * LEAD_ENDPOINT in constants.ts.
 *
 * IMPORTANT: columns are written in the FIXED order of the COLUMNS array
 * below. The header row is generated from the same array, so header and data
 * can never drift apart. To add a field: add it to COLUMNS *and* to the
 * rowFor() mapping — adding a column in the Sheet alone does nothing.
 */

const SHEET_NAME = 'Leads';
const NOTIFY_EMAIL = 'info@hartstoneltd.co.nz'; // per-client: where lead alerts go
const UPLOAD_FOLDER_NAME = 'Lead Uploads'; // Drive folder for client plans/docs

const COLUMNS = [
  'Timestamp', 'Name', 'Phone', 'Email', 'Suburb', 'Best Time To Call',
  'Service', 'Area (m2)', 'Complexity', 'Materials Included',
  'Labour', 'Materials', 'Subtotal', 'GST', 'Total',
  'Special Instructions', 'Files', 'Source URL', 'Status'
];

function rowFor(data, fileLinks) {
  return [
    new Date(), data.name || '', data.phone || '', data.email || '', data.suburb || '',
    data.preferredTime || '', data.service || '', data.areaM2 || '', data.complexity || '',
    data.materialsIncluded ? 'Yes' : 'No',
    data.labour || 0, data.materials || 0, data.subtotal || 0, data.gst || 0, data.total || 0,
    data.specialInstructions || '', fileLinks.join('\n'), data.source || '', 'NEW'
  ];
}

/**
 * Saves base64-encoded uploads from the form into a Drive folder and returns
 * the share links. Files arrive as [{ name, type, data }] where data is raw
 * base64 (no data: prefix). Capped client-side at 3 files / 10 MB total.
 */
function saveFiles(data) {
  const files = data.files || [];
  if (!files.length) return [];

  const folders = DriveApp.getFoldersByName(UPLOAD_FOLDER_NAME);
  const folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(UPLOAD_FOLDER_NAME);

  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HHmm');
  const prefix = stamp + ' ' + (data.name || 'Unknown') + ' - ';

  return files.map(function (f) {
    const blob = Utilities.newBlob(
      Utilities.base64Decode(f.data),
      f.type || 'application/octet-stream',
      prefix + (f.name || 'upload')
    );
    return folder.createFile(blob).getUrl();
  });
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(COLUMNS);
      sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
    }

    // File save must never sink the lead — on failure, log it in the Files
    // column and carry on writing the row + email.
    let fileLinks;
    try {
      fileLinks = saveFiles(data);
    } catch (fileErr) {
      fileLinks = ['FILE SAVE FAILED: ' + String(fileErr)];
    }
    sheet.appendRow(rowFor(data, fileLinks));

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'New job request: ' + (data.name || 'Unknown') + ' — ' + (data.service || ''),
      body: [
        'New job request from the website quote calculator.',
        '',
        'Name: ' + (data.name || ''),
        'Phone: ' + (data.phone || ''),
        'Email: ' + (data.email || ''),
        'Suburb: ' + (data.suburb || ''),
        'Best time to call: ' + (data.preferredTime || ''),
        '',
        'Service: ' + (data.service || ''),
        'Area: ' + (data.areaM2 || '') + ' m2',
        'Complexity: ' + (data.complexity || ''),
        'Materials included: ' + (data.materialsIncluded ? 'Yes' : 'No'),
        'Quoted total (incl. GST): $' + Number(data.total || 0).toFixed(2),
        '',
        'Special instructions: ' + (data.specialInstructions || 'None'),
        'Uploaded files: ' + (fileLinks.length ? '\n' + fileLinks.join('\n') : 'None'),
        '',
        'Ring them back while it\'s hot.'
      ].join('\n')
    });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Health check so hitting the /exec URL in a browser shows the deploy works.
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'lead-handler' }))
    .setMimeType(ContentService.MimeType.JSON);
}
