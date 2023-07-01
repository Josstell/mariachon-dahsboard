const GoogleSpreadsheet = require("google-spreadsheet/lib/GoogleSpreadsheet")

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
	typeof window === "undefined"
		? Buffer.from(str).toString("base64")
		: window.btoa(str)

/** **********************************************************************************************
 *
 * Google Sheet
 */

//const { SPREADSHEET_ID } = process.env
// const { SHEET_ID } = process.env

export const callApiGoogleSheet = async (SPREADSHEET_ID, SHEET_ID) => {
	const doc = new GoogleSpreadsheet(SPREADSHEET_ID)

	console.log("pass:", process.env.NEXT_PUBLIC_GOOGLE_SHEET_EMAIL_ACCOUNT)
	console.log(process.env.NEXT_PUBLIC_GOOGLE_SHEET_PRIVATE_KEY)

	await doc.useServiceAccountAuth({
		client_email: process.env.NEXT_PUBLIC_GOOGLE_SHEET_EMAIL_ACCOUNT,
		private_key: process.env.NEXT_PUBLIC_GOOGLE_SHEET_PRIVATE_KEY,
	})
	console.log("paso")

	await doc.loadInfo()
	const sheet = doc.sheetsById[SHEET_ID]
	const sheetGoogle = await sheet.getRows()
	return { sheet, sheetGoogle }
}

// export const clientGoogleSheet = async (body) => {
// 	const { SPREADSHEET_ID_MARIACHON_MARIACHIS, SHEET_ID_CLIENTES } = process.env

// 	const doc = new GoogleSpreadsheet(SPREADSHEET_ID_MARIACHON_MARIACHIS)

// 	await doc.useServiceAccountAuth({
// 		client_email: process.env.NEXT_PUBLIC_GOOGLE_SHEET_EMAIL_ACCOUNT,
// 		private_key: process.env.NEXT_PUBLIC_GOOGLE_SHEET_PRIVATE_KEY,
// 	})
// 	await doc.loadInfo()
// 	const sheet = doc.sheetsById[SHEET_ID_CLIENTES]
// 	const sheetGoogle = await sheet.getRows()

// 	const options = {
// 		weekday: "long",
// 		year: "numeric",
// 		month: "long",
// 		day: "numeric",
// 	}

// 	const date = new Date()

// 	console.log(body)

// 	let clienteDetails = {
// 		fecha_creacion: date.toLocaleDateString("es-MX", options),
// 		id: body?._id,
// 		nombre: body?.name || "",
// 		email: body?.email || "",
// 		tel: body?.tel || "",
// 		username: body?.username || "",
// 		etapa: body?.stage[0] !== undefined ? body?.stage[0] : "",
// 		role: body?.categorySet?.filter((cat) => !cat === false)[0] || "",
// 	}

// 	if (body?.modifiedBy) {
// 		clienteDetails = {
// 			...clienteDetails,
// 			modificadoPor: body?.modifiedBy?._ref,
// 			fecha_de_modificacion: body?.dateModified || date,
// 		}
// 	}

// 	if (body?.createdBy) {
// 		clienteDetails = {
// 			...clienteDetails,
// 			creadoPor: body?.createdBy?._ref,
// 			fecha_de_creacion: body?.dateCreated || date,
// 		}
// 	}
// 	console.log(clienteDetails)

// 	const isDataAlreadySved = sheetGoogle.find(
// 		(row) => row.id === clienteDetails.id
// 	)

// 	//return res.status(200).json(mariachiDetails)

// 	if (isDataAlreadySved === undefined) {
// 		try {
// 			await sheet.addRow(clienteDetails)
// 			return {
// 				message: ` ${clienteDetails.id} agregada correntamente en google sheet`,
// 			}
// 		} catch (err) {
// 			return {
// 				error: err.message,
// 			}
// 		}
// 	} else {
// 		try {
// 			const keyObjectMariachi = Object.keys(clienteDetails)
// 			const rowData = isDataAlreadySved._rowNumber - 2
// 			keyObjectMariachi.forEach(
// 				(marKey) => (sheetGoogle[rowData][marKey] = clienteDetails[marKey])
// 			)
// 			await sheetGoogle[rowData].save() // save changes

// 			return {
// 				message: ` ${clienteDetails.id} actualizado.`,
// 			}
// 		} catch (error) {
// 			return {
// 				error: error.message,
// 			}
// 		}
// 	}
// }
