import handlerCors from "src/helpers/api/allowCors"

import { callApiGoogleSheet } from "src/helpers"
//import NextCors from 'nextjs-cors'
const { SPREADSHEET_ID_MARIACHON_MARIACHIS, SHEET_ID_MARIACHIS } = process.env

export default handlerCors().post(async (req, res) => {
	// await NextCors(req, res, {
	//   // Options
	//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
	//   origin: '*',
	//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	// })

	let mariachiDetails = {
		id: req.body?._id,
		direccion: req.body?.address,
		nombre: req.body?.name || "",
		ciudad: req.body?.city || "",
		cp: req.body?.cp || "",
		estado: req.body?.region || "",
		tel: req.body?.tel || "",
		descripcion: req.body?.description || "",
		coordinador: req.body?.coordinator._ref || "",
		elementos: parseInt(req.body?.members) || 0,
		categoria: req.body?.categorySet[0] || "",
		etapa: req.body?.stage[0] || "",
		serenata: `R:${req.body?.service?.serenata?.regular || 0}, M:${
			req.body?.service?.serenata?.minimo || 0
		}, F:${req.body?.service?.serenata?.festivo || 0} `,
		hora: `R:${req.body?.service?.hora?.regular || 0}, M:${
			req.body?.service?.hora?.minimo || 0
		}, F:${req.body?.service?.hora?.festivo || 0} `,
		contrato: `R:${req.body?.service?.contrato?.regular || 0}, M:${
			req.body?.service?.contrato?.minimo || 0
		}, F:${req.body?.service?.contrato?.festivo || 0} `,
	}

	if (req.body?.modifiedBy) {
		mariachiDetails = {
			...mariachiDetails,
			modificadoPor: req.body?.modifiedBy?._ref,
			fecha_de_modificacion: req.body?.dateModified,
		}
	}

	if (req.body?.createdBy) {
		mariachiDetails = {
			...mariachiDetails,
			creadoPor: req.body?.createdBy?._ref,
			fecha_de_creacion: req.body.dateCreated,
		}
	}
	console.log(mariachiDetails)

	const { sheet, sheetGoogle } = await callApiGoogleSheet(
		SPREADSHEET_ID_MARIACHON_MARIACHIS,
		SHEET_ID_MARIACHIS
	)

	const isDataAlreadySved = sheetGoogle.find(
		(row) => row.id === mariachiDetails.id
	)

	//return res.status(200).json(mariachiDetails)

	if (isDataAlreadySved === undefined) {
		try {
			await sheet.addRow(mariachiDetails)
			return res.status(200).json({
				message: ` ${mariachiDetails.id} agregada correntamente en google sheet`,
			})
		} catch (err) {
			return res.status(400).json({
				error: err.message,
			})
		}
	} else {
		try {
			const keyObjectMariachi = Object.keys(mariachiDetails)
			const rowData = isDataAlreadySved._rowNumber - 2
			keyObjectMariachi.forEach(
				(marKey) => (sheetGoogle[rowData][marKey] = mariachiDetails[marKey])
			)
			await sheetGoogle[rowData].save() // save changes

			return res.status(200).json({
				message: ` ${mariachiDetails.id} actualizado.`,
			})
		} catch (error) {
			return res.status(400).json({
				error: error.message,
			})
		}
	}
})
