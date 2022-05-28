import handlerCors from "src/helpers/api/allowCors"
import client from "@lib/sanity"
import { groq } from "next-sanity"

export default handlerCors().get(async (req, res) => {
	const query = groq`
        *[_type == "user"]
    `
	const user = await client.fetch(query)
	res.send(user)
})
