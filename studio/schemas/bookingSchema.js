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
			name: "userName",
			title: "Nombre del cliente",
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
		// {
		// 	name: "address",
		// 	title: "Dirección del evento",
		// 	type: "string",
		// },
		// {
		// 	name: "location",
		// 	title: "Ubicación del evento",
		// 	type: "string",
		// },
		// {
		// 	name: "region",
		// 	type: "string",
		// 	title: "Estado ",
		// },
		{
			title: "Mariachi y servicio",
			name: "orderItems",
			type: "array",
			of: [
				{
					title: "Order Item",
					type: "orderItem",
				},
			],
		},
		{
			title: "Direción del evento",
			name: "shippingAddress",
			type: "shippingAddress",
		},
		{
			title: "Datos de pago",
			name: "paymentResult",
			type: "paymentResult",
		},
		{
			name: "service",
			title: "Servicio ",
			type: "string",
		},
		{
			name: "qty",
			title: "Cantidad ",
			type: "number",
		},
		{
			name: "price",
			title: "Precio total",
			type: "number",
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
			name: "status",
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
			title: "Pagado",
			name: "isPaid",
			type: "boolean",
		},
		{
			title: "Fecha de pago",
			name: "paidAt",
			type: "datetime",
		},
		{
			title: "Trabajo realizado",
			name: "isMade",
			type: "boolean",
		},

		{
			name: "publishedAt",
			title: "Publicado en la fecha de :",
			type: "datetime",
		},
	],
}
