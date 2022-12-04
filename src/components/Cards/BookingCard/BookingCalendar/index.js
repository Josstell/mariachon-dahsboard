import React, { useEffect, useState } from "react"
import WhatsAppIcon from "src/components/SVG/Icons/WhatsAppIcon"
import {
	createUrlWhatsApp,
	dateGral,
	formatoMoneda,
	optionsDate,
	optionsDateShort,
} from "src/helpers/utils"
import { PencilIcon } from "@heroicons/react/outline"
import ClientIcon from "src/components/SVG/Icons/ClientIcon"
import AddressEventIcon from "src/components/SVG/Icons/AddressEventIcon"
import { SelectSimple } from "src/components/Forms/Smart/Inputs"
import { useAddUpdateNewBookingMutation } from "store/features/bookingsApi"
import { useGetUsersQuery } from "store/features/usersApi"
import toast from "react-hot-toast"
import {
	addBookingToGoogleSheet,
	selectStatusBook,
	selectStatusBookGS,
	setStatusBooking,
	setStatusBookingGS,
} from "store/features/bookings/bookingSlice"
import { useDispatch, useSelector } from "react-redux"
import { selectError, selectUserAdmin } from "store/features/users/userSlice"
import Link from "next/link"
import { TicketIcon } from "@heroicons/react/solid"

