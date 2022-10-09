import handlerCors from "src/helpers/api/allowCors"

import { getUsersApiAxios } from "src/apis/sanity/users"

export default handlerCors().get(async (req, res) => {
	const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

	const queryUserById = encodeURIComponent(`*[_type=="user"&&_id==$id][0]`)
	// `*[_type=="user"&&_id==$id][0]

	const { id } = req.query

	console.log("request", id)

	const params = {
		$id: JSON.stringify(id),
	}

	try {
		const resp = await getUsersApiAxios.get(
			`/query/${dataset}?query=${queryUserById}`,
			{ params }
		)
		res.send(resp.data.result)
	} catch (error) {
		res.status(401).send({ message: error })
	}
})
