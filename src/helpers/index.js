const GoogleSpreadsheet = require('google-spreadsheet/lib/GoogleSpreadsheet')

export const imageInicioFullUrl = ({ src }) => `${src}`

export const shimmer = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`

export const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

/** **********************************************************************************************
 *
 * Google Sheet
 */

//const { SPREADSHEET_ID } = process.env
// const { SHEET_ID } = process.env

export const callApiGoogleSheet = async (SPREADSHEET_ID, SHEET_ID) => {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID)

  await doc.useServiceAccountAuth({
    client_email: process.env.NEXT_PUBLIC_GOOGLE_SHEET_EMAIL_ACCOUNT,
    private_key: process.env.NEXT_PUBLIC_GOOGLE_SHEET_PRIVATE_KEY,
  })
  await doc.loadInfo()
  const sheet = doc.sheetsById[SHEET_ID]
  const sheetGoogle = await sheet.getRows()
  return { sheet, sheetGoogle }
}