const BookingCalendar = ({ reserva }) => {
	const userAdmin = useSelector(selectUserAdmin)

	const date = new Date(reserva.dateAndTime)
	const fecha = date.toLocaleDateString("es-MX", optionsDateShort)

	const { data: usersApi } = useGetUsersQuery(undefined, {
		refetchOnMountOrArgChange: true,
		refetchOnReconnect: true,
	})

	const [updateBookingApi, { error: errorUp, isSuccess: isSuccessUp }] =
		useAddUpdateNewBookingMutation()

	const dispatch = useDispatch()

	const statusBookGS = useSelector(selectStatusBookGS)
	const status = useSelector(selectStatusBook)

	const error = useSelector(selectError)
	const [crewUserById, setCrewUserById] = useState([])

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
		}
	}, [status, statusBookGS, isSuccessUp, errorUp])

	useEffect(() => {
		const crewUser = usersApi?.result
			? usersApi?.result.filter((user) =>
					reserva?.orderItems?.mariachi?.crew.find(
						(cre) => cre._ref === user._id
					)
			  )
			: []
		crewUser.unshift({
			name: "Mandar a: ",
			_id: 0,
		})
		setCrewUserById(crewUser)
	}, [usersApi])

	const handleWhatsApp = (reservationData, sendMariachiValue) => {
		if (sendMariachiValue === 0) {
			return
		}
		toastIdUpWhats = toast.loading("Cargando...")

		const coorSelected = usersApi?.result
			? usersApi?.result.find((user) => user._id === sendMariachiValue)
			: []

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

	return (
		<section>
			<section className="text-gray-600 body-font ">
				<div className="container px-5 py-24 mx-auto">
					<div className="p-5 bg-white  flex items-center mx-auto border-b  mb-10 border-gray-200 rounded-lg sm:flex-row flex-col">
						<div className="sm:w-40 sm:h-32 h-20 w-10/12 sm:mr-10 inline-flex items-center justify-center flex-shrink-0">
							<div className="w-full flex flex-col justify-around items-center py-16  font-bold leading-none text-gray-800 uppercase bg-gray-400">
								<div className="text-lg m-0 p-0">
									{fecha.split(" ", 4)[3]}, {fecha.split(",", 1)[0]}
								</div>
								<div className="text-8xl font-bold">
									{fecha.split(" ", 2)[1]}
								</div>
								<div className="text-lg">{date.toLocaleTimeString()}</div>
							</div>
						</div>
						<div className="flex-grow sm:text-left text-center mt-28 sm:mt-0">
							<h1 className="text-black text-2xl title-font font-bold ">
								{reserva?.orderItems?.mariachi?.name}
							</h1>
							<p className="leading-relaxed text-base"></p>
							<div className="py-4">
								<div className=" inline-block mr-2">
									<div className="flex  pr-2 h-full items-center">
										<ClientIcon className="fill-slate-900 dark:fill-gray-800 w-10 h-10 px-2" />
										<div>
											<p className="text-sm title-font font-medium">
												{reserva?.client?.name}
											</p>
											<p className="text-sm title-font font-medium">
												{reserva?.client?.tel}
											</p>
										</div>
									</div>
								</div>

								<div className=" inline-block mr-2">
									<div className="flex  pr-2 h-full items-center">
										<AddressEventIcon className="fill-slate-50 dark:fill-gray-700 w-10 h-10 px-2 " />
										<div>
											<p className="text-xs title-font font-medium">
												{reserva?.shippingAddress?.address}
											</p>
											<p className="text-xs title-font font-medium">
												{reserva?.shippingAddress?.city}
											</p>
											<p className="text-xs title-font font-medium">
												{" "}
												{reserva?.shippingAddress?.region}
											</p>
											<p className="text-xs title-font font-medium">
												{" "}
												{reserva?.shippingAddress?.cp}
											</p>
										</div>
									</div>
								</div>

								{/* <div className=" inline-block mr-2">
									<div className="flex  pr-2 h-full items-center">
										<svg
											className="text-gray-500 w-6 h-6 mr-1"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<circle cx="12" cy="12" r="10" />
											<line x1="15" y1="9" x2="9" y2="15" />
											<line x1="9" y1="9" x2="15" y2="15" />
										</svg>
										<p className="title-font font-medium">Javascript</p>
									</div>
								</div> */}
							</div>
							<div className="md:flex font-bold text-gray-800">
								<div className="w-full md:w-1/2 flex space-x-3">
									<div className="w-1/2">
										<h2 className="text-gray-500 text-sm">Servicio</h2>
										<p className="text-sm">
											{reserva?.orderItems?.service} x{" "}
											{reserva?.orderItems?.qty}
										</p>
									</div>
									<div className="w-1/2">
										<h2 className="text-gray-500 text-sm">Deposito</h2>
										<p className="text-sm">
											{formatoMoneda(reserva?.orderItems?.deposit)}
										</p>
									</div>
								</div>
								<div className="w-full md:w-1/2 flex space-x-3">
									<div className="w-1/2">
										<h2 className="text-gray-500 text-sm"> Total</h2>
										<p className="text-sm">
											{formatoMoneda(
												reserva?.orderItems?.price * reserva?.orderItems?.qty
											)}
										</p>
									</div>
									<div className="w-1/2">
										<h2 className="text-gray-500 text-sm">Comisión</h2>
										<p className="text-sm">
											{formatoMoneda(reserva?.orderItems?.fee)}
										</p>
									</div>
								</div>
							</div>
							<div className="flex mt-3 text-indigo-500 text-sm flex-col sm:flex-row justify-between items-center text-right">
								<div className="flex">
									<TicketIcon className="fill-slate-50 dark:fill-gray-700 w-5 m-0" />
									<p className="ml-2">{reserva?.reserva}</p>
								</div>
								<div className="flex flex-row">
									<Link href={`/reservas/${reserva._id}/edit`} passHref>
										<PencilIcon className="fill-slate-50 dark:fill-gray-700 w-5 h-5   cursor-pointer" />
									</Link>
									<WhatsAppIcon className="fill-slate-50 dark:fill-gray-700 w-7 h-7   " />
									<div className="w-28">
										<SelectSimple
											name="sendWhats"
											options={crewUserById}
											hidden
											booking={reserva}
											handleWhatsApp={handleWhatsApp}
										/>
									</div>
								</div>
							</div>
							{reserva?.sendTo?.name ? (
								<p className="text-xs">
									Enviado a{" "}
									<span className="text-sm font-semibold">
										{reserva.sendTo.name}
									</span>
								</p>
							) : (
								<p className="text-xs text-red-500">No enviada</p>
							)}
						</div>
					</div>
				</div>
			</section>
		</section>
	)
}

export default BookingCalendar
