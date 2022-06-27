export default {
	title: "Tipo de Pago y estado",
	name: "paymentResult",
	type: "object",
	fields: [
		{
			title: "Numero de pago",
			name: "id",
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
			title: "Estatus",
			name: "status",
			type: "string",
		},
		{
			title: "Correo electrónico",
			name: "email_address",
			type: "string",
		},
	],
}
