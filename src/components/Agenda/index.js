import React, { useEffect, useState } from "react"
import dayjs from "dayjs"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"
import { generateDate, monthsSpanish, weekSpanish } from "src/helpers/calendar"
import cn from "src/helpers/cn"
import { getDateAvantAndBefore } from "src/helpers/utils"
import { useLazyGetBookingsByDateQuery } from "store/features/bookingsApi"
import { getBookingsByQuery } from "@lib/sanity"
import SpinnerCircular from "../Spinners/SpinnerCircular"
import BookingCalendar from "../Cards/BookingCard/BookingCalendar"

dayjs.locale("es") // use Spanish locale globally

let nIntervId

const Agenda = () => {
	const [
		getBookingsByDatelocal,
		{
			data: bookingsByDate,
			isLoading: isLoadingDate,
			isFetching: isFetchingDate,
		},
	] = useLazyGetBookingsByDateQuery()

	const days = ["D", "L", "M", "M", "J", "V", "S"]

	const currentDate = dayjs().locale("es")
	const [today, setToday] = useState(currentDate)
	const [selectDate, setSelectDate] = useState(currentDate)

	const [timeActual, setTimeActual] = useState(new Date())

	console.log("Hola", bookingsByDate?.result)

	useEffect(() => {
		const dateAB = getDateAvantAndBefore(selectDate)
		if (dateAB.before) {
			console.log("before after", dateAB)

			getBookingsByDatelocal(getBookingsByQuery(dateAB.before, dateAB.after))
		}
	}, [selectDate])

	function changeTime() {
		// comprobar si ya se ha configurado un intervalo
		if (!nIntervId) {
			nIntervId = setInterval(getTime, 60000)
		}
	}

	function getTime() {
		setTimeActual(new Date())
		//console.log("hora", timeActual.getHours())
	}

	changeTime()

	console.log("day selected", selectDate)

	return (
		<div className="flex flex-col md:flex-row    mx-12  sm:divide-x-2 gap-10  items-center ">
			<div className="w-screen px-1 sm:p-0 sm:w-96 h-96 ">
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
							Hoy
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
				<h1 className="font-semibold pb-5 w-full flex gap-x-5">
					Reservas: {weekSpanish[selectDate.day()]} {selectDate.date()} de{" "}
					{monthsSpanish[selectDate.month()]}, {selectDate.year()}
					{isFetchingDate || isLoadingDate ? <SpinnerCircular /> : null}
				</h1>
				{bookingsByDate?.result.map((reserva) => (
					<div key={reserva._id}>
						<BookingCalendar reserva={reserva} />
					</div>
				))}
			</div>
		</div>
	)
}

export default Agenda
