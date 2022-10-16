/* eslint-disable no-mixed-spaces-and-tabs */

import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"

import BookingCard from "src/components/Cards/BookingCard"
import BookingForm from "src/components/Forms/BookingForm"
import Layout from "src/components/Layout"
import SpinnerLogo from "src/components/Spinners/SpinnerLogo"
import MariachiForbiden from "src/components/SVG/Icons/MariachiForbiden"
import BookingTa from "src/components/Tabs/ReservaTabs"
import {
	addBookingToGoogleSheet,
	selectError,
	selectStatusBEmail,
	selectStatusBook,
	selectStatusBookGS,
	setStatusBooking,
	setStatusBookingEmail,
	setStatusBookingGS,
} from "store/features/bookings/bookingSlice"
import { selectAllMariachis } from "store/features/mariachis/mariachiSlice"
import { selectAllUsers, selectUserAdmin } from "store/features/users/userSlice"

import toast, { Toaster } from "react-hot-toast"
import { nanoid } from "@reduxjs/toolkit"
import { dateGral, optionsDate } from "src/helpers/utils"
import { useAddUpdateNewBookingMutation } from "store/features/bookingsApi"

const data = {
	dateAndTime: new Date(),
	message: "",
	userName: "",

	client: {
		_id: "",
		email: "",
		name: "",
		tel: "",
	},
	orderItems: [
		{
			deposit: 0,
			mariachi: {
				_ref: "",
				_type: "reference",
			},
			price: 0,
			qty: 0,
			service: [],
			_key: "",
		},
	],

	paymentResult: {
		email_address: "",
		payment: [""],
	},
	playlist: [],

	shippingAddress: {
		address: "",
		city: "",
		region: "",
	},
	status: ["PE"],
	_id: "",
}

