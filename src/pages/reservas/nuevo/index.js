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
	addBooking,
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
import SpinnerLoadign from "src/components/Spinners/SpinnerLoading"
import { nanoid } from "@reduxjs/toolkit"
import { dateGral, optionsDate } from "src/helpers/utils"

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

	const dispatch = useDispatch()

	//use form
	const methods = useForm()

	const { setValue, watch } = methods

	useEffect(() => {
		setValue("nameClient", userbyId?.name || data?.client?.name)
		setValue("telClient", userbyId?.tel || data?.client?.tel)
		setValue("emailClient", userbyId?.email || data?.client?.email)
		setValue("clientId", userbyId?._id || data?.client?._id)
	}, [userbyId])

	useEffect(() => {
		setValue("idMariachi", mariachibyId?._id)
	}, [mariachibyId])

	console.log(
		"Id mariachi yclent:!!!",
		router.query.client,
		userbyId,
		router.query.mariachiId
	)

	useEffect(() => {
		setValue("idMariachi", router.query?.mariachiId || "")
		setValue("address", reservaData.shippingAddress.address)
		setValue("city", reservaData?.shippingAddress.city || "")
		setValue("cp", reservaData?.shippingAddress.cp || "")
		setValue("region", reservaData?.shippingAddress.region || "")
		setValue("dateAndTime", reservaData?.dateAndTime)
		setValue("members", reservaData.orderItems.members)
		setValue("category_mariachi", reservaData?.orderItems?.categorySet)
		setValue("fee", reservaData.orderItems.fee || 0)
		setValue("qty", reservaData.orderItems.qty || 0)
		setValue("price", reservaData.orderItems.price)
		setValue("deposit", reservaData.orderItems.deposit)
		setValue(
			"service",
			reservaData?.orderItems?.service === undefined
				? ""
				: reservaData?.orderItems?.service
		)
		setValue("message", reservaData.message)

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
			qty: watch("qty") || 0,
			service: watch("service") || "",
		},
		message: watch("message") || "",
		playlist: [],
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
		if (mariachiSelected?.service?.hora) {
			setValue("qty", 1)
			setValue(
				"price",
				mariachiSelected.service[dataReservaToCard?.orderItems?.service]
			)
			setValue("deposit", 0)
		}
	}, [dataReservaToCard.orderItems.service])

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
		const reservaAdd = {
			client: { _ref: dataForm.clientId, _type: "reference" },
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
					members: dataForm.members,
					service: dataForm.service,
					price: (dataForm.price || 0) * 1,
					deposit: (dataForm.deposit || 0) * 1,
					qty: (dataForm.qty || 0) * 1,
					fee: (dataForm.fee || 0) * 1,
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

		dispatch(addBooking(reservaAdd))
	}

	const notifyError = () => toast.error(error)
	const notifySuccess = () => toast.success("Datos actualizados correctamente")

	useEffect(() => {
		if (status === "failed") {
			notifyError()
			dispatch(setStatusBooking("idle"))
		}
		if (
			status === "succeeded" &&
			statusBookGS === "succeeded" &&
			statusBEmail === "succeeded"
		) {
			notifySuccess()
			dispatch(setStatusBooking("idle"))
			dispatch(setStatusBookingGS("idle"))
			dispatch(setStatusBookingEmail("idle"))

			router.push("/reservas")
		}
	}, [router, status, statusBookGS, statusBEmail])

	if (!userAdmin.exist || router.isFallback) {
		return <SpinnerLogo />
	}

	console.log("data real del mariachi", mariachiSelected)
	console.log("Hola", reservaData)

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
								{!(status === "idle") ||
								!(statusBookGS === "idle") ||
								!(statusBEmail === "idle") ? (
									<SpinnerLoadign />
								) : (
									<BookingForm
										methods={methods}
										//reserva={reservaData === undefined ? deserva : reservaData}
										onSubmit={onSubmit}
										arrayPlayList={arrayPlayList}
										setArrayPlayList={setArrayPlayList}
										setMariachibyId={setMariachibyId}
										setUserbyId={setUserbyId}
										isSaving
									/>
								)}

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
