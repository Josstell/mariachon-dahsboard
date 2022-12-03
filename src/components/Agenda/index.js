import React, { useState } from "react"
import dayjs from "dayjs"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"
import { generateDate, monthsSpanish } from "src/helpers/calendar"
import cn from "src/helpers/cn"

dayjs.locale("es") // use Spanish locale globally

let nIntervId

const Agenda = () => {
	console.log(generateDate())
	const days = ["D", "L", "M", "M", "J", "V", "S"]

	const currentDate = dayjs()
	const [today, setToday] = useState(currentDate)
	const [selectDate, setSelectDate] = useState(currentDate)

	const [timeActual, setTimeActual] = useState(new Date())

	function changeTime() {
		// comprobar si ya se ha configurado un intervalo
		if (!nIntervId) {
			nIntervId = setInterval(getTime, 60000)
		}
	}

	function getTime() {
		setTimeActual(new Date())
		console.log("hora", timeActual.getHours())
	}

	changeTime()

	const reservas = [
		{ id: 1, hour: 1 },
		{ id: 2, hour: 3 },
	]

	return (
		<div className="flex flex-col md:flex-row    mx-12  divide-x-2 gap-10  items-center ">
			<div className="w-96 h-96 ">
				<div className="flex justify-between">
					<h1 className="font-semibold">
						{monthsSpanish[today.month()].toUpperCase()}, {today.year()}
					</h1>
					<div className="flex items-center gap-5">
						<ChevronLeftIcon
							className="w-5 cursor-pointer"
							onClick={() => {
								setToday(today.month(today.month() - 1))
							}}
						/>
						<h1
							className="cursor-pointer"
							onClick={() => {
								setToday(currentDate)
							}}
						>
							Today
						</h1>
						<ChevronRightIcon
							className="w-5 cursor-pointer"
							onClick={() => {
								setToday(today.month(today.month() + 1))
							}}
						/>
					</div>
				</div>
				<div className="w-full grid grid-cols-7">
					{days.map((day, index) => (
						<h1 key={index} className="h-14 grid place-content-center text-sm">
							{day}
						</h1>
					))}
				</div>
				<div className="w-full h-full grid grid-cols-7">
					{generateDate(today.month(), today.year()).map(
						({ date, currentMonth, today }, index) => {
							return (
								<div
									key={index}
									className="h-14 border-t grid place-content-center"
								>
									<h1
										className={cn(
											currentMonth ? "text-slate-50" : "text-slate-50/30",
											selectDate.toDate().toDateString() ===
												date.toDate().toDateString()
												? "bg-black text-white"
												: "",
											today ? "bg-red-600 text-white" : "",
											"h-10 w-10 grid place-content-center rounded-full hover:bg-white hover:text-slate-900 transition-all cursor-pointer"
										)}
										onClick={() => {
											setSelectDate(date)
										}}
									>
										{date.date()}
									</h1>
								</div>
							)
						}
					)}
				</div>
			</div>

			<div className="no-scrollbar overflow-auto flex-1 h-96 px-2  sm:px-5 my-10">
				<h1 className="font-semibold pb-5">
					Reservas para {selectDate.toDate().toDateString()}
				</h1>
				<div className=" grid grid-flow-row auto-rows-max gap-2 ">
					{Array(24)
						.fill()
						.map((e, i) => (
							<div
								key={i}
								className={cn(
									timeActual.getHours() === i
										? "border-double border-t border-slate-50/50 flex flex-row "
										: "border-double border-t border-slate-50/50 flex flex-row"
								)}
							>
								<h2
									className={cn(
										timeActual.getHours() === i
											? "text-red-600 py-2 px-1 w-3/12"
											: "py-2 text-slate-100/50 px-1 w-3/12"
									)}
								>
									{i < 10 ? "0" + i : i} : 00
								</h2>
								<div className="flex w-full flex-row justify-evenly items-center">
									{reservas.map((reser) => {
										console.log(reser.hour, i)
										reser.hour === i ? (
											<div className="border grow mx-2" key={reser.id}>
												{reser.id}
											</div>
										) : null
									})}
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}

export default Agenda