const newBooking = () => {
	const router = useRouter()

	const [createBooking, { error: errorAdd, isSuccess: isSuccessAdd }] =
		useAddUpdateNewBookingMutation()

	const status = useSelector(selectStatusBook)
	const statusBookGS = useSelector(selectStatusBookGS)
	const statusBEmail = useSelector(selectStatusBEmail)

	const error = useSelector(selectError)

	const userAdmin = useSelector(selectUserAdmin)

	const dataMariachi = useSelector(selectAllMariachis)
	const users = useSelector(selectAllUsers)

	const [reservaData, setreservaData] = useState(data)

	const [mariachiSelected, setMariachiSelected] = useState({})

	const [arrayPlayList, setArrayPlayList] = useState([])

	const [userbyId, setUserbyId] = useState(
		router.query?.client
			? users.find((user) => user._id === router.query?.client)
			: { name: "", email: "", tel: "" }
	)
	const [mariachibyId, setMariachibyId] = useState(
		reservaData.orderItems.mariachi
	)

	const [loading, setLoading] = useState(false)

	const dispatch = useDispatch()

	//use form
	const methods = useForm()

	const { setValue, watch, getValues } = methods

	useEffect(() => {
		if (!userAdmin.exist) {
			router.push("/reservas")
		}
		setValue("nameClient", userbyId?.name || data?.client?.name)
		setValue("telClient", userbyId?.tel || data?.client?.tel)
		setValue("emailClient", userbyId?.email || data?.client?.email)
		setValue("clientId", userbyId?._id || data?.client?._id)
	}, [userbyId])

	useEffect(() => {
		setValue("idMariachi", mariachibyId?._id)
	}, [mariachibyId])

	useEffect(() => {
		setValue("idMariachi", router.query?.mariachiId || "")
		setValue("address", reservaData.shippingAddress.address)
		setValue("city", reservaData?.shippingAddress.city || "")
		setValue("cp", reservaData?.shippingAddress.cp || "")
		setValue("region", "PUE")
		setValue("dateAndTime", new Date())
		setValue("members", reservaData.orderItems.members)
		setValue("category_mariachi", reservaData?.orderItems?.categorySet)
		setValue("fee", reservaData.orderItems.fee || 0)
		setValue("qty", reservaData.orderItems.qty || 1)
		setValue("price", reservaData.orderItems.price || 0)
		setValue("deposit", reservaData.orderItems.deposit || 0)
		setValue(
			"service",
			reservaData?.orderItems?.service === undefined
				? ""
				: reservaData?.orderItems?.service
		)
		setValue("message", reservaData.message)
		setValue("priceOptionSelected", "regular")

		//
	}, [])

	useEffect(() => {
		const play = data.playlist[0] === "" ? [] : data.playlist
		setArrayPlayList(play)
		setreservaData(data)
	}, [])

	const dataReservaToCard = {
		dateAndTime: watch("dateAndTime") || "",
		client: {
			_id: watch("clientId"),
			name: watch("nameClient"),
			tel: watch("telClient"),
			email: watch("emailClient"),
		},
		shippingAddress: {
			address: watch("address") || "",
			city: watch("city") || "",
			cp: watch("cp") || "",
			region: watch("region") || "",
		},
		orderItems: {
			mariachi: {
				_id: watch("idMariachi") || "",
			},
			categorySet: watch("category_mariachi") || "",
			members: watch("members") || 0,
			price: watch("price") || 0,
			deposit: watch("deposit") || 0,
			fee: watch("fee") || 0,
			qty: watch("qty") || 1,
			service: watch("service") || "",
		},
		message: watch("message") || "",
		playlist: [],
		priceOptionSelected: watch("priceOptionSelected"),
	}

	useEffect(() => {
		//if (mariachiSelected._id !== dataReservaToCard.orderItems.mariachi._id)

		if (dataReservaToCard.orderItems.mariachi._id === undefined) {
			const marSeleected = dataMariachi.find(
				(dat) => dat._id === data.orderItems.mariachi._id
			)
			setMariachiSelected(marSeleected)
			setValue("members", marSeleected?.members)
			setValue("category_mariachi", marSeleected?.categorySet)
		} else {
			const marSeleected = dataMariachi.find(
				(dat) => dat._id === dataReservaToCard.orderItems.mariachi._id
			)
			setMariachiSelected(marSeleected)
			setValue("members", marSeleected?.members)
			setValue("category_mariachi", marSeleected?.categorySet)
		}

		//S}
	}, [dataReservaToCard.orderItems.mariachi._id])

	useEffect(() => {
		const items = dataReservaToCard.orderItems
		setreservaData({
			...reservaData,
			client: dataReservaToCard.client,
			message: dataReservaToCard.message,
			dateAndTime: dataReservaToCard.dateAndTime,
			shippingAddress: dataReservaToCard.shippingAddress,
			orderItems: {
				...items,
				mariachi: mariachiSelected,

				categorySet: dataReservaToCard?.orderItems?.categorySet || "",
				members: dataReservaToCard?.orderItems?.members || 0,
			},
		})
	}, [
		dataReservaToCard.client._id,
		dataReservaToCard.client.name,
		dataReservaToCard.client.tel,
		dataReservaToCard.client.email,
		dataReservaToCard.dateAndTime,

		dataReservaToCard.shippingAddress.address,
		dataReservaToCard.shippingAddress.city,
		dataReservaToCard.shippingAddress.region,
		dataReservaToCard.shippingAddress.cp,

		dataReservaToCard.orderItems.deposit,
		dataReservaToCard.orderItems.price,
		dataReservaToCard.orderItems.members,
		dataReservaToCard.orderItems.qty,
		dataReservaToCard.orderItems.service,
		dataReservaToCard.orderItems.categorySet,

		dataReservaToCard.message,
	])

	useEffect(() => {
		setreservaData({
			...reservaData,
			orderItems: {
				...reservaData.orderItems,
				mariachi: { ...mariachiSelected },

				categorySet: mariachiSelected?.categorySet || "",
				members: mariachiSelected?.members || 0,
			},
		})
		setValue("members", mariachiSelected?.members)
		setValue(
			"category_mariachi",
			mariachiSelected?.categorySet === undefined
				? "Normal"
				: mariachiSelected?.categorySet[0]
		)
	}, [mariachiSelected])

	// if (dataReservaToCard?.orderItems?.mariachi?.service) {
	// 	console.log(
	// 		"mariachi!!! ",
	// 		mariachiSelected,
	// 		mariachiSelected?.service,
	// 		dataReservaToCard?.orderItems?.service,
	// 		dataReservaToCard?.orderItems?.mariachi?.service[
	// 			dataReservaToCard?.orderItems?.service
	// 		]
	// 		//[dataReservaToCard?.orderItems?.service]
	// 	)
	// }

	useEffect(() => {
		if (mariachiSelected?.service) {
			setValue("qty", 1)
			setValue(
				"price",
				mariachiSelected.service[dataReservaToCard?.orderItems?.service][
					getValues("priceOptionSelected")
				]
			)
			setValue("deposit", 0)
		}
	}, [
		dataReservaToCard.orderItems.service,
		dataReservaToCard.priceOptionSelected,
	])

	useEffect(() => {
		setreservaData({
			...reservaData,

			playlist: arrayPlayList,
		})
		setValue("playlist", arrayPlayList)
	}, [arrayPlayList])

	// useEffect(() => {
	// 	setMariachiSelected({
	// 		...mariachiSelected,
	// 		categorySet: dataReservaToCard.orderItems.mariachi.categorySet,
	// 	})
	// }, [dataReservaToCard.orderItems.mariachi.categorySet])

	const onSubmit = (dataForm) => {
		console.log(dataForm)
		if (dataForm.clientId === "") {
			toast.error("¡Falta asignar cliente¡")
			return
		}
		if (dataForm.idMariachi === "") {
			toast.error("¡Falta asignar mariachi¡")
			return
		}
		if (dataForm.address === "") {
			toast.error("No se asigno dirección del evento.")
			return
		}
		if (dataForm.service === "") {
			toast.error("Falta elegir servicio.")
			return
		}
		if (dataForm.price < 500) {
			toast.error("El precio  debe ser mayor a 0.")
			return
		}
		if (dataForm.qty < 1) {
			toast.error("La cantidad debe ser mayor a 0.")
			return
		}

		setLoading(true)
		toastIdRe = toast.loading("Cargando...")

		const reservaAdd = {
			client: { _ref: dataForm.clientId, _type: "reference" },
			host: {
				name: dataForm.nameClient,
				tel: dataForm.telClient,
				email: dataForm.emailClient,
			},
			createdBy: { _ref: userAdmin._id, _type: "reference" },
			dateCreated: dateGral.toLocaleDateString("es-MX", optionsDate),

			dateAndTime: dataForm.dateAndTime,
			message: dataForm.message,
			orderItems: [
				{
					mariachi: {
						_ref: dataForm.idMariachi,
						_type: "reference",
					},
					categorySet: dataForm.category_mariachi,
					members: dataForm?.members * 1 || 0,
					service: dataForm?.service,
					price: (dataForm.price || 0) * 1,
					deposit: (dataForm.deposit || 0) * 1,
					qty: (dataForm.qty || 0) * 1,
					fee: (dataForm.fee || 0) * 1,
					priceOptionSelected: dataForm.priceOptionSelected,
					_key: nanoid(),
					_type: "orderItem",
				},
			],
			// paymentResult: {
			// 	_type: "paymentResult",
			// 	email_address: "xonitg@gmail.com",
			// },

			playlist: arrayPlayList,
			shippingAddress: {
				address: dataForm.address,
				city: dataForm.city,
				cp: dataForm.cp,
				region: dataForm.region,
			},
			status: ["Agendado"],
			userName: dataForm.nameClient,
			//_id: data._id,
		}

		const createMutations = [
			{
				createOrReplace: {
					...reservaAdd,
					_type: "booking",
					reserva: nanoid(),
				},
			},
		]

		Promise.all([createBooking(createMutations)])
			.then((addPromise) => {
				dispatch(
					addBookingToGoogleSheet({
						...reservaAdd,
						_id: addPromise[0].data.transactionId,
						sendEmail: false,
					})
				)
			})
			.catch((err) => console.log(err))
	}

	let toastIdRe
	const notifyError = () => toast.error(error, { id: toastIdRe })
	const notifySuccess = () =>
		toast.success("Reserva creada correctamente", { id: toastIdRe })

	useEffect(() => {
		console.log("status:", status, statusBookGS, statusBEmail)

		if (
			status === "failed" ||
			statusBookGS === "failed" ||
			statusBEmail === "failed" ||
			errorAdd
		) {
			toast.dismiss(toastIdRe)

			notifyError()
			dispatch(setStatusBooking("idle"))
			dispatch(setStatusBookingGS("idle"))
			dispatch(setStatusBookingEmail("idle"))
			setLoading(false)
		}
		if (
			//status === "succeeded" &&
			statusBookGS === "succeeded" &&
			statusBEmail === "succeeded" &&
			isSuccessAdd
		) {
			dispatch(setStatusBooking("idle"))
			dispatch(setStatusBookingGS("idle"))
			dispatch(setStatusBookingEmail("idle"))
			toast.dismiss(toastIdRe)
			notifySuccess()
			setLoading(false)

			router.push("/reservas")
		}
	}, [router, status, statusBookGS, isSuccessAdd, errorAdd, statusBEmail])

	if (!userAdmin.exist || router.isFallback) {
		return <SpinnerLogo />
	}

	return (
		<Layout>
			{userAdmin.isAdmin ? (
				<div className={`no-scrollbar overflow-auto w-full h-full  `}>
					<div
						className={`no-scrollbar overflow-auto   h-full md:h-full flex flex-col md:flex-row  md:justify-evenly
							 items-center`}
					>
						<div className={`m-auto px-5 md:mx-0 w-full md:w-2/5  `}>
							<BookingTa>
								<BookingForm
									methods={methods}
									//reserva={reservaData === undefined ? deserva : reservaData}
									onSubmit={onSubmit}
									arrayPlayList={arrayPlayList}
									setArrayPlayList={setArrayPlayList}
									setMariachibyId={setMariachibyId}
									setUserbyId={setUserbyId}
									isSaving
									loading={loading}
								/>

								<Toaster />
							</BookingTa>
						</div>
						<div
							className={
								"w-full h-fit m-auto md:w-4/12 md:h-5/6 mb-24 md:mb-10	 "
							}
						>
							<BookingCard reserva={reservaData} data={data} />
						</div>
					</div>
				</div>
			) : (
				<>
					<MariachiForbiden className="w-80 fill-slate-900 dark:fill-slate-50" />
					<p className="">
						Usted no esta autorizado para usar esta app (users).
					</p>
				</>
			)}
		</Layout>
	)
}

export default newBooking
