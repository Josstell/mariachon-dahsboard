import client from "@lib/sanity"

export const userExist = async (email, tel) => {
	const queryExist = `*[_type == "user" && (email == $emailE || tel == $telE)  ][0]`

	const existUser = await client.fetch(queryExist, {
		emailE: email,
		telE: tel,
	})

	if (existUser === null) {
		return false
	} else if (existUser?.email === email && existUser.tel !== tel) {
		return { message: "Email ya existe!" }
	} else if (existUser?.email !== email && existUser?.tel === tel) {
		return { message: "Teléfono ya existe!" }
	} else if (existUser?.email === email && existUser?.tel === tel) {
		return { message: "Email y teléfono ya existen!" }
	}
}

export const mariachiExist = async (name, tel, region) => {
	const queryExist = `*[_type == "mariachi" && ((name == $nameE && region == $regionE) || tel == $telE  )][0]`

	const existMariachi = await client.fetch(queryExist, {
		nameE: name,
		telE: tel,
		regionE: region,
	})

	if (existMariachi === null) {
		return false
	} else if (
		existMariachi?.name.toUpperCase() === name.toUpperCase() &&
		existMariachi?.region.toUpperCase() === region.toUpperCase() &&
		existMariachi.tel !== tel
	) {
		return {
			message: `Este nombre ya existe en esta región, -${existMariachi.region}-`,
		}
	} else if (
		existMariachi?.name.toUpperCase() !== name.toUpperCase() &&
		existMariachi?.tel === tel
	) {
		return { message: "Teléfono principal ya existé!" }
	} else if (
		existMariachi?.name.toUpperCase() === name.toUpperCase() &&
		existMariachi?.tel === tel &&
		existMariachi?.region === region
	) {
		return { message: "Nombre y teléfono ya existen en esta región!" }
	} else {
		return false
	}
}

export const optionsDate = {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
	timeZone: "America/Mexico_City",
}

export const optionsDateShort = {
	weekday: "short",
	year: "numeric",
	month: "short",
	day: "numeric",
	timeZone: "America/Mexico_City",
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
		timeZone: "America/Mexico_City",
	}

	const mariachiCoordinatorPhone = "52" + reservationData?.coordinator?.tel
	const date = new Date(reservationData?.dateAndTime)
	const remainder =
		reservationData?.orderItems?.price * reservationData?.orderItems?.qty -
		reservationData?.orderItems?.deposit
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
		" integrantes" +
		sl +
		"*Servicio:* " +
		reservationData?.orderItems?.service +
		"x" +
		reservationData?.orderItems?.qty +
		sl +
		"*Precio total:* $" +
		reservationData?.orderItems?.price * reservationData?.orderItems?.qty +
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
	const options = { timeZone: "America/Mexico_City" }
	var timeFormal1 = new Date(
		new Date(dateFormal).toLocaleString("en-MX", {
			timeZone: "America/Mexico_City",
		})
	)
	var timeFormal = new Date(dateFormal)

	var hour = timeFormal1.getHours()

	switch (true) {
		case hour >= 0 && hour < 6:
			// eslint-disable-next-line no-case-declarations

			var dayBefore = getDayBefore(timeFormal)

			return (
				timeFormal.toLocaleTimeString("es-MX", options) +
				" de la madrugada de " +
				dayBefore.dayAfter.toLocaleDateString("es-MX", {
					weekday: "long",
					timeZone: "America/Mexico_City",
				}) +
				" para " +
				dayBefore.day.toLocaleDateString("es-MX", {
					weekday: "long",
					timeZone: "America/Mexico_City",
				})
			)
		case hour >= 6 && hour < 12:
			return timeFormal.toLocaleTimeString("en-MX", options) + " de la mañana."
		case hour >= 12 && hour < 19:
			return timeFormal.toLocaleTimeString("en-MX", options) + " de la tarde."
		case hour >= 19 && hour <= 23:
			return timeFormal.toLocaleTimeString("en-MX", options) + " de la noche."
	}
}

export const transformDataMariachiToUpdate = (dataMariachi) => {
	return {
		name: dataMariachi?.name,
		tel: dataMariachi?.tel,
		region: dataMariachi?.region || "",
		city: dataMariachi?.city,
		cp: dataMariachi?.cp,
		address: dataMariachi?.address || "",
		categorySet: [dataMariachi?.category_mariachi],
		description: dataMariachi?.description,
		coordinator: dataMariachi?.coordinator,
		members: parseInt(dataMariachi?.members) || 0,
		logo: dataMariachi?.logo,
		images: dataMariachi?.images || [],
		videos: dataMariachi?.videos || [],
		service: dataMariachi?.service,
		modifiedBy: dataMariachi?.modifiedBy,
		stage: dataMariachi?.stage,
		crew: dataMariachi?.crew || [],
	}
}

export const transformDataUserToAdd = (dataUser) => {
	return {
		_type: "user",
		name: dataUser.name,
		username: dataUser.name.split(" ").join("").toLocaleLowerCase(),
		email: dataUser.email,
		tel: dataUser.tel || "",
		categorySet: dataUser?.categorySet || ["Cliente"],
		region: dataUser?.region || "",

		uid: dataUser?.uid || "",
		stage: dataUser?.stage,

		slug: { current: dataUser?.name.split(" ").join("-").toLocaleLowerCase() },
		createdBy: dataUser?.createdBy,
		dateCreated: dateGral.toLocaleDateString("es-MX", optionsDate),
	}
}

export const transformDataMariachiToAdd = (dataMariachi) => {
	return {
		...dataMariachi,
		_type: "mariachi",

		slug: {
			current: dataMariachi.name.split(" ").join("-").toLocaleLowerCase(),
		},
	}
}

export const formatoMoneda = (valor) => {
	return valor.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigit: 2,
	})
}

export const formatoPorcentaje = (valor) => {
	return valor.toLocaleString("en-US", {
		style: "percent",
		minimumFractionDigit: 2,
	})
}

export const phoneFormat = (input) => {
	if (!input || isNaN(input)) return `input must be a number was sent ${input}`
	if (typeof input !== "string") input = input.toString()
	if (input.length === 10) {
		return input.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
	} else if (input.length < 10) {
		return "was not supplied enough numbers please pass a 10 digit number"
	} else if (input.length > 10) {
		return "was supplied too many numbers please pass a 10 digit number"
	} else {
		return "something went wrong"
	}
}

export const getDateAvantAndBefore = (dateSelected) => {
	console.log("En funcion:", dateSelected)

	const dateAB = {
		before: new Date(dateSelected),
		after: new Date(dateSelected),
	}

	dateAB.before.setDate(dateSelected.$D - 1)
	dateAB.after.setDate(dateSelected.$D + 1)

	return {
		before: dateAB.before.toISOString(),
		after: dateAB.after.toISOString(),
	}
}
