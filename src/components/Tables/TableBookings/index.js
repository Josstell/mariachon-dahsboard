//import Image from "next/image"
import { ViewGridAddIcon } from "@heroicons/react/outline"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { SelectSimple } from "src/components/Forms/Smart/Inputs"
import GetLogoWithName from "src/components/GetLogoWithName"
import SpinnerLogo from "src/components/Spinners/SpinnerLogo"
import LupaSearchIcon from "src/components/SVG/Icons/LupaSearchIcon"
import {
	createUrlWhatsApp,
	dateGral,
	optionsDate,
	timeConverterToCommonPeople,
} from "src/helpers/utils"
import {
	addBookingToGoogleSheet,
	selectAllBookings,
	selectBookingsSearch,
	selectError,
	selectStatusBook,
	selectStatusBookGS,
	setNewBooking,
	setNewBookingSearch,
	setStatusBooking,
	setStatusBookingGS,
	setUpdateBooking,
	setUpdateBookingSearch,
	updateBooking,
} from "store/features/bookings/bookingSlice"
import { selectAllUsers } from "store/features/users/userSlice"

import { regions } from "src/helpers/dataset"
import SearchWithModalMariachis from "src/components/Forms/Smart/SearchWithModal/SearchWithModalMariachis"
import WhatsAppIcon from "src/components/SVG/Icons/WhatsAppIcon"
import TotalSum from "src/components/SVG/Icons/TotalSum"
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/router"
import { subscriptionBooking } from "@lib/sanity"
import { selectAllMariachis } from "store/features/mariachis/mariachiSlice"
import {
	useAddUpdateNewBookingMutation,
	useGetBookingsQuery,
} from "store/features/bookingsApi"
import SpinnerCircular from "src/components/Spinners/SpinnerCircular"

