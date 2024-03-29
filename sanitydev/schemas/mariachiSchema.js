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
				{
					name: "serenata",
					type: "object",
					fields: [
						{ name: "regular", type: "number", title: "Regular" },
						{ name: "minimo", type: "number", title: "Minimo" },
						{ name: "festivo", type: "number", title: "Festivo" },
					],
				},
				{
					name: "hora",
					type: "object",
					fields: [
						{ name: "regular", type: "number", title: "Regular" },
						{ name: "minimo", type: "number", title: "Minimo" },
						{ name: "festivo", type: "number", title: "Festivo" },
					],
				},
				{
					name: "contrato",
					type: "object",
					fields: [
						{ name: "regular", type: "number", title: "Regular" },
						{ name: "minimo", type: "number", title: "Minimo" },
						{ name: "festivo", type: "number", title: "Festivo" },
					],
				},
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
			name: "notes",
			title: "Notas y observaciones ",
			type: "array",
			of: [
				{
					title: "Notas y observaciones ",

					name: "note",
					type: "object",
					fields: [{ name: "note", type: "string" }],
				},
			],
		},
		{
			name: "urls",
			title: "Pagina y redes sociales ",
			type: "array",
			of: [
				{
					name: "links",
					type: "object",
					fields: [
						{ name: "url", type: "string" },
						{ name: "typeUrl", type: "string" },
					],
				},
			],
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
					{ title: "MONITOREO", value: "MONITOREO" },
					{ title: "AFILIADO", value: "AFILIADO" },
					{ title: "ANULADO", value: "ANULADO" },
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
