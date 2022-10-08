import handlerCors from "src/helpers/api/allowCors"
import axios from "axios"
import client from "@lib/sanity"

export default handlerCors().get(async (req, res) => {
	const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
	const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
	const tokenWithWriteAccess = process.env.SANITY_API_TOKEN

	const queryUser = encodeURIComponent(
		`*[_type == "user" && !(_id in path('drafts.**'))] | order(_createdAt desc)`
	)
	try {
		const { data } = await axios.post(
			`https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}`,
			{ params: { query: queryUser } },
			{
				headers: {
					"Content-type": "application/json",
					Authorization: `Bearer ${tokenWithWriteAccess}`,
				},
			}
		)

		return res.send({ ...data })
	} catch (error) {
		return res.status(401).send({ message: "Algo paso!" })
	}
})
