import nc from "next-connect"
import client from "@lib/sanity"
import { groq } from "next-sanity"

const handler = nc()

handler.get(async (req, res) => {
	const query = groq`
        *[_type == "user"]
    `
	const user = await client.fetch(query)
	res.send(user)
})
export default handler
