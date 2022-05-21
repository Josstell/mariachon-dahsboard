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
			title: "Tipo de usuario:",
			name: "categorySet",
			type: "array",
			of: [{ type: "string" }],
			options: {
				list: [
					{ title: "Cliente", value: "client" },
					{ title: "Coordinador", value: "coordinaor" },
					{ title: "Mariachi", value: "mariachi" },
					{ title: "Admin", value: "admin" },
					{ title: "Vendedor", value: "seller" },
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
			name: "publishedAt",
			title: "Publicado el :",
			type: "date",
		},
	],
}
