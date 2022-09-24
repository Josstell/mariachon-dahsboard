import handlerCors from "src/helpers/api/allowCors"
import { callApiGoogleSheet } from "src/helpers"
//import NextCors from 'nextjs-cors'
const { SPREADSHEET_ID_MARIACHON_MARIACHIS, SHEET_ID_CLIENTES } = process.env

export default handlerCors().post(async (req, res) => {
	// await NextCors(req, res, {
	//   // Options
	//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
	//   origin: '*',
	//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	// })

	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	}

	const date = new Date()

	console.log(req.body)

	let clienteDetails = {
		fecha_creacion: date.toLocaleDateString("es-MX", options),
		id: req.body?._id,
		nombre: req.body?.name || "",
		email: req.body?.email || "",
		tel: req.body?.tel || "",
		username: req.body?.username || "",
		etapa: req.body?.stage[0] || "",
		role: req.body?.categorySet?.filter((cat) => !cat === false)[0] || "",
	}

	if (req.body?.modifiedBy) {
		clienteDetails = {
			...clienteDetails,
			modificadoPor: req.body?.modifiedBy?._ref,
			fecha_de_modificacion: req.body?.dateModified || date,
		}
	}

	if (req.body?.createdBy) {
		clienteDetails = {
			...clienteDetails,
			creadoPor: req.body?.createdBy?._ref,
			fecha_de_creacion: req.body?.dateCreated || date,
		}
	}
	console.log(clienteDetails)

	const { sheet, sheetGoogle } = await callApiGoogleSheet(
		SPREADSHEET_ID_MARIACHON_MARIACHIS,
		SHEET_ID_CLIENTES
	)

	const isDataAlreadySved = sheetGoogle.find(
		(row) => row.id === clienteDetails.id
	)

	//return res.status(200).json(mariachiDetails)

	if (isDataAlreadySved === undefined) {
		try {
			await sheet.addRow(clienteDetails)
			return res.status(200).json({
				message: ` ${clienteDetails.id} agregada correntamente en google sheet`,
			})
		} catch (err) {
			return res.status(400).json({
				error: err.message,
			})
		}
	} else {
		try {
			const keyObjectMariachi = Object.keys(clienteDetails)
			const rowData = isDataAlreadySved._rowNumber - 2
			keyObjectMariachi.forEach(
				(marKey) => (sheetGoogle[rowData][marKey] = clienteDetails[marKey])
			)
			await sheetGoogle[rowData].save() // save changes

			return res.status(200).json({
				message: ` ${clienteDetails.id} actualizado.`,
			})
		} catch (error) {
			return res.status(400).json({
				error: error.message,
			})
		}
	}
})
