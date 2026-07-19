# Lead capture setup — per client (5 minutes)

Custom form on the booking page posts the full quote + contact details to a
Google Apps Script Web App, which writes a row to a Google Sheet and emails
the client.

## Steps

1. Create a new Google Sheet named `<Client> — Website Leads` (in the client's
   Google account if they have one, otherwise Bronx Web's).
2. In the Sheet: **Extensions → Apps Script**. Delete the default code, paste
   in `lead-handler.gs`.
3. Edit `NOTIFY_EMAIL` at the top — the client's email for lead alerts.
4. **Deploy → New deployment → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Authorise when prompted, copy the **Web app URL** (ends in `/exec`).
6. Paste that URL into `LEAD_ENDPOINT` in `constants.ts`. Build + deploy.
7. Test: hit the `/exec` URL in a browser — should return
   `{"ok":true,"service":"lead-handler"}`. Then submit the form on the live
   site and confirm the row lands in the `Leads` tab + email arrives.

## Gotchas (learned the hard way)

- Columns write in the FIXED order of the `COLUMNS` array in the script.
  Adding a column in the Sheet does nothing — add the field to `COLUMNS` and
  `rowFor()` and re-deploy (**Deploy → Manage deployments → Edit → New
  version**, same URL).
- Editing the script does NOT update the live web app until you deploy a new
  version.
- The `Leads` tab + header row are auto-created on first submission.
