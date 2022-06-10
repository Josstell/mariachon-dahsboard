//import Image from "next/image"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useSelector } from "react-redux"
import GetLogoWithName from "src/components/GetLogoWithName"
import useTruncatedIdOrTel from "src/hook/useTruncatedId"
import { selectAllBookings } from "store/features/bookings/bookingSlice"

const TableBookings = () => {
	const BookingsData = useSelector(selectAllBookings)
	return (
		<div className="px-2 md:px1 w-full h-full">
			<div
				className="relative  flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded sm:mt-0 sm:mb-auto
					 bg-white  dark:bg-slate-700 dark:text-white"
			>
				<div className="rounded-t mb-0 px-4 py-3 border-0">
					<div className="flex flex-wrap items-center">
						<div className="relative w-full px-4 max-w-full flex-grow flex-1">
							<h3 className="font-semibold text-lg text-slate-700 dark:text-white">
								Reservas
							</h3>
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
									Mariachi
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Servicio y precio
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
									Lugar
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
												{useTruncatedIdOrTel(booking?._id)}
											</span>
										</Link>
									</th>
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
											<GetLogoWithName
												text={booking?.orderItems?.mariachi?.name}
												numberLetter={9}
											/>
										) : null}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{booking?.orderItems?.service} en{" "}
										{booking?.orderItems?.price}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{booking?.orderItems?.mariachi?.coordinator?.name}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{booking?.shippingAddress.city}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{booking?.status}
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
