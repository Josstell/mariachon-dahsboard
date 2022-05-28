import nc from "next-connect"

import NextCors from "nextjs-cors"

export default function handlerCors() {
	return nc({
		onError(error, req, res) {
			res
				.status(501)
				.json({ error: `Sorry something Happened! ${error.message}` })
		},
		onNoMatch(req, res) {
			res.status(405).json({ error: `Method ${req.method} Not Allowed` })
		},
	}).use(async (req, res, next) => {
		await NextCors(req, res, {
			// Options
			methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
			origin: "*",
			optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
		})

		next()
	})
}
