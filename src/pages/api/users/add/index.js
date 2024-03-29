import handlerCors from "src/helpers/api/allowCors"
import axios from "axios"
import client from "@lib/sanity"
import * as urlSlug from "url-slug"
import { dateGral, optionsDate } from "src/helpers/utils"

export default handlerCors().post(async (req, res) => {
	const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
	const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
	const tokenWithWriteAccess = process.env.NEXT_PUBLIC_SANITY_API_TOKEN

	console.log("Estamos aqui!!!!!!!!", tokenWithWriteAccess, dataset, projectId)

	let createMutations = [
		{
			create: {
				_type: "user",
				name: req.body.name,
				username: req.body.name.split(" ").join("").toLocaleLowerCase(),
				email: req.body.email,
				tel: req.body.tel || "2213567899",
				categorySet: req.body?.categorySet || ["Cliente"],
				region: req.body?.region || "",

				uid: req.body?.uid || "",
				stage: req.body?.stage,

				slug: { current: urlSlug(req.body.name) },
				createdBy: req.body?.createdBy,
				dateCreated: dateGral.toLocaleDateString("es-MX", optionsDate),
			},
		},
	]

	if (req.body?.image) {
		createMutations = {
			...createMutations,
			profileImage: {
				///checar
				url: req.body?.image || "",
				metadata: { alt: req.body?.username || "" },
			},
		}
	}

	console.log("Estamos aqui!!!!!!!!", createMutations)

	const queryExist = `*[_type == "user" && (email == $emailE || tel == $telE)  ][0]`
	//`*[_type == "user" && email == $email][0]`,
	const existUser = await client.fetch(queryExist, {
		emailE: req.body?.email,
		telE: req.body?.tel || "",
	})

	if (existUser === null) {
		console.log("Estamos aqui!!!!!!!!", existUser)
		try {
			const { data } = await axios.post(
				`https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${dataset}?returnIds=true`,
				{ mutations: createMutations },
				{
					headers: {
						"Content-type": "application/json",
						"Authorization": `Bearer ${tokenWithWriteAccess}`,
					},
				}
			)

			console.log("Estamos aqui!!!!!!!!", data)

			const userId = data.results[0].id
			const user = {
				_id: userId,
				name: req.body.name,
				email: req.body.email,
				tel: req.body.tel || "",

				categorySet: req.body.categorySet || ["Cliente"],
				isAdmin: false,
			}

			return res.send({ ...user })
		} catch (error) {
			return res.status(401).send({ message: "Algo paso!" })
		}
	} else if (
		existUser?.email === req.body.email &&
		existUser.tel !== req.body.tel
	) {
		return res.status(401).send({ message: "Email ya existe!" })
	} else if (
		existUser?.email !== req.body.email &&
		existUser?.tel === req.body.tel
	) {
		return res.status(401).send({ message: "Teléfono ya existen!" })
	} else if (
		existUser?.email === req.body.email &&
		existUser?.tel === req.body.tel
	) {
		return res.status(401).send({ message: "Email y teléfono ya existen!" })
	}
})
