import handlerCors from "src/helpers/api/allowCors"
import client from "@lib/sanity"

export default handlerCors().put((req, res) => {
	const setMutation = {
		name: req.body.name,
		tel: req.body.tel,
		email: req.body.email,
		city: req.body.city || "",
	}

	console.log("Hurray, the bike is updated! New document:")

	client
		.patch(req.body._id) // Document ID to patch
		.set(setMutation) // Shallow merge
		.commit() // Perform the patch and return a promise
		.then((updatedUser) => {
			console.log("Hurray, the bike is updated! New document:")
			console.log(updatedUser)

			res.send({ ...updatedUser })
		})
		.catch((err) => {
			console.error("Oh no, the update failed: ", err.message)
		})
})
