export default {
	name: "booking",
	title: "Reservación",
	type: "document",
	initialValue: () => ({
		publishedAt: new Date().toISOString(),
	}),
	fields: [
		{
			name: "client",
			title: "Cliente",
			type: "reference",
			to: { type: "user" },
		},
		{
			name: "region",
			type: "string",
			title: "Estado ",
		},
		{
			name: "address",
			title: "Dirección del evento",
			type: "string",
		},
		{
			name: "location",
			title: "Ubicación del evento",
			type: "string",
		},
		{
			name: "dateAndTime",
			title: "Fecha y Hora del evento",
			type: "datetime",
			options: {
				dateFormat: "YYYY-MM-DD",
				timeFormat: "HH:mm",
				timeStep: 15,
				calendarTodayLabel: "Today",
			},
		},
		{
			name: "mariachi",
			title: "Mariachi",
			type: "reference",
			to: { type: "mariachi" },
			options: {
				disableNew: true,
			},
		},
		{
			name: "service",
			title: "Servicio",
			type: "array",
			of: [{ type: "string" }],
			options: {
				list: [
					{ title: "Serenata", value: "serenata" },
					{ title: "Hora", value: "hora" },
				],
			},
		},
		{
			name: "price",
			title: "Precio",
			type: "string",
		},
		{
			name: "deposit",
			title: "Deposito",
			type: "string",
		},

		{
			name: "payment",
			title: "Tipo de pago",
			type: "array",
			of: [{ type: "string" }],
			options: {
				list: [
					{ title: "Efectivo", value: "cash" },
					{ title: "Deposito", value: "deposit" },
					{ title: "Targeta", value: "target" },
					{ title: "Bitcoin", value: "btc" },
				],
			},
		},
		{
			name: "message",
			title: "Mensaje",
			type: "richText",
		},
		{
			title: "Lista de canciones",
			name: "playlist",
			type: "array",
			of: [{ type: "string" }],
		},
		{
			name: "qty",
			title: "Cantidad",
			type: "number",
		},

		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "dateAndTime",
				maxLength: 96,
			},
		},
		{
			name: "state",
			title: "Estado de la reservación",
			type: "array",
			of: [{ type: "string" }],
			options: {
				list: [
					{ title: "Pendiente a enviar", value: "PE" },
					{ title: "Enviada", value: "E" },
					{ title: "Realizada NC", value: "RNC" },
					{ title: "Realizada CC", value: "RCC" },
					{ title: "Cancelada", value: "C" },
				],
			},
		},
		{
			name: "publishedAt",
			title: "Publicado en la fecha de :",
			type: "datetime",
		},
	],
}
