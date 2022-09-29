import client from "@lib/sanity"

export const userExist = async (email) => {
	const existUser = await client.fetch(
		`*[_type == "user" && email == $email][0]`,
		{
			email: email,
		}
	)
	if (existUser) {
		return res.status(401).send({ message: "Email aleardy exists" })
	}

	return false
}

export const optionsDate = {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
}

export const dateGral = new Date()

export const etapesData = ["PROSPECTO", "MONITOREO", "AFILIADO", "ANULADO"]

//export const etapesClient = ["PROSPECTO", "MONITOREO", "AFILIADO", "ANULADO"]

export const userByType = ["ADMIN", "CLIENTE", "MARIACHI", "COORDINADOR"]

export const typeOfPrice = ["regular", "minimo", "festivo"]
export const mariachiCategory = ["basico", "normal", "premium"]
export const byServices = ["Inactivo", "serenata", "hora", "contrato"]

export const statusData = [
	"Todos",
	"Agendado",
	"Enviada",
	"Realizada",
	"Cancelada",
	"Actualizada",
]

export const colorEtapes = {
	PROSPECTO: "#f00a5e",
	MONITOREO: "#f99400",
	AFILIADO: "#b0da09",
	ANULADO: "#544f51",
}

/*******************************************************************
 creating WhatsApp
********************************************************************/

export const createUrlWhatsApp = (reservationData) => {
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	}

	const mariachiCoordinatorPhone = "52" + reservationData?.coordinator?.tel
	const date = new Date(reservationData?.dateAndTime)
	const remainder =
		reservationData?.orderItems?.price - reservationData?.orderItems?.deposit
	const pagado = remainder === 0 ? " *PAGADO*" : "$ " + remainder
	const sl = "%0A" // new line

	const addressNorm =
		reservationData?.shippingAddress?.address.replace("#", "%23") +
		", " +
		reservationData?.shippingAddress?.region

	// https://api.whatsapp.com/send?phone=

	let listSongs = []

	reservationData?.playlist.forEach((song) => listSongs.push(`${sl}${song} `))

	listSongs =
		reservationData?.playlist.length > 0
			? "*Lista de canciones:* " + listSongs + sl
			: ""

	const url =
		"https://wa.me/" +
		mariachiCoordinatorPhone +
		"?text=*Reserva:* " +
		reservationData?.reserva +
		sl +
		"*Nombre:* " +
		reservationData?.host?.name +
		sl +
		"*Fecha:* " +
		date.toLocaleDateString("es-MX", options) +
		sl +
		"*Hora:* " +
		date.toLocaleTimeString() +
		sl +
		"*Dirección:* " +
		addressNorm +
		sl +
		"*Teléfono:* " +
		reservationData?.host.tel +
		sl +
		"*Mariachi:* " +
		reservationData?.orderItems?.mariachi?.name +
		sl +
		"*Servicio:* " +
		reservationData?.orderItems?.service +
		sl +
		"*Precio:* $" +
		reservationData?.orderItems?.price +
		sl +
		"*Deposito:* $" +
		reservationData?.orderItems?.deposit +
		sl +
		"*Resta a pagar:* " +
		pagado +
		sl +
		"*Mensaje:* " +
		reservationData?.message +
		sl +
		"*Lista de canciones:*" +
		listSongs +
		sl +
		"*Ubicación:* "

	window.open(url, "_blank")

	return url
}
