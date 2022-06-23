import handlerCors from "src/helpers/api/allowCors"
import axios from "axios"
import client from "@lib/sanity"
import * as urlSlug from "url-slug"

export default handlerCors().post(async (req, res) => {
	const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
	const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
	const tokenWithWriteAccess = process.env.SANITY_API_TOKEN
	const createMutations = [
		{
			create: {
				_type: "user",
				name: req.body.name,
				email: req.body.email,
				tel: req.body.tel || "",
				categorySet: req.body.categorySet || ["Cliente"],
				region: req.body.region || "",
				profileImage: {
					url: req.body.image || "",
					alt: req.body.username || "",
				},
				uid: req.body.uid || "",
				provider: req.body.provider || "",
				slug: { current: urlSlug(req.body.name) },
				createdBy: req.body.createdBy,
			},
		},
	]
	const existUser = await client.fetch(
		`*[_type == "user" && email == $email][0]`,
		{
			email: req.body.email,
		}
	)

	if (existUser) {
		return res.status(401).send({ message: "Email o usuario ya existe!" })
	} else {
		try {
			const { data } = await axios.post(
				`https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
				{ mutations: createMutations },
				{
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${tokenWithWriteAccess}`,
					},
				}
			)

			const userId = data.results[0].id
			const user = {
				_id: userId,
				name: req.body.name,
				email: req.body.email,
				tel: req.body.tel || "",

				categorySet: req.body.categorySet || ["Cliente"],
				isAdmin: false,
			}

			return res.send({ ...user })
		} catch (error) {
			return res.status(401).send({ message: "Algo paso!" })
		}
	}
})
