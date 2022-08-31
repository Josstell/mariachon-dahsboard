export default {
	name: "user",
	title: "Usuarios",
	type: "document",
	initialValue: () => ({
		publishedAt: new Date().toISOString(),
	}),
	fields: [
		{
			name: "name",
			title: "Nombre completo",
			type: "string",
		},
		{
			name: "username",
			title: "nombre de usuario",
			type: "string",
		},
		{
			name: "tel",
			title: "Telefono",
			type: "string",
		},
		{
			name: "email",
			title: "Email",
			type: "string",
		},
		{
			name: "region",
			title: "Cidad o estado",
			type: "string",
		},
		{
			title: "Tipo de usuario:",
			name: "categorySet",
			type: "array",
			of: [{ type: "string" }],
			options: {
				list: [
					{ title: "Cliente", value: "Cliente" },
					{ title: "Coordinador", value: "Coordinador" },
					{ title: "Mariachi", value: "Mariachi" },
					{ title: "Admin", value: "Admin" },
					{ title: "Vendedor", value: "Vendedor" },
				],
			},
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
			name: "profileImage",
			type: "figure",
			title: "Imagen de perfil",
		},
		{
			name: "uid",
			title: "id de proveedor",
			type: "string",
		},
		{
			name: "provider",
			title: "Proveedor de autentificación",
			type: "string",
		},
		{
			name: "isAdmin",
			title: "Es administrador",
			type: "boolean",
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
			title: "Publicado el :",
			type: "date",
		},
	],
}
