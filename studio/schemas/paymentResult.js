export default {
	title: "paymentResult",
	name: "paymentResult",
	type: "object",
	fields: [
		{
			title: "id",
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
			title: "email_address",
			name: "email_address",
			type: "string",
		},
	],
}