const TableBookings = ({ userAdmin }) => {
	const dispatch = useDispatch()

	const {
		data: BookingData,
		isLoading,
		isFetching,
	} = useGetBookingsQuery(undefined, {
		refetchOnMountOrArgChange: true,
		refetchOnFocus: true,
		refetchOnReconnect: true,
	})

	const [updateBookingApi, { error: errorUp, isSuccess: isSuccessUp }] =
		useAddUpdateNewBookingMutation()

	//const BookingData = useSelector(selectAllBookings)
	//const mariachiData = useSelector(selectAllMariachis)
	//const usersData = useSelector(selectAllUsers)

	const BookingsSearch = useSelector(selectBookingsSearch)

	/*********************************************************************/

	//const params = { ownerId: session._id }

	// const subscriptionBookingLocal = subscriptionBooking.subscribe((update) => {
	// 	const reservaListen = update.result

	// 	const isBookingAlready = BookingData.find(
	// 		(booking) => booking._id === reservaListen._id
	// 	)

	// 	const isBookingAlreadySearch = BookingsSearch.find(
	// 		(booking) => booking._id === reservaListen._id
	// 	)

	// 	const clientAdded = usersData.find(
	// 		(user) => user._id === reservaListen.client._ref
	// 	)
	// 	const mariachiUpdated = mariachiData.find(
	// 		(mar) => mar._id === reservaListen.orderItems[0].mariachi._ref
	// 	)
	// 	const items = reservaListen.orderItems[0]

	// 	const dataReserva = {
	// 		...reservaListen,
	// 		client: clientAdded,
	// 		reserva: reservaListen.reserva,
	// 		orderItems: {
	// 			...items,
	// 			mariachi: mariachiUpdated,
	// 		},
	// 	}

	// 	if (dataReserva.orderItems.mariachi && isBookingAlready) {
	// 		dispatch(setUpdateBooking(dataReserva))
	// 	} else if (dataReserva.orderItems.mariachi && !isBookingAlready) {
	// 		dispatch(setNewBooking(dataReserva))
	// 	}

	// 	if (dataReserva.orderItems.mariachi && isBookingAlreadySearch) {
	// 		dispatch(setUpdateBookingSearch(dataReserva))
	// 	} else if (dataReserva.orderItems.mariachi && !isBookingAlreadySearch) {
	// 		dispatch(setNewBookingSearch(dataReserva))
	// 	}
	// })

	/*********************************************************************/

	const router = useRouter()

	const regionData = regions.response.estado

	const statusBookGS = useSelector(selectStatusBookGS)
	const status = useSelector(selectStatusBook)

	const error = useSelector(selectError)

	const [bookingsDataSearch, setBookingsDataSearch] = useState(
		BookingData.result || []
	)

	// useEffect(() => {
	// 	setBookingsDataSearch(BookingsSearch)
	// }, [BookingData, subscriptionBookingLocal])

	let toastIdUpWhats
	const notifyError = () => toast.error(error, { id: toastIdUpWhats })
	const notifySuccess = () =>
		toast.success("Reserva actualizada correctamente", { id: toastIdUpWhats })

	useEffect(() => {
		if (status === "failed" || statusBookGS === "failed" || errorUp) {
			toast.dismiss(toastIdUpWhats)

			notifyError()
			dispatch(setStatusBooking("idle"))
			dispatch(setStatusBookingGS("idle"))
		}

		if (
			//status === "succeeded" &&
			statusBookGS === "succeeded" &&
			isSuccessUp
		) {
			dispatch(setStatusBooking("idle"))
			dispatch(setStatusBookingGS("idle"))
			toast.dismiss(toastIdUpWhats)
			notifySuccess()

			router.push("/reservas")
		}
	}, [status, statusBookGS, isSuccessUp, errorUp])

	const BookingsData = useSelector(selectAllBookings)

	const users = useSelector(selectAllUsers)

	const [regionSelected, setRegionSelected] = useState("All")

	const options = {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
	}

	const handleGetRegion = (e) => {
		setRegionSelected(e.target.value)
	}

	const getDateAndTime = (dateAndTime) => {
		const date = new Date(dateAndTime)
		return (
			date.toLocaleDateString("es-MX", options) +
			", " +
			timeConverterToCommonPeople(date)
		)
	}

	const handleWhatsApp = (reservationData, sendMariachiValue) => {
		if (sendMariachiValue === 0) {
			return
		}
		toastIdUpWhats = toast.loading("Cargando...")

		const coorSelected = users.find((user) => user._id === sendMariachiValue)

		createUrlWhatsApp({ ...reservationData, coordinator: coorSelected })

		const reservaUpdate = {
			...reservationData,
			client: { _ref: reservationData?.client._id, _type: "reference" },
			modifiedBy: { _ref: userAdmin._id, _type: "reference" },
			dateModified: dateGral.toLocaleDateString("es-MX", optionsDate),
			sendTo: {
				_ref: sendMariachiValue,
				_type: "reference",
			},
			orderItems: [
				{
					mariachi: {
						_ref: reservationData?.orderItems?.mariachi?._id,
						_type: "reference",
					},
					categorySet: reservationData?.orderItems?.categorySet,
					priceOptionSelected: reservationData?.orderItems?.priceOptionSelected,
					members: reservationData?.orderItems?.members,
					service: reservationData?.orderItems?.service,
					price: (reservationData?.orderItems?.price || 0) * 1,
					deposit: (reservationData?.orderItems?.deposit || 0) * 1,
					fee: (reservationData?.orderItems?.fee || 0) * 1,

					qty: (reservationData?.orderItems?.qty || 0) * 1,
					_key: reservationData?.orderItems._key,
					_type: "orderItem",
				},
			],
			status: ["Enviada"],
		}

		//dispatch(updateBooking({ ...reservaUpdate, sendEmail: false }))

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
				dispatch(addBookingToGoogleSheet({ ...dataToUpdate, sendEmail: false }))
			})
			.catch((err) => console.log(err))
	}
	const [hideIconShowSearch, setHideIconShowSearch] = useState(false)

	const handleReservaUrl = (id) => {
		//	subscriptionBookingLocal.unsubscribe()
		router.push(`/reservas/${id.toString()}/edit`)
	}

	const handleNewReserva = () => {
		//	subscriptionBookingLocal.unsubscribe()
		router.push(`/reservas/nuevo`)
	}

	if (isLoading) {
		return <SpinnerLogo />
	}

	return (
		<div className="px-2 md:px1 w-full h-full">
			<div
				className="relative  flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded sm:mt-0 sm:mb-auto
					 bg-white  dark:bg-slate-700 dark:text-white"
			>
				<div className={!hideIconShowSearch && "hidden"}>
					<SearchWithModalMariachis
						dataOriginal={BookingData?.result || []}
						mariachiDataSearch={bookingsDataSearch}
						setMariachisDataSearch={setBookingsDataSearch}
						setHideIconShowSearch={setHideIconShowSearch}
						hideIconShowSearch={hideIconShowSearch}
						//setPorServicio={setPorServicio}
						regionSelected={regionSelected}
						typeData="booking"
					/>
				</div>
				<div className="rounded-t mb-0 px-4 py-3 border-0">
					<div className="flex flex-wrap items-center">
						<div className="relative w-full px-4 max-w-full flex justify-between divide-x-2 md:divide-x-0 pr-2">
							<h3 className="font-semibold text-xs md:text-lg text-slate-700 dark:text-white  flex flex-col justify-center items-center">
								<span>Reserva</span>
								{isFetching ? (
									<SpinnerCircular />
								) : (
									<div className="flex justify-center items-center">
										<TotalSum className="fill-slate-900 dark:fill-slate-100 w-5 h-5 mt-1" />
										<span className="text-sm ">
											{bookingsDataSearch.length}
										</span>
									</div>
								)}
							</h3>

							<div className="flex flex-row justify-between items-center pl-2 ">
								<div className="mr-2">
									<SelectSimple
										name="regions"
										options={regionData}
										handleGral={handleGetRegion}
										hidden
										tableSize={true}
									/>
								</div>{" "}
								<LupaSearchIcon
									className={`fill-slate-300 w-5 mr-2 z-100 cursor-default ${
										hideIconShowSearch ? "hidden" : null
									}`}
									onClick={() => setHideIconShowSearch(true)}
								/>
								<div onClick={handleNewReserva}>
									<ViewGridAddIcon className="w-5 cursor-pointer" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="block w-full overflow-x-auto">
					{/* Projects table */}
					<table className="items-center w-full bg-transparent border-collapse">
						<thead>
							<tr>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left  
										bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									# Reserva
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Cliente
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Anfitrion
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Fecha y hora
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Lugar del Evento
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Región
								</th>

								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Mariachi
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Servicio
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Precio
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Deposito
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Comisión
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Tipo de Precio
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Estado de reserva
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Enviado a:
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500 "
								>
									<WhatsAppIcon className="fill-slate-900 dark:fill-slate-100 w-10 h-10 mx-16  " />
								</th>
							</tr>
						</thead>
						<tbody>
							{bookingsDataSearch?.map((booking) => {
								const crewUserById = users.filter((user) =>
									booking?.orderItems?.mariachi?.crew.find(
										(cre) => cre._ref === user._id
									)
								)
								crewUserById.unshift({
									name: "Mandar a: ",
									_id: 0,
								})

								return (
									<tr
										key={booking?._id}
										className="transition duration-300 ease-in-out hover:bg-slate-600/95"
									>
										<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left ">
											<span
												className=" font-bold 
													text-slate-600
													dark:text-white cursor-pointer"
												onClick={() => handleReservaUrl(booking._id)}
											>
												{booking?.reserva || booking?._id}
											</span>
										</th>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											{booking?.client?.name}
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											{booking?.host?.name}
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											{getDateAndTime(booking?.dateAndTime)}
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											{booking?.shippingAddress?.address},{" "}
											{booking?.shippingAddress?.city}
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											{booking?.shippingAddress?.region}
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											{booking?.orderItems?.mariachi?.logo ? (
												<div className="w-8 h-8 flex flex-col  relative cursor-pointer">
													<Image
														className="rounded-full"
														src={booking?.logo}
														layout="fill"
														objectFit="cover"
														alt=""
													/>
												</div>
											) : booking?.orderItems?.mariachi?.name ? (
												<div className="uppercase">
													{booking?.orderItems?.mariachi?.name}{" "}
												</div>
											) : (
												<GetLogoWithName
													text={booking?.orderItems?.mariachi?.name || "m"}
													numberLetter={9}
												/>
											)}
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											{booking?.orderItems?.service} x{" "}
											{booking?.orderItems?.qty}
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											{booking?.orderItems?.price * booking?.orderItems?.qty}
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											{booking?.orderItems?.deposit}
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											{booking?.orderItems?.fee}
										</td>
										<td
											className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 `}
										>
											<span
												className={`font-bold ${
													booking?.orderItems?.priceOptionSelected === "minimo"
														? "text-red-600"
														: booking?.orderItems?.priceOptionSelected ===
														  "regular"
														? "text-yellow-500"
														: "text-green-500"
												}`}
											>
												{booking?.orderItems?.priceOptionSelected?.toUpperCase()}
											</span>
										</td>

										<td
											className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 `}
										>
											<span
												className={`text-red-500 font-bold ${
													booking?.status[booking?.status.length - 1] ===
													"Agendado"
														? "text-blue-300"
														: booking?.status[booking?.status.length - 1] ===
														  "Actualizada"
														? "text-blue-500"
														: booking?.status[booking?.status.length - 1] ===
														  "Enviada"
														? "text-yellow-500"
														: booking?.status[booking?.status.length - 1] ===
														  "Realizada"
														? "text-green-400"
														: "text-red-500"
												}`}
											>
												{booking?.status[
													booking?.status?.length - 1
												].toUpperCase()}
											</span>
										</td>
										{/* <td
											className={`border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 `}
										>
											Terminar/ cancelar
										</td> */}
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
											{booking?.sendTo?.name ? (
												<span className="text-green-500 font-extrabold uppercase">
													{booking?.sendTo?.name}
												</span>
											) : (
												<span className="text-red-500 font-bold uppercase ">
													!No enviada!
												</span>
											)}
										</td>
										<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 cursor-pointer">
											{/* <a onClick={() => handleWhatsApp(booking)}>
												{booking?.orderItems?.mariachi?.coordinator?.name}{" "}
											</a> */}
											<SelectSimple
												name="sendWhats"
												options={crewUserById || []}
												hidden
												booking={booking}
												handleWhatsApp={handleWhatsApp}
											/>
										</td>

										{/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										<div className="flex items-center">
											<span className="mr-2">60%</span>
											<div className="relative w-full">
												<div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
													<div
														style={{ width: "60%" }}
														className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
													></div>
												</div>
											</div>
										</div>
									</td> 
									 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
										{/* <className />
									</td> 
									*/}
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>
			<Toaster />
		</div>
	)
}

export default TableBookings
