import client from "@lib/sanity"

export const userExist = async (email) => {
	const existUser = await client.fetch(
		`*[_type == "user" && email == $email][0]`,
		{
			email: email,
		}
	)
	if (existUser) {
		return res.status(401).send({ message: "Email aleardy exists" })
	}

	return false
}

export const optionsDate = {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
}

export const dateGral = new Date()
