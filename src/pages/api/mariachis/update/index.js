import handlerCors from "src/helpers/api/allowCors"
import client from "@lib/sanity"

export default handlerCors().put((req, res) => {
	const setMutation = {
		name: req.body.name,
		tel: req.body.tel,
		region: req.body.region || "",
		city: req.body.city,
		cp: req.body.cp,
		address: req.body.address || "",
		categorySet: [req.body.category_mariachi],
		description: req.body.description,
		coordinator: req.body.coordinator,
		members: parseInt(req.body.members) || 0,
		service: {
			hora: req.body.hora * 1,
			serenata: req.body.serenata * 1,
			contrato: req.body.contrato * 1,
		},
		images: req.body.images || [],
		videos: req.body.videos || [],
		modifiedBy: req.body.modifiedBy,
		stage: req.body.stage,
		crew: req.body.crew || [],
	}

	client
		.patch(req.body._id) // Document ID to patch
		.set(setMutation) // Shallow merge
		.commit() // Perform the patch and return a promise
		.then((updatedUser) => {
			res.send({ ...updatedUser })
		})
		.catch((err) => {
			console.error("Oh no, the update failed: ", err.message)
			res
				.status(401)
				.send({ error: { message: "Hubo un error, intentar nuevamente!" } })
		})
})
