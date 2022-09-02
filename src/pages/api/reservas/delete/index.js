import handlerCors from "src/helpers/api/allowCors"
import client from "@lib/sanity"

export default handlerCors().post((req, res) => {
	console.log("entro!!!")
	client
		.delete({ query: '*[_type == "booking"][0...999]' })
		.then(console.log)
		.catch(console.error)
})
