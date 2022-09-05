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
			type: "text",
		},
		{
			name: "address",
			title: "Dirección",
			type: "string",
		},
		{
			name: "tel",
			title: "Teléfono",
			type: "number",
		},

		{
			title: "Ciudad",
			name: "city",
			type: "string",
		},
		{
			title: "Estado",
			name: "region",
			type: "string",
		},

		{
			title: "Codigo Postal",
			name: "cp",
			type: "string",
		},

		{
			name: "logo",
			type: "figure",
			title: "Logo de la agrupación",
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
				{ name: "serenata", type: "number", title: "Precio por serenata" },
				{ name: "hora", type: "number", title: "Precio por hora" },
				{ name: "contrato", type: "number", title: "Contrato" },
			],
		},
		{
			name: "categorySet",
			type: "array",
			of: [{ type: "string" }],
			options: {
				list: [
					{ title: "Basico", value: "Basico" },
					{ title: "Normal", value: "Normal" },
					{ title: "Premium", value: "Premium" },
				],
			},
		},
		{
			title: "Imagenes",
			name: "images",
			type: "array",
			of: [
				{
					title: "Datos de imagenes ",
					type: "figure",
				},
			],
		},
		{
			title: "Videos",
			name: "videos",
			type: "array",
			of: [
				{
					title: "Datos de Videos ",
					type: "video",
				},
			],
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
			title: "Etapa del mariachi:",
			name: "stage",
			type: "array",
			of: [{ type: "string" }],
			options: {
				list: [
					{ title: "PROSPECTO", value: "PROSPECTO" },
					{ title: "PROVEEDOR", value: "PROVEEDOR" },
				],
			},
		},
		//["PROSPECTO", "PROVEEDOR"]

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
			name: "createdBy",
			title: "Creado Por:",
			type: "reference",
			to: { type: "user" },
		},
		{
			name: "dateCreated",
			title: "Creado el:",
			type: "string",
		},
		{
			name: "modifiedBy",
			title: "Modificado Por:",
			type: "reference",
			to: { type: "user" },
		},
		{
			name: "dateModified",
			title: "Modificado el:",
			type: "string",
		},
		{
			name: "publishedAt",
			title: "Publicado en la fecha de :",
			type: "datetime",
		},
	],
}
