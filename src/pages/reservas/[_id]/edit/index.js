/* eslint-disable no-mixed-spaces-and-tabs */
import { getSession } from "next-auth/react"
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
import { wrapper } from "store"
import {
	selectError,
	selectStatusBook,
	setStatusBooking,
	updateBooking,
} from "store/features/bookings/bookingSlice"
import { selectAllMariachis } from "store/features/mariachis/mariachiSlice"
import { fetchUsersNew, selectUserAdmin } from "store/features/users/userSlice"

import toast, { Toaster } from "react-hot-toast"
import SpinnerLoadign from "src/components/Spinners/SpinnerLoading"

const deserva = {
	dateAndTime: "2022-05-28T18:00:00.000Z",
	message: "Llegar puntuales",
	userName: "Jorge",

	client: {
		_id: "579d5856-7018-40d0-aa5d-980b35b06f2e",
		email: "xonitg@gmail.com",
		name: "Jorge Guzm",
		tel: "2225110199",
	},
	orderItems: [
		{
			deposit: 500,
			mariachi: {
				_ref: "8f54aff9-d78b-4e0a-a43e-ba58442aa458",
				_type: "reference",
			},
			price: 2500,
			qty: 1,
			service: ["hora"],
			_key: "cd9553552f06",
		},
	],

	paymentResult: {
		email_address: "xonitg@gmail.com",
		payment: ["cash"],
	},
	playlist: [
		"Las mañanitas",
		"Llamarada",
		"Si tu te atreves",
		"El rey",
		"Motivos",
		"19 noches y 500 dias",
		"Gustito",
	],

	shippingAddress: {
		address: "7 sur 307",
		city: "Tianguismanalco",
		region: "Puebla",
	},
	status: ["PE"],
	_id: "082d1427-b8fb-4be2-9ade-b7fd8cc1dc98",
}

const reservaById = ({ session, id }) => {
	const data = useSelector((state) =>
		state.bookings.bookings.find((booking) => booking._id === id)
	)

	const router = useRouter()
	const status = useSelector(selectStatusBook)
	const error = useSelector(selectError)

	const userAdmin = useSelector(selectUserAdmin)

	const dataMariachi = useSelector(selectAllMariachis)

	const [reservaData, setreservaData] = useState(
		data === undefined ? deserva : data
	)

	const [mariachiSelected, setMariachiSelected] = useState({})

	const [arrayPlayList, setArrayPlayList] = useState([])

	const [userbyId, setUserbyId] = useState(reservaData.client)
	const [mariachibyId, setMariachibyId] = useState(
		reservaData.orderItems.mariachi
	)

	const dispatch = useDispatch()

	//use form
	const methods = useForm()

	const { setValue, watch } = methods

	useEffect(() => {
		if (data === undefined) {
			router.push("/reservas")
		}
	}, [])

	if (data === undefined) {
		return <SpinnerLogo />
	}

	useEffect(() => {
		setValue("nameClient", userbyId?.name || data?.client?.name)
		setValue("telClient", userbyId?.tel || data?.client?.tel)
		setValue("emailClient", userbyId?.email || data?.client?.email)
	}, [userbyId])

	useEffect(() => {
		setValue("idMariachi", mariachibyId._id)
	}, [mariachibyId])

	useEffect(() => {
		setValue("idMariachi", reservaData.orderItems.mariachi._id)
		setValue("clientId", reservaData.client._id)
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
			_id: watch("clientId") || reservaData.client?._id,
			name: watch("nameClient") || reservaData.client?.name,
			tel: watch("telClient") || reservaData.client?.tel,
			email: watch("emailClient") || reservaData.client?.email,
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
		const reservaUpdate = {
			client: { _ref: dataForm.clientId, _type: "reference" },
			modifiedBy: { _ref: userAdmin._id, _type: "reference" },

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
					fee: (dataForm.fee || 0) * 1,

					qty: (dataForm.qty || 0) * 1,
					_key: data.orderItems._key,
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
			//	status: ["PE"],
			userName: dataForm.nameClient,
			_id: data._id,
		}

		dispatch(updateBooking(reservaUpdate))
	}

	const notifyError = () => toast.error(error)
	const notifySuccess = () => toast.success("Datos actualizados correctamente")

	useEffect(() => {
		if (status === "failed") {
			notifyError()
			dispatch(setStatusBooking("idle"))
		}
		if (status === "succeeded") {
			notifySuccess()
			dispatch(setStatusBooking("idle"))
			router.push("/reservas")
		}
	}, [router, status])

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
						<div className={"w-4/12 h-3/5 "}>
							<BookingTa>
								<BookingForm
									methods={methods}
									//reserva={reservaData === undefined ? deserva : reservaData}
									onSubmit={onSubmit}
									arrayPlayList={arrayPlayList}
									setArrayPlayList={setArrayPlayList}
									setMariachibyId={setMariachibyId}
									setUserbyId={setUserbyId}
								/>
								<Toaster />
							</BookingTa>
							{status !== "idle" && <SpinnerLoadign />}
						</div>
						<div className={"w-full h-full md:w-4/12 md:h-5/6	 "}>
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

// export async function getStaticPaths() {
// 	const query = groq`
// *[_type == "booking" && !(_id in path('drafts.**')) ]{
//     _id
// }

// `
// 	const booking = await client.fetch(query)

// 	const paths = booking.map((path) => ({
// 		params: { _id: path._id.toString() },
// 	}))

// 	console.log("links: ", paths)

// 	return { paths: paths, fallback: true }
// }

export const getServerSideProps = wrapper.getServerSideProps(
	() => async (ctx) => {
		// 		const query = groq`*[_type == "booking" && _id == $id][0]{
		//  _id,
		// client->{
		//   _id,
		//   name,
		//   tel,
		//   email,
		// },
		// dateAndTime,
		//   message,
		//   playlist,
		//   price,
		//   qty,
		//   userName,
		//   status,
		//   shippingAddress,
		//   paymentResult,

		//   orderItems[0]{
		//     _key,
		//     deposit,
		//     price,
		//     qty,
		//     service,
		// 	  members,
		// categorySet,
		//     mariachi->{
		// 		_id,
		//     name,
		// tel,
		// coordinator->{
		//   _id,
		//   name,
		//   tel
		// },
		// members,
		// service,
		// categorySet,
		// region,
		// logo,
		// createdBy,
		// modifiedBy,
		//   }

		//   }
		//     }
		// 	`

		const session = await getSession(ctx)

		// const booking = await client.fetch(query, {
		// 	id: ctx.params._id,
		// })

		// console.log(booking)
		// const data = users.filter((est) => est._id.toString() === ctx.params.slug)

		// const data = await store
		// 	.dispatch(selectAllUsers())
		// 	.filter((est) => est.slug.toString() === params.slug)

		return {
			props: {
				id: ctx.params._id,
				session: session,
			},

			//	props: { data: data[0] }, // will be passed to the page component as props
		}
	}
)

export default reservaById
