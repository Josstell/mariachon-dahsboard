export default {
	title: "Order Item",
	name: "orderItem",
	type: "object",
	fields: [
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
			name: "fee",
			title: "Comisión",
			type: "string",
		},
		{
			name: "qty",
			title: "Cantidad ",
			type: "number",
		},
	],
}
