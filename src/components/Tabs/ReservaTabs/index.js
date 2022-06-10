import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import AddressEventIcon from "src/components/SVG/Icons/AddressEventIcon"
import ClientIcon from "src/components/SVG/Icons/ClientIcon"
import MariachiIcon from "src/components/SVG/Icons/MariachiIcon"
import ParameterIcon from "src/components/SVG/Icons/ParameterIcon"
import { setDispBookingTabActive } from "store/features/bookings/bookingSlice"

const initialState = {
	client: false,
	address: false,
	mariachi: false,
	parameters: false,
}

const BookingTa = ({ children }) => {
	const dispatch = useDispatch()
	const [bookTabActive, setBookTabActive] = useState({
		...initialState,
		client: true,
	})

	useEffect(() => {
		dispatch(setDispBookingTabActive(bookTabActive))
	}, [dispatch, bookTabActive])

	const handleActiveTab = (tab) => {
		setBookTabActive({
			...initialState,
			[tab]: !setBookTabActive[tab],
		})
	}

	return (
		<div className="flex flex-col">
			<div className="flex border-b border-gray-200 dark:border-gray-700">
				<button
					onClick={() => handleActiveTab("client")}
					className={`flex items-center h-10 px-2 py-2 -mb-px text-center ${
						bookTabActive.client
							? "text-blue-700 border-blue-500 dark:text-blue-300"
							: "text-gray-700 border-transparent dark:text-white "
					}  bg-transparent border-b-2  sm:px-4 -px-1  whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400`}
				>
					<ClientIcon className="w-10 fill-slate-800 dark:fill-slate-100" />

					{/* <span className="mx-1 text-sm sm:text-base">Cliente </span> */}
				</button>

				<button
					onClick={() => handleActiveTab("address")}
					className={`${
						bookTabActive.address
							? "text-blue-700 border-blue-500 dark:text-blue-300"
							: "text-gray-700 border-transparent dark:text-white "
					}
				flex items-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2  sm:px-4 -px-1  whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400`}
				>
					<AddressEventIcon className="w-7 fill-slate-800 dark:fill-slate-100" />

					{/* <span className="mx-1 text-sm sm:text-base">Dirección</span> */}
				</button>

				<button
					onClick={() => handleActiveTab("mariachi")}
					className={`${
						bookTabActive.mariachi
							? "text-blue-700 border-blue-500 dark:text-blue-300"
							: "text-gray-700 border-transparent dark:text-white "
					}
				flex items-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2  sm:px-4 -px-1  whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400`}
				>
					<MariachiIcon className="w-7 fill-slate-800 dark:fill-slate-100" />
				</button>

				<button
					onClick={() => handleActiveTab("parameters")}
					className={`${
						bookTabActive.parameters
							? "text-blue-700 border-blue-500 dark:text-blue-300"
							: "text-gray-700 border-transparent dark:text-white "
					}
				flex items-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2  sm:px-4 -px-1  whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400`}
				>
					<ParameterIcon className="w-7 fill-slate-800 dark:fill-slate-100" />
				</button>
			</div>
			{children}
		</div>
	)
}

export default BookingTa
