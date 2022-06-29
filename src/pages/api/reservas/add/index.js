import handlerCors from "src/helpers/api/allowCors"
import client from "@lib/sanity"
import { nanoid } from "@reduxjs/toolkit"

export default handlerCors().post((req, res) => {
	const doc = {
		...req.body,
		_type: "booking",
		reserva: nanoid(),
	}

	client
		.create(doc)
		.then((data) => {
			console.log(`Bike was created, document ID is ${data._id}`)
			res.send({ ...data })
		})
		.catch((err) => {
			console.error("Oh no, the update failed: ", err.message)
			res
				.status(401)
				.send({ error: { message: "Hubo un error, intentar nuevamente!" } })
		})
})
