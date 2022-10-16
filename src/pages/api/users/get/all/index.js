import handlerCors from "src/helpers/api/allowCors"

import { getUsersApiAxios } from "src/apis/sanity/users"

export default handlerCors().get(async (req, res) => {
	const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

	const queryUser = `*[_type == "user" && !(_id in path('drafts.**'))] | order(_createdAt desc)`

	const queryParams = { query: queryUser }

	try {
		const resp = await getUsersApiAxios.get(`/query/${dataset}`, {
			params: queryParams,
		})

		res.send(resp.data.result)
	} catch (error) {
		res.status(401).send({ message: error.message })
	}
})
