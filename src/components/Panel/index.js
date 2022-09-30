import { UserAddIcon } from "@heroicons/react/outline"
import React from "react"
import { useSelector } from "react-redux"
import { selectAllBookings } from "store/features/bookings/bookingSlice"
import { selectAllMariachis } from "store/features/mariachis/mariachiSlice"
import { selectAllUsers } from "store/features/users/userSlice"
import BookingIcon from "../SVG/Icons/BookingIcon"
import MariachiIcon from "../SVG/Icons/MariachiIcon"

const Panel = () => {
	const usersData = useSelector(selectAllUsers)
	const mariachisData = useSelector(selectAllMariachis)
	const bookingsData = useSelector(selectAllBookings)
	return (
		<div className="w-full h-screen flex flex-col justify-evenly items-center  ">
			<div className="w-10/12 h-1/4  bg-white  dark:bg-white dark:text-white m-2 p-2 shadow-2xl opacity-75 rounded relative">
				<div className="w-2/4 h-2/4  absolute bg-slate-600 -top-5 shadow-lg flex justify-center items-center">
					<BookingIcon className="fill-slate-900 dark:fill-slate-100 w-14 h-14" />
				</div>
				<h3 className="text-slate-700 font-bold text-xl text-right uppercase">
					Reservas
				</h3>
				<span className="absolute right-10 bottom-10 font-extrabold text-5xl text-green-700">
					{bookingsData.length}
				</span>{" "}
			</div>
			<div className="w-10/12 h-1/4  bg-white  dark:bg-white dark:text-white m-2 p-2 shadow-2xl opacity-75 rounded relative">
				<div className="w-2/4 h-2/4  absolute bg-slate-600 -top-5 shadow-lg flex justify-center items-center">
					<MariachiIcon className="fill-slate-900 dark:fill-slate-100 w-14 h-14" />
				</div>
				<h3 className="text-slate-700 font-bold text-xl text-right uppercase">
					Mariachis
				</h3>
				<span className="absolute right-10 bottom-10 font-extrabold text-5xl text-green-700">
					{mariachisData.length}
				</span>{" "}
			</div>
			<div className="w-10/12 h-1/4  bg-white  dark:bg-white dark:text-white m-2 p-2 shadow-2xl opacity-75 rounded relative">
				<div className="w-2/4 h-2/4  absolute bg-slate-600 -top-5 shadow-lg flex justify-center items-center">
					<UserAddIcon className="fill-slate-900 dark:fill-slate-100 w-14 h-14" />
				</div>
				<h3 className="text-slate-700 font-bold text-xl text-right uppercase">
					Usuarios
				</h3>
				<span className="absolute right-10 bottom-10 font-extrabold text-5xl text-green-700">
					{usersData.length}
				</span>{" "}
			</div>
		</div>
	)
}

export default Panel
