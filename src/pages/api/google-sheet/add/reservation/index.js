import handlerCors from "src/helpers/api/allowCors"

import { callApiGoogleSheet } from "src/helpers"
//import NextCors from 'nextjs-cors'
const { SPREADSHEET_ID_MARIACHON_MARIACHIS, SHEET_ID_RESERVAS } = process.env

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

	//   const date = new Date()

	const date = req.body?.dateAndTime
		? new Date(req.body?.dateAndTime)
		: new Date()

	let reservaDetails = {
		id: req.body?.reserva,
		clienteId: req.body?.client?._id || "",
		nombre_cliente: req.body?.client?.name || "",
		tel: req.body?.client?.tel || "",
		fecha: date.toLocaleDateString("es-MX", options),
		hora: `${date.getHours()} : ${
			date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
		}`,
		direccion: req.body?.shippingAddress?.address || "",
		region: req.body?.shippingAddress?.region || "",
		mariachi: req.body?.orderItems?.mariachi?.name || "",
		servicio: req.body?.orderItems?.service || "",
		qty: req.body?.orderItems?.qty * 1 || 0,
		precio: req.body?.orderItems?.price * 1 || 0,
		tipo_precio: req.body?.orderItems?.priceOptionSelected || "",
		deposito: req.body?.orderItems?.deposit * 1 || 0,
		comision: req.body?.orderItems?.fee * 1 || 0,
		resta:
			req.body?.orderItems?.price * req.body?.orderItems?.qty -
				req.body?.orderItems?.deposit || 0,
		categoria: req.body?.orderItems?.categorySet || "Normal",
		mensaje: req.body?.message || "",
		status: req.body?.status[0] || "",
	}

	if (req.body?.modifiedBy) {
		reservaDetails = {
			...reservaDetails,
			modificadoPor: req.body?.modifiedBy?._ref,
			fecha_de_modificacion: req.body?.dateModified,
		}
	}

	if (req.body?.createdBy) {
		reservaDetails = {
			...reservaDetails,
			creadoPor: req.body?.createdBy?._ref,
			fecha_de_creacion: req.body.dateCreated,
		}
	}

	const { sheet, sheetGoogle } = await callApiGoogleSheet(
		SPREADSHEET_ID_MARIACHON_MARIACHIS,
		SHEET_ID_RESERVAS
	)

	const isDataAlreadySved = sheetGoogle.find(
		(row) => row.id === reservaDetails.id
	)

	//return res.status(200).json(reservaDetails)

	if (isDataAlreadySved === undefined) {
		console.log("no guardada sheet")
		try {
			await sheet.addRow(reservaDetails)
			return res.status(200).json({
				message: ` ${reservaDetails.id} agregada correntamente en google sheet`,
			})
		} catch (err) {
			console.log(err)

			return res.status(400).json({
				error: err.message,
			})
		}
	} else {
		try {
			const keyObjectMariachi = Object.keys(reservaDetails)
			const rowData = isDataAlreadySved._rowNumber - 2
			keyObjectMariachi.forEach(
				(marKey) => (sheetGoogle[rowData][marKey] = reservaDetails[marKey])
			)
			await sheetGoogle[rowData].save() // save changes

			console.log("datos guardados sheet")

			return res.status(200).json({
				message: ` ${reservaDetails.id} actualizado.`,
			})
		} catch (error) {
			return res.status(400).json({
				error: error.message,
			})
		}
	}
})
