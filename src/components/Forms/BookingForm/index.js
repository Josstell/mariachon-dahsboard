import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import useSearchUserByCategory from "src/hook/useSearchUserByCategory"
import { selectAllUsers } from "store/features/users/userSlice"
import Form from "../Smart/Form"
import { Button, Input, Select } from "../Smart/Inputs"

import { regions } from "../../../helpers/dataset"
import { selectAllMariachis } from "store/features/mariachis/mariachiSlice"

const BookingForm = ({ methods, reserva }) => {
	const regionData = regions.response.estado
	const [userbyId, setUserbyId] = useState(reserva.client)
	//const [mariachibyId, setMariachibyId] = useState(reserva.orderItems.mariachi)

	const activeFormTab = useSelector((state) => state.bookings.bookingTabActive)

	const users = useSelector(selectAllUsers)
	const mariachis = useSelector(selectAllMariachis)
	const { setValue } = methods

	const usersByClient = useSearchUserByCategory(users, "Client")

	useEffect(() => {
		setValue("nameClient", userbyId.name)
		setValue("telClient", userbyId.tel)
		setValue("emailClient", userbyId.email)
	}, [userbyId])

	useEffect(() => {
		setValue("address", reserva.shippingAddress.address)
		setValue("city", reserva?.shippingAddress.city || "")
		setValue("cp", reserva?.shippingAddress.cp || "")
		setValue("region", reserva?.shippingAddress.region || "")

		//
	}, [])

	const onSubmit = (data) => {
		console.log(data)
	}

	const hangleGetClient = (e) => {
		const userSelected = users.find((user) => user._id === e.target.value)
		setUserbyId(userSelected)
	}

	const hangleGetMariachi = () => {}

	console.log("regiosn", reserva)

	return (
		<Form onSubmit={onSubmit} methods={methods}>
			{/** Cliente */}
			<Select
				hidden={activeFormTab.client}
				name="clientId"
				options={usersByClient}
				label="Cambiar cliente"
				onChange={hangleGetClient}
			/>
			<Input
				hidden={activeFormTab.client}
				name="nameClient"
				label=" Nombe del cliente"
			/>
			<Input hidden={activeFormTab.client} name="telClient" label="Teléfono" />
			<Input
				hidden={activeFormTab.client}
				name="emailClient"
				label="Correo electrónico"
			/>

			{/** Direccion */}

			<Input hidden={activeFormTab.address} name="address" label="Dirección" />
			<Input
				hidden={activeFormTab.address}
				name="city"
				label="Ciudad o municipio"
			/>

			<Select
				hidden={activeFormTab.address}
				name="region"
				options={regionData}
				label="Estado"
			/>
			<Input hidden={activeFormTab.address} name="cp" label="Codigo postal" />

			<Input
				hidden={activeFormTab.address}
				name="location"
				label="Enlace de ubicación GoogleMaps"
			/>

			{/** Mariachi */}
			<Select
				hidden={activeFormTab.mariachi}
				name="mariachiId"
				options={mariachis}
				label="Cambiar mariachi"
				onChange={hangleGetMariachi}
			/>

			<Button message="Actualizar" />
		</Form>
	)
}

export default BookingForm
