import { TicketIcon } from "@heroicons/react/outline"
import React from "react"
import AddressEventIcon from "src/components/SVG/Icons/AddressEventIcon"
import ClientIcon from "src/components/SVG/Icons/ClientIcon"

import LogoMariachon from "src/components/SVG/Icons/LogoMariachon"
import MessageIcon from "src/components/SVG/Icons/MessageIcon"
import PlaylistIcon from "src/components/SVG/Icons/PlaylistIcon"

export default function BookingCard({ reserva }) {
	//const users = useSelector(selectAllUsers)

	const options = {
		weekday: "short",
		year: "numeric",
		month: "long",
		day: "numeric",
	}

	const date = new Date(reserva.dateAndTime)
	const fecha = date.toLocaleDateString("es-MX", options)

	console.log("bookingCard: ", reserva)

	return (
		<div className="mx-auto max-w-[400px] min-w-[350px] min-h-[650px]	 h-screen flex flex-col justify-around bg-slate-200 dark:bg-slate-800 shadow-[0_35px_100px_rgba(0,0,0,0.25)] dark:shadow-[0_35px_100px_rgba(00,00,00,0.1)]">
			<div className="flex  px-2 my-2 ">
				<TicketIcon className="fill-slate-900 dark:fill-slate-100 w-5 h-5 " />
				<p className="ml-2">{reserva._id}</p>
			</div>
			<div className="flex item-center justify-evenly h-1/4	">
				<div className="flex flex-col justify-around items-center p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 w-1/2">
					<div className="text-2xl m-0 p-0">
						{fecha.split(" ", 4)[3]}, {fecha.split(",", 1)[0]}
					</div>
					<div className="text-8xl font-bold">{fecha.split(" ", 2)[1]}</div>
					<div className="text-2xl">{date.toLocaleTimeString()}</div>
				</div>
				<div className="w-1/2 p-1 flex flex-col justify-evenly items-center ">
					<h2 className="text-center text-3xl text-slate-900 dark:text-slate-100  font-bold">
						{reserva.mariachiBy_Id?.name}
					</h2>
					<p className="text-center text-xs flex flex-row text-slate-900 dark:text-slate-100">
						{reserva.coordinatorById?.name ||
							reserva?.mariachiBy_Id?.coordinator?.name}
					</p>
					<div className="flex justify-between">
						<p className="text-xs text-red-100/90  bg-black px-1 mr-2">
							({reserva.mariachiBy_Id?.members} elementos)
						</p>
						<p className="text-xs text-red-100/90 bg-black dark:bg-black px-1">
							{reserva.mariachiBy_Id?.categorySet}
						</p>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-12 gap-3 p-4">
				<div className="col-span-2 place-content-center place-items-center		items-center ">
					<AddressEventIcon className="fill-slate-900 dark:fill-slate-100 w-14 h-14 px-2 " />
				</div>
				<div className="col-span-10 ">
					<h4>
						{reserva?.shippingAddress?.address},{" "}
						{reserva?.shippingAddress?.city}, {reserva?.shippingAddress?.region}
					</h4>
				</div>

				<div className="col-span-2 place-content-center place-items-center	 fill-slate-900 dark:fill-slate-100">
					<ClientIcon className="fill-slate-900 dark:fill-slate-100 w-14 h-14 px-2" />
				</div>
				<div className="col-span-10 ">
					<div className="flex flex-col">
						<h4 className="text-lg text-slate-900 dark:text-slate-100">
							{reserva.client?.name}
						</h4>
						<h5 className="text-sm text-slate-900/50 dark:text-slate-100/50 ">
							{reserva?.client?.tel}, {reserva?.client?.email}
						</h5>
					</div>
				</div>
				{!(reserva?.message === "") && (
					<>
						<div className="col-span-2 place-content-center place-items-center	 fill-slate-900 dark:fill-slate-100">
							<MessageIcon className="fill-slate-900 dark:fill-slate-100 w-14 h-14 px-2" />
						</div>
						<div className="col-span-10 ">
							<h4 className="text-sm text-slate-900 dark:text-slate-100">
								{reserva?.message}
							</h4>
						</div>
					</>
				)}

				{reserva?.playlist?.length > 2 ? (
					<>
						<div className="col-span-2 place-content-center place-items-center	 fill-slate-900 dark:fill-slate-100">
							<div className="flex  justify-center  items-end mt-100">
								<PlaylistIcon className="fill-slate-900 dark:fill-slate-100 w-14 h-14 px-2" />
							</div>
						</div>
						<div className="col-span-4 ">
							<div className="flex flex-col ">
								<ol className="text-xs list-decimal list-inside">
									{reserva.playlist.map((list, index) => (
										<li key={index}>{list}</li>
									))}
								</ol>
							</div>
						</div>
					</>
				) : (
					<div className="col-span-6" />
				)}

				<div className="col-span-6  bg-gray-900   dark:bg-gray-400 text-slate-100 dark:text-slate-900 font-bold">
					<div className="flex justify-between items-center  border-t-blue-100 border-b-2 px-2">
						<LogoMariachon className="fill-blue-400 dark:fill-blue-900 w-14 px-2" />
						<h5 className="text-sm uppercase">
							{" "}
							{reserva?.orderItems[0]?.service} x {reserva?.orderItems[0]?.qty}
						</h5>
					</div>
					<div className="flex justify-between  items-center px-2 py-2">
						<div className="w-16">
							<p>Precio: </p>
						</div>
						<h5>${reserva?.orderItems[0]?.price}</h5>
					</div>

					<div className="flex justify-between  items-center border-t-blue-100 border-b-2 px-2 py-2">
						<div className="w-16">
							<p>Deposito: </p>
						</div>
						<p>${reserva?.orderItems[0]?.deposit}</p>
					</div>
					<div className="flex justify-between  items-center m-2 px-2">
						<div className="w-16">
							<p>Resta: </p>
						</div>
						<p>
							${reserva?.orderItems[0]?.price - reserva?.orderItems[0]?.deposit}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}