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

export const statusReserva = [
	"Agendado",
	"Actualizada",
	"Enviada",
	"Realizada",
	"Cancelada",
]

export const statusData = [
	"Todos",
	"Agendado",
	"Actualizada",
	"Enviada",
	"Realizada",
	"Cancelada",
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

	let url =
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
		timeConverterToCommonPeople(reservationData?.dateAndTime) +
		sl +
		"*Dirección:* " +
		addressNorm +
		sl +
		"*Teléfono:* " +
		reservationData?.host.tel +
		sl +
		"*Mariachi:* " +
		reservationData?.orderItems?.mariachi?.name +
		" con " +
		reservationData?.orderItems?.mariachi?.members +
		" integrantes"
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
		pagado

	if (reservationData?.message !== "") {
		url = url + sl + "*Mensaje:* " + reservationData?.message
	}

	if (listSongs !== "") {
		url = url + sl + "*Lista de canciones:*" + listSongs
	}
	url = url + sl + "*Ubicación:* "

	window.open(url, "_blank")

	return url
}

/** *****************************
 *  Time algorithm
 * ***************************/

function copy(x) {
	return JSON.parse(JSON.stringify(x))
}

var getDayBefore = (datimeFormal) => {
	const days = {
		day: "",
		dayAfter: "",
	}
	var date = new Date(copy(datimeFormal))
	var jourDate = datimeFormal.getDate()
	days.day = datimeFormal
	var dayBe = jourDate - 1
	date.setDate(dayBe)
	days.dayAfter = date
	return days
}

export const timeConverterToCommonPeople = (dateFormal) => {
	var timeFormal = new Date(dateFormal)
	var hour = timeFormal.getHours()
	var min = timeFormal.getMinutes()

	if (hour === 0) {
		hour = 24
	}

	switch (true) {
		case hour >= 0 && hour < 6:
			const options = { weekday: "long" }
			var dayBefore = getDayBefore(timeFormal)
			return (
				timeFormal.toLocaleTimeString("es-US") +
				" de la madrugada de " +
				new Intl.DateTimeFormat("en-MX", options).format(dayBefore.dayAfter) +
				" para " +
				new Intl.DateTimeFormat("en-MX", options).format(dayBefore.day)
			)
		case hour >= 6 && hour < 12:
			return timeFormal.toLocaleTimeString("en-US") + " de la mañana."
		case hour >= 12 && hour < 19:
			return timeFormal.toLocaleTimeString("en-US") + " de la tarde."
		case hour >= 19 && hour <= 23:
			return timeFormal.toLocaleTimeString("en-US") + " de la noche."
	}
}
