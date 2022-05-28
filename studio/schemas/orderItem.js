export default {
	title: "Mariachi, servicio y costo",
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
					{ title: "Contrato", value: "contract" },
				],
			},
		},
		{
			name: "qty",
			title: "Cantidad ",
			type: "number",
		},
		{
			name: "price",
			title: "Precio",
			type: "number",
		},
		{
			name: "deposit",
			title: "Deposito",
			type: "number",
		},
		{
			name: "fee",
			title: "Comisión",
			type: "number",
		},
		{
			name: "totalPrice",
			title: "Precio total",
			type: "number",
		},
	],
}
