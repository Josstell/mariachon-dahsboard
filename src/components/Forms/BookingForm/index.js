/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useRef } from "react"
import useSearchUserByCategory from "src/hook/useSearchUserByCategory"
import { selectAllUsers } from "store/features/users/userSlice"
import Form from "../Smart/Form"
import { Button, Input, RadioButton, Select, TextArea } from "../Smart/Inputs"

import { TrashIcon } from "@heroicons/react/outline"

import { regions } from "../../../helpers/dataset"
import { selectAllMariachis } from "store/features/mariachis/mariachiSlice"
import { useSelector } from "react-redux"

const BookingForm = ({
	methods,
	arrayPlayList,
	setArrayPlayList,
	setUserbyId,
	setMariachibyId,
	onSubmit,
}) => {
	const regionData = regions.response.estado

	const activeFormTab = useSelector((state) => state.bookings.bookingTabActive)

	const users = useSelector(selectAllUsers)
	const mariachis = useSelector(selectAllMariachis)

	const usersByClient = useSearchUserByCategory(users, "Client")

	// //use form
	// const { setValue } = methods

	// useEffect(() => {
	// 	setValue("nameClient", userbyId.name)
	// 	setValue("telClient", userbyId.tel)
	// 	setValue("emailClient", userbyId.email)
	// }, [userbyId])

	// useEffect(() => {
	// 	setValue("idMariachi", mariachibyId._id)
	// }, [mariachibyId])

	// useEffect(() => {
	// 	setValue("idMariachi", reserva.orderItems.mariachi._id)
	// 	setValue("clientId", reserva.client._id)
	// 	setValue("address", reserva.shippingAddress.address)
	// 	setValue("city", reserva?.shippingAddress.city || "")
	// 	setValue("cp", reserva?.shippingAddress.cp || "")
	// 	setValue("region", reserva?.shippingAddress.region || "")
	// 	setValue("dateAndTime", reserva?.dateAndTime)
	// 	setValue("members", reserva.orderItems.members)
	// 	setValue("category_mariachi", reserva?.orderItems?.categorySet)
	// 	setValue("fee", reserva.orderItems.fee || 0)
	// 	setValue("qty", reserva.orderItems.qty || 0)
	// 	setValue("price", reserva.orderItems.price)
	// 	setValue("deposit", reserva.orderItems.deposit)
	// 	setValue(
	// 		"service",
	// 		reserva?.orderItems?.service === undefined
	// 			? ""
	// 			: reserva?.orderItems?.service
	// 	)
	// 	setValue("message", reserva.message)

	// 	//
	// }, [reserva.orderItems.categorySet, reserva.orderItems.members])

	// const onSubmit = (data) => {
	// 	const reservaUpdate = {
	// 		client: { _ref: data.clientId, _type: "reference" },
	// 		dateAndTime: data.dateAndTime,
	// 		message: data.message,
	// 		orderItems: [
	// 			{
	// 				mariachi: {
	// 					_ref: data.idMariachi,
	// 					_type: "reference",
	// 				},
	// 				categorySet: data.category_mariachi,
	// 				members: data.members,
	// 				service: data.service,
	// 				price: data.price * 1,
	// 				deposit: data.deposit * 1 || 0,
	// 				qty: data.qty * 1,
	// 				_key: reserva.orderItems._key,
	// 				_type: "orderItem",
	// 			},
	// 		],
	// 		// paymentResult: {
	// 		// 	_type: "paymentResult",
	// 		// 	email_address: "xonitg@gmail.com",
	// 		// },
	// 		playlist: arrayPlayList,
	// 		shippingAddress: {
	// 			address: data.address,
	// 			city: data.city,
	// 			cp: data.cp,
	// 			region: data.region,
	// 		},
	// 		//	status: ["PE"],
	// 		userName: data.nameClient,
	// 		_id: reserva._id,
	// 	}

	// 	setLoading(!loading)
	// 	dispatch(updateBooking(reservaUpdate))
	// 	setLoading(!loading)

	// 	router.push("/reservas")
	// }

	const hangleGetClient = (e) => {
		const userSelected = users.find((user) => user._id === e.target.value)
		setUserbyId(userSelected)
	}

	const hangleGetMariachi = (e) => {
		const mariachiSelected = mariachis.find((mar) => mar._id === e.target.value)
		setMariachibyId(mariachiSelected)
	}

	// Add new song
	const playlistRef = useRef("")

	const handlePlaylist = () => {
		setArrayPlayList((playlist) => [...playlist, playlistRef.current.value])
	}

	const handleErasePlaylist = (index) => {
		console.log("numero cancion", index)
		setArrayPlayList(arrayPlayList.filter((list, idx) => idx !== index))
	}

	useEffect(() => {
		playlistRef.current.value = ""
	}, [arrayPlayList])

	//

	return (
		<>
			<Form onSubmit={onSubmit} methods={methods}>
				{/** Cliente */}

				<Select
					hidden={activeFormTab.client}
					name="clientId"
					options={usersByClient}
					label="Cambiar cliente"
					onChange={(e) => hangleGetClient(e)}
				/>
				<Input
					hidden={activeFormTab.client}
					name="nameClient"
					label=" Nombe del cliente"
				/>
				<Input
					hidden={activeFormTab.client}
					name="telClient"
					label="Teléfono"
				/>
				<Input
					hidden={activeFormTab.client}
					name="emailClient"
					label="Correo electrónico"
				/>

				{/** Direccion */}
				<Input
					hidden={activeFormTab.address}
					name="dateAndTime"
					type="datetime-local"
					label=" Fecha y hora del servicio"
				/>

				<Input
					hidden={activeFormTab.address}
					name="address"
					label="Dirección"
				/>
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
					name="idMariachi"
					options={mariachis}
					label="Cambiar mariachi"
					onChange={(e) => hangleGetMariachi(e)}
				/>

				<RadioButton
					hidden={activeFormTab.mariachi}
					name="category_mariachi"
					label={["Basico", "Normal", "Premium"]}
					type="radio"
				/>
				<Input
					hidden={activeFormTab.mariachi}
					name="members"
					label="Numero de elementos"
				/>

				<h3 className={`${!activeFormTab.mariachi && "hidden"}`}>
					Servicio y Precio
				</h3>

				<RadioButton
					hidden={activeFormTab.mariachi}
					name="service"
					label={["serenata", "hora", "contrato"]}
					type="radio"
				/>

				<Input
					hidden={activeFormTab.mariachi}
					name="price"
					label="Precio"
					type="number"
				/>
				<Input
					hidden={activeFormTab.mariachi}
					name="deposit"
					label="Deposito"
					type="number"
				/>
				<Input
					hidden={activeFormTab.mariachi}
					name="fee"
					label="Comisión"
					type="number"
				/>
				<Input
					hidden={activeFormTab.mariachi}
					name="qty"
					label="Cantidad"
					type="number"
				/>

				<TextArea
					hidden={activeFormTab.parameters}
					name="message"
					label="Mensaje"
				/>

				<div className={`${!activeFormTab.parameters && "hidden"}`}>
					<div
						className={`border-dashed border-t-2 border-t-slate-100   n my-6 relative ${
							!activeFormTab.parameters && "hidden"
						}`}
					>
						<h3 className="absolute px-2 left-0 bg-slate-900 -top-3">
							Lista de canciones
						</h3>
					</div>

					<div className="flex justify-between items-center ">
						<div className="flex flex-col">
							<div className=" items-center border-b border-teal-500 py-2">
								<input
									ref={playlistRef}
									className="appearance-none bg-transparent border-none w-full text-slate-700 dark:text-slate-100 mr-3 py-1 px-2 leading-tight focus:outline-none"
									type="text"
									placeholder="Agregar nombre de canción"
								/>
							</div>
						</div>

						<button
							className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
							type="button"
							onClick={() => handlePlaylist()}
						>
							Agregar
						</button>
					</div>
					<div className="mt-10 ">
						<ol className="text-xs list-decimal  text-slate-700 dark:text-slate-100 ">
							{arrayPlayList.length > 0
								? arrayPlayList.map((list, index) => (
										<li key={index} className="flex justify-between my-2 px-10">
											{list}
											<TrashIcon
												className="w-4 cursor-pointer"
												onClick={() => handleErasePlaylist(index)}
											/>
										</li>
								  ))
								: null}
						</ol>
					</div>
				</div>

				<Button message="Actualizar" />
			</Form>
		</>
	)
}

export default BookingForm
