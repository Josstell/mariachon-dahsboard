export default {
	name: "video",
	type: "object",
	title: "Video",
	fields: [
		{
			name: "url",
			type: "string",
			title: "link del archivo",
		},
		{
			name: "public_id",
			type: "string",
			title: "Cloudinary Id",
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
