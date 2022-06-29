/* eslint-disable no-mixed-spaces-and-tabs */
import { TicketIcon } from "@heroicons/react/outline"
import React from "react"
import AddressEventIcon from "src/components/SVG/Icons/AddressEventIcon"
import ClientIcon from "src/components/SVG/Icons/ClientIcon"

import LogoMariachon from "src/components/SVG/Icons/LogoMariachon"
import MessageIcon from "src/components/SVG/Icons/MessageIcon"
import PlaylistIcon from "src/components/SVG/Icons/PlaylistIcon"

export default function BookingCard({ reserva, data }) {
	const options = {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
	}

	const date = new Date(reserva?.dateAndTime || data?.dateAndTime)
	const fecha = date.toLocaleDateString("es-MX", options)

	return (
		<div className="mx-auto no-scrollbar overflow-auto max-w-[400px] min-w-[370px] min-h-[650px]	 h-screen flex flex-col justify-around bg-slate-200 dark:bg-slate-800 shadow-[0_35px_100px_rgba(0,0,0,0.25)] dark:shadow-[0_35px_100px_rgba(00,00,00,0.1)]">
			<div className="flex  px-2 my-2 ">
				<TicketIcon className="fill-slate-900 dark:fill-slate-100 w-5 h-5 " />
				<p className="ml-2">
					{reserva?.reserva
						? reserva?.reserva
						: reserva?._id === undefined
						? data?._id
						: reserva._id}
				</p>
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
						{reserva?.orderItems?.mariachi?.name === undefined
							? data?.orderItems?.mariachi?.name
							: reserva?.orderItems?.mariachi?.name}
					</h2>
					<p className="text-center text-xs flex flex-row text-slate-900 dark:text-slate-100">
						{reserva?.orderItems?.mariachi?.coordinator?.name === undefined
							? data?.orderItems?.mariachi?.coordinator?.name
							: reserva?.orderItems?.mariachi?.coordinator?.name}
					</p>
					<div className="flex justify-between">
						<p className="text-xs text-red-50/90  bg-black px-[6px] pt-[1px] pb-[2px] mr-2 rounded-sm">
							(
							{reserva?.orderItems?.members === undefined
								? data?.orderItems?.members
								: reserva?.orderItems?.members}{" "}
							elementos)
						</p>
						<p className="text-xs text-red-50/90 bg-black dark:bg-black px-[6px] pt-[1px] pb-[2px] rounded-sm">
							{reserva?.orderItems?.categorySet === undefined
								? data?.orderItems?.categorySet
								: reserva?.orderItems?.categorySet}
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
						{reserva?.shippingAddress?.address === undefined
							? data?.shippingAddress?.address
							: reserva?.shippingAddress?.address}
						{reserva?.shippingAddress?.city === undefined
							? ", " + data?.shippingAddress?.city
							: ", " + reserva?.shippingAddress?.city}
						{reserva?.shippingAddress?.region === undefined
							? ", " + data?.shippingAddress?.region
							: ", " + reserva?.shippingAddress?.region}
						{reserva?.shippingAddress?.cp === undefined
							? ", " + data?.shippingAddress?.cp
							: ", " + reserva?.shippingAddress?.cp}
					</h4>
				</div>

				<div className="col-span-2 place-content-center place-items-center	 fill-slate-900 dark:fill-slate-100">
					<ClientIcon className="fill-slate-900 dark:fill-slate-100 w-14 h-14 px-2" />
				</div>
				<div className="col-span-10 ">
					<div className="flex flex-col">
						<h4 className="text-lg text-slate-900 dark:text-slate-100">
							{reserva?.client?.name === undefined
								? data?.client?.name
								: reserva?.client?.name}
						</h4>
						<h5 className="text-sm text-slate-900/50 dark:text-slate-100/50 ">
							{reserva?.client?.tel === undefined
								? data?.client?.tel
								: reserva?.client?.tel}
							,
							{reserva?.client?.email === undefined
								? data?.client?.email
								: reserva?.client?.email}
						</h5>
					</div>
				</div>
				{!(reserva?.message === undefined) ? (
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
				) : !(data?.message === undefined) ? (
					<>
						<div className="col-span-2 place-content-center place-items-center	 fill-slate-900 dark:fill-slate-100">
							<MessageIcon className="fill-slate-900 dark:fill-slate-100 w-14 h-14 px-2" />
						</div>
						<div className="col-span-10 ">
							<h4 className="text-sm text-slate-900 dark:text-slate-100">
								{data?.message}
							</h4>
						</div>
					</>
				) : null}

				<div className="col-span-6" />
				<div className="col-span-6 flex justify-end -mb-2">
					<div>
						{reserva?.status === undefined
							? null
							: reserva?.status.map((res) => (
									<span
										className=" text-slate-50 text-[8px] bg-black px-2 py-[2px] ml-1"
										key={res}
									>
										{res}
									</span>
							  ))}
					</div>
				</div>

				{reserva?.playlist !== undefined && reserva?.playlist?.length > 0 ? (
					<>
						<div className="col-span-2 place-content-center place-items-center	 fill-slate-900 dark:fill-slate-100">
							<div className="flex  justify-center  items-end mt-100">
								<PlaylistIcon className="fill-slate-900 dark:fill-slate-100 w-14 h-14 px-2" />
							</div>
						</div>
						<div className="col-span-4 ">
							<div className="flex flex-col ">
								<ol className="text-xs list-decimal list-inside">
									{reserva?.playlist.map((list, index) => (
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
							<span className="text-[10px]">
								{reserva?.orderItems?.service === undefined
									? data?.orderItems?.service
									: reserva?.orderItems?.service}{" "}
								x{" "}
							</span>

							{!reserva?.orderItems?.qty
								? data?.orderItems?.qty
								: reserva?.orderItems?.qty}
						</h5>
					</div>
					<div className="flex justify-between  items-center px-2 py-2">
						<div className="w-16">
							<p>Precio: </p>
						</div>
						<h5>
							$
							{reserva?.orderItems?.price === undefined
								? data?.orderItems?.price
								: reserva?.orderItems?.price}
						</h5>
					</div>

					<div className="flex justify-between  items-center border-t-blue-100 border-b-2 px-2 py-2">
						<div className="w-16">
							<p>Deposito: </p>
						</div>
						<p>
							$
							{reserva?.orderItems?.deposit === undefined
								? data?.orderItems?.deposit
								: reserva?.orderItems?.deposit}
						</p>
					</div>
					<div className="flex justify-between  items-center m-2 px-2">
						<div className="w-16">
							<p>Resta: </p>
						</div>
						<p>
							$
							{reserva?.orderItems?.price === undefined
								? (data?.orderItems?.price - data?.orderItems?.deposit) *
								  data?.orderItems?.qty
								: (reserva?.orderItems?.price - reserva?.orderItems?.deposit) *
								  reserva?.orderItems?.qty}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
