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
	addBookingToGoogleSheet,
	selectError,
	selectStatusBEmail,
	selectStatusBook,
	selectStatusBookGS,
	setStatusBooking,
	setStatusBookingEmail,
	setStatusBookingGS,
} from "store/features/bookings/bookingSlice"
//import { selectAllMariachis } from "store/features/mariachis/mariachiSlice"
import { selectUserAdmin } from "store/features/users/userSlice"

import toast, { Toaster } from "react-hot-toast"
import { dateGral, optionsDate } from "src/helpers/utils"
import {
	getBookingAPIById,
	getRunningOperationPromises,
	useAddUpdateNewBookingMutation,
	useGetBookingAPIByIdQuery,
} from "store/features/bookingsApi"
import { useGetMariachisQuery } from "store/features/mariachisAPI"

const reservaById = ({ id }) => {
	// const data = useSelector((state) =>
	// 	state.bookings.bookings.find((booking) => booking._id === id)
	// )

	const { data, isLoading } = useGetBookingAPIByIdQuery(id)

	const [updateBookingApi, { error: errorUp, isSuccess: isSuccessUp }] =
		useAddUpdateNewBookingMutation()

	const router = useRouter()
	const status = useSelector(selectStatusBook)
	const statusBookGS = useSelector(selectStatusBookGS)
	const statusBEmail = useSelector(selectStatusBEmail)

	const error = useSelector(selectError)

	const userAdmin = useSelector(selectUserAdmin)

	const {
		data: dataMariachi,
		isLoading: isLoadingMa,
		isFetching: isFetchingMa,
	} = useGetMariachisQuery(undefined, {
		refetchOnMountOrArgChange: true,
	})

	//const dataMariachi = useSelector(selectAllMariachis)

	const [reservaData, setreservaData] = useState(data?.result || {})

	const [mariachiSelected, setMariachiSelected] = useState({})

	const [arrayPlayList, setArrayPlayList] = useState([])

	const [userbyId, setUserbyId] = useState(reservaData?.client || "")
	const [mariachibyId, setMariachibyId] = useState(
		reservaData?.orderItems?.mariachi || ""
	)

	const [loading, setLoading] = useState(false)

	const dispatch = useDispatch()

	//use form
	const methods = useForm()

	const { setValue, watch, getValues } = methods

	// useEffect(() => {
	// 	if (data?.result === undefined) {
	// 		router.push("/reservas")
	// 	}
	// }, [])

	if (isLoading) {
		return <SpinnerLogo />
	}

	useEffect(() => {
		setValue("nameClient", data?.result?.host?.name || userbyId?.name)
		setValue("telClient", data?.result?.host?.tel || userbyId?.tel)
		setValue(
			"emailClient",
			data?.result?.host?.email === undefined
				? userbyId?.email
				: data?.result?.host?.email
		)
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
		setValue("statusReserva", reservaData.status[0])
		setValue("message", reservaData.message)
		setValue(
			"priceOptionSelected",
			reservaData.orderItems.priceOptionSelected || "regular"
		)

		//
	}, [])

	useEffect(() => {
		const play = data?.result?.playlist[0] === "" ? [] : data?.result.playlist
		setArrayPlayList(play)
		setreservaData(data?.result)
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
		priceOptionSelected: watch("priceOptionSelected"),
	}

	useEffect(() => {
		//if (mariachiSelected._id !== dataReservaToCard.orderItems.mariachi._id)

		if (dataReservaToCard.orderItems.mariachi._id === undefined) {
			const marSeleected = dataMariachi?.result
				? dataMariachi?.result.find(
						(dat) => dat._id === data?.result.orderItems.mariachi._id
				  )
				: []
			setMariachiSelected(marSeleected)
			setValue("members", marSeleected?.members)
			setValue("category_mariachi", marSeleected?.categorySet)
		} else {
			const marSeleected = dataMariachi?.result
				? dataMariachi?.result.find(
						(dat) => dat._id === dataReservaToCard.orderItems.mariachi._id
				  )
				: []
			setMariachiSelected(marSeleected)
			setValue("members", marSeleected?.members)
			setValue("category_mariachi", marSeleected?.categorySet)
		}

		//S}
	}, [dataReservaToCard.orderItems.mariachi._id])

	useEffect(() => {
		const items = dataReservaToCard.orderItems

		if (
			dataReservaToCard.orderItems.fee > 0 &&
			reservaData.status[0] === "Enviada"
		) {
			setValue("statusReserva", "Realizada")
		}
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
		dataReservaToCard.orderItems.fee,
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

		let statusReservation = []

		if (
			dataForm.statusReserva === "Agendado" ||
			dataForm.statusReserva === "Actualizada"
		) {
			statusReservation = ["Actualizada"]
		} else if (dataForm.statusReserva === "Enviada") {
			statusReservation = ["Enviada"]
		} else {
			statusReservation = [dataForm.statusReserva]
		}
		let evetDate = new Date(dataForm.dateAndTime)

		const reservaUpdate = {
			client: { _ref: dataForm.clientId, _type: "reference" },
			host: {
				name: dataForm.nameClient,
				tel: dataForm.telClient,
				email: dataForm.emailClient,
			},
			modifiedBy: { _ref: userAdmin._id, _type: "reference" },
			dateModified: dateGral.toLocaleDateString("es-MX", optionsDate),

			dateAndTime: evetDate.toISOString(),
			message: dataForm.message,
			orderItems: [
				{
					mariachi: {
						_ref: dataForm.idMariachi,
						_type: "reference",
					},
					categorySet: dataForm.category_mariachi,
					members: dataForm?.members * 1 || 0,
					service: dataForm.service,
					price: (dataForm.price || 0) * 1,
					deposit: (dataForm.deposit || 0) * 1,
					fee: (dataForm.fee || 0) * 1,
					priceOptionSelected: dataForm.priceOptionSelected,

					qty: (dataForm.qty || 0) * 1,
					_key: data?.result?.orderItems._key,
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
			status: statusReservation,
			userName: dataForm.nameClient,
			_id: data?.result._id,
		}

		const createMutations = [
			{
				patch: {
					id: reservaUpdate._id,
					set: reservaUpdate,
				},
			},
		]

		//dispatch(updateMariachi(dataMariachiToSend))

		Promise.all([updateBookingApi(createMutations)])
			.then((updatePromise) => {
				const dataToUpdate = updatePromise[0].data.results[0].document

				dispatch(addBookingToGoogleSheet({ ...dataToUpdate, sendEmail: true }))
			})
			.catch((err) => console.log(err))

		//dispatch(updateBooking({ ...reservaUpdate, sendEmail: true }))
		//	dispatch(updateBooking({ ...reservaUpdate, sendEmail: false }))
	}

	let toastIdRe
	const notifyError = () => toast.error(error, { id: toastIdRe })
	const notifySuccess = () =>
		toast.success("Reserva actualizada correctamente", { id: toastIdRe })

	useEffect(() => {
		if (
			status === "failed" ||
			statusBookGS === "failed" ||
			statusBEmail === "failed" ||
			errorUp
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
			isSuccessUp
		) {
			dispatch(setStatusBooking("idle"))
			dispatch(setStatusBookingGS("idle"))
			toast.dismiss(toastIdRe)
			notifySuccess()
			setLoading(false)

			router.push("/reservas")
		}
	}, [router, status, statusBookGS, isSuccessUp, errorUp, statusBEmail])

	if (!userAdmin.exist || router.isFallback || isLoadingMa || isFetchingMa) {
		return <SpinnerLogo />
	}

	return (
		<Layout>
			{userAdmin.isAdmin ? (
				<div className={`no-scrollbar overflow-auto w-full h-full  `}>
					<div
						className={`no-scrollbar overflow-auto   h-full  flex flex-col md:flex-row  md:justify-evenly
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
									loading={loading}
								/>
								<Toaster />
							</BookingTa>
						</div>
						<div
							className={
								"w-full h-full m-auto md:w-4/12 md:h-5/6	mb-24 md:mb-10 "
							}
						>
							<BookingCard reserva={reservaData} data={data?.result} />
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
	(store) => async (ctx) => {
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
		await store.dispatch(getBookingAPIById.initiate(ctx.params._id))

		await Promise.all(getRunningOperationPromises())

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
