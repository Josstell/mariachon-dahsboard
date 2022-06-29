//import Image from "next/image"
import { ViewGridAddIcon } from "@heroicons/react/outline"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useSelector } from "react-redux"
import GetLogoWithName from "src/components/GetLogoWithName"
import { selectAllBookings } from "store/features/bookings/bookingSlice"

const TableBookings = () => {
	const BookingsData = useSelector(selectAllBookings)

	const options = {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
	}

	const getDateAndTime = (dateAndTime) => {
		const date = new Date(dateAndTime)
		return date.toLocaleDateString("es-MX", options)
	}

	return (
		<div className="px-2 md:px1 w-full h-full">
			<div
				className="relative  flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded sm:mt-0 sm:mb-auto
					 bg-white  dark:bg-slate-700 dark:text-white"
			>
				<div className="rounded-t mb-0 px-4 py-3 border-0">
					<div className="flex flex-wrap items-center">
						<div className="relative w-full px-4 max-w-full flex justify-between">
							<h3 className="font-semibold text-lg text-slate-700 dark:text-white">
								Reservas
							</h3>
							<Link href={`reservas/nuevo`} passHref>
								<ViewGridAddIcon className="w-5 cursor-pointer" />
							</Link>
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
									Coordinador
								</th>

								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Estado de reserva
								</th>
								{/* <th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Borrar
								</th> */}
								{/* <th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								></th> */}
							</tr>
						</thead>
						<tbody>
							{BookingsData?.map((booking) => (
								<tr key={booking._id}>
									<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left ">
										<Link href={`/reservas/${booking._id}/edit`} passHref>
											<span
												className=" font-bold 
													text-slate-600
													dark:text-white"
											>
												{booking?.reserva || booking?._id}
											</span>
										</Link>
									</th>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{booking?.client?.name}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{getDateAndTime(booking.dateAndTime)}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{booking?.shippingAddress.address},{" "}
										{booking?.shippingAddress.city},
										{booking?.shippingAddress.region}
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
												text={booking?.orderItems?.mariachi?.name}
												numberLetter={9}
											/>
										)}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{booking?.orderItems?.service} x {booking.orderItems.qty}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{booking?.orderItems?.price * booking.orderItems.qty}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{booking?.orderItems?.deposit}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{booking?.orderItems?.fee}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{booking?.orderItems?.mariachi?.coordinator?.name}
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{booking?.status[booking?.status.length - 1]}
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
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default TableBookings
