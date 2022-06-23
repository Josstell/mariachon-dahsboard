export default {
	name: "figure",
	type: "object",
	title: "Image",
	fields: [
		{
			name: "url",
			type: "string",
			title: "link del archivo",
		},
		{
			name: "metadata",
			type: "object",
			title: "Metadata",
			fields: [
				{
					name: "alt",
					type: "string",
					title: "Texto alternativo",
				},

				{
					name: "caption",
					type: "string",
					title: "Texto del subtitulo",
				},
			],
		},
	],
}
