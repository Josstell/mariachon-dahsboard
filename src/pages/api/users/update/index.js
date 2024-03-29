import handlerCors from "src/helpers/api/allowCors"
import client from "@lib/sanity"
import { dateGral, optionsDate } from "src/helpers/utils"

export default handlerCors().put((req, res) => {
	let setMutation = {
		name: req.body?.name,
		tel: req.body?.tel,
		email: req.body?.email,
		categorySet: req.body?.categorySet.map((cat) => (!cat ? undefined : cat)),
		region: req.body?.region || "",
		username: req.body?.username || "",
		modifiedBy: req.body?.modifiedBy,
		dateModified: dateGral.toLocaleDateString("es-MX", optionsDate),
		stage: req.body?.stage,
	}

	if (req.body?.image) {
		setMutation = {
			...setMutation,
			profileImage: {
				///checar
				url: req.body?.image || "",
				metadata: { alt: req.body?.username || "" },
			},
		}
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
