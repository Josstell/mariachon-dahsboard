export default {
	name: "mariachi",
	title: "Mariachi",
	type: "document",
	initialValue: () => ({
		publishedAt: new Date().toISOString(),
	}),
	fields: [
		{
			name: "name",
			title: "Nombre del Mariachi",
			type: "string",
		},
		{
			name: "description",
			title: "Descripción",
			type: "richText",
		},
		{
			name: "address",
			title: "Dirección",
			type: "string",
		},
		{
			name: "tel",
			title: "Teléfono",
			type: "string",
		},
		{
			name: "coordinator",
			title: "Coordinador",
			type: "reference",
			to: { type: "user" },
		},

		{
			name: "crew",
			title: "Elementos",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "user" }],
				},
			],
		},
		{
			name: "members",
			title: "Numero de Elementos",
			type: "number",
		},
		{
			name: "service",
			title: "Servicio y precios",
			type: "object",
			fields: [
				{ name: "serenata", type: "string", title: "Precio por serenata" },
				{ name: "hora", type: "string", title: "Precio por hora" },
				{ name: "contract", type: "string", title: "Contrato" },
			],
		},
		{
			name: "categorySet",
			type: "array",
			of: [{ type: "string" }],
			options: {
				list: [
					{ title: "Economico", value: "Economico" },
					{ title: "Normal", value: "Normal" },
					{ title: "Premium", value: "Premium" },
				],
			},
		},

		{
			name: "like",
			title: "Likes",
			type: "number",
		},
		{
			name: "score",
			title: "Calificación",
			type: "number",
		},
		{
			name: "region",
			type: "string",
			title: "Estado",
		},

		{
			name: "logo",
			type: "figure",
			title: "Logo de la agrupación",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
				maxLength: 96,
			},
		},
		{
			name: "publishedAt",
			title: "Publicado en la fecha de :",
			type: "datetime",
		},
	],
}
