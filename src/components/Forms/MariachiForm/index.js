import React from "react"
import Form from "../Smart/Form"
import { Button, Input, Select, TextArea } from "../Smart/Inputs"

export default function MariachiForm({ methods, activeFormTab }) {
	const onSubmit = (data) => console.log(data)

	console.log("tab active:", activeFormTab)

	return (
		<Form onSubmit={onSubmit} methods={methods}>
			{/**Entradas primer tab */}
			<Input
				hidden={activeFormTab.data && true}
				name="name"
				label="Nombre del mariachi"
			/>
			<Input
				hidden={activeFormTab.data && true}
				name="address"
				label="Dirección"
			/>
			<Input hidden={activeFormTab.data && true} name="region" label="Estado" />
			<Input hidden={activeFormTab.data && true} name="tel" label="Télefono" />

			<TextArea
				hidden={activeFormTab.data && true}
				name="description"
				label="Descripción"
			/>

			{/**Entradas segundo tab */}

			<Select
				hidden={activeFormTab.mariachi && true}
				name="gender"
				options={["female", "male", "other"]}
				label="Coordinador"
			/>

			{/**Entradas tercer tab */}

			<Button message="Actualizar" />
		</Form>
	)
}
