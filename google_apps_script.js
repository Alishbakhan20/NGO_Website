/**
 * AVABODH Foundation - Google Apps Script Backend
 * 
 * Instructions:
 * 1. Go to script.google.com and create a new project.
 * 2. Delete the default code and paste this entire file in.
 * 3. Save the project as "Avabodh Website Backend".
 * 4. Create a new Google Sheet.
 * 5. Create 4 tabs named EXACTLY:
 *    - Internship Applications
 *    - Donations
 *    - CSR Collaborations
 *    - Contact Messages
 * 6. Copy the Spreadsheet ID from the URL (the long string of characters between /d/ and /edit).
 * 7. Replace the 'YOUR_SPREADSHEET_ID_HERE' string below with your actual ID.
 * 8. Click Deploy -> New deployment.
 * 9. Type: Web App. Description: "Avabodh v1". Execute as: "Me". Who has access: "Anyone".
 * 10. Click Deploy, Authorize access, and copy the "Web app URL".
 * 11. Paste that URL into js/main.js as the SCRIPT_URL variable.
 */

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // <-- IMPORTANT: Replace this!

function doPost(e) {
  // CORS setup - responding to POST request. Note: Google Apps Script Web Apps automatically handle CORS mostly.
  try {
    const doc = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    // We expect the form to pass "formType" using a hidden input.
    const formType = e.parameter.formType;
    const timestamp = new Date();
    
    let sheetName = "";
    let rowData = [];

    if (formType === 'internship') {
      sheetName = "Internship Applications";
      // Columns: Timestamp | Full Name | Email | Phone | College Name | Course & Year | Domain | Why Join | Resume Link
      rowData = [
        timestamp,
        e.parameter.fullName || "",
        e.parameter.email || "",
        e.parameter.phone || "",
        e.parameter.collegeName || "",
        e.parameter.courseYear || "",
        e.parameter.domain || "",
        e.parameter.whyJoin || "",
        e.parameter.resumeLink || ""
      ];
    } 
    else if (formType === 'donation') {
      sheetName = "Donations";
      // Columns: Timestamp | Donor Name | Email | Phone | Amount | Payment Mode | Transaction ID | Message
      rowData = [
        timestamp,
        e.parameter.donorName || "",
        e.parameter.donorEmail || "",
        e.parameter.donorPhone || "",
        e.parameter.donationAmount || "",
        e.parameter.paymentMode || "",
        e.parameter.transactionId || "",
        e.parameter.donorMessage || ""
      ];
    }
    else if (formType === 'csr') {
      sheetName = "CSR Collaborations";
      // Columns: Timestamp | Organization Name | Type | Contact Person | Designation | Email | Phone | City & State | Focus Area | Description
      rowData = [
        timestamp,
        e.parameter.orgName || "",
        e.parameter.orgType || "",
        e.parameter.contactPerson || "",
        e.parameter.designation || "",
        e.parameter.contactEmail || "",
        e.parameter.contactPhone || "",
        e.parameter.cityState || "",
        e.parameter.interestArea || "",
        e.parameter.briefDescription || ""
      ];
    }
    else if (formType === 'contact') {
      sheetName = "Contact Messages";
      // Columns: Timestamp | Name | Email | Subject | Message
      rowData = [
        timestamp,
        e.parameter.contactName || "",
        e.parameter.contactEmail || "",
        e.parameter.contactSubject || "",
        e.parameter.contactMessage || ""
      ];
    } else {
      return ContentService
        .createTextOutput(JSON.stringify({ result: 'error', message: 'Unknown formType' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Append to sheet
    let sheet = doc.getSheetByName(sheetName);
    if (!sheet) {
       // Auto-create sheet if it doesn't exist
       sheet = doc.insertSheet(sheetName);
    }
    
    sheet.appendRow(rowData);

    // Return success response to the fetch API
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(error) {
    // Return error log
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Needed to avoid 405 error if fetch makes a preflight request or if user clicks link directly
function doGet(e) {
  return ContentService.createTextOutput("AVABODH Foundation Web App is running.");
}
