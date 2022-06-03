import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setDispMariachiTabActive } from "store/features/mariachis/mariachiSlice"

const initialState = {
	data: false,
	mariachi: false,
	gral: false,
}

const MariachiTa = ({ children }) => {
	const dispatch = useDispatch()
	const [mariachiTabActive, setMariachiTabActive] = useState({
		...initialState,
		data: true,
	})

	useEffect(() => {
		dispatch(setDispMariachiTabActive(mariachiTabActive))
	}, [dispatch, mariachiTabActive])

	const handleActiveTab = (tab) => {
		setMariachiTabActive({
			...initialState,
			[tab]: !mariachiTabActive[tab],
		})
	}

	return (
		<div className="flex flex-col">
			<div className="flex border-b border-gray-200 dark:border-gray-700">
				<button
					onClick={() => handleActiveTab("data")}
					className={`flex items-center h-10 px-2 py-2 -mb-px text-center ${
						mariachiTabActive.data
							? "text-blue-700 border-blue-500 dark:text-blue-300"
							: "text-gray-700 border-transparent dark:text-white "
					}  bg-transparent border-b-2  sm:px-4 -px-1  whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-4 h-4 mx-1 sm:w-6 sm:h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
						/>
					</svg>

					<span className="mx-1 text-sm sm:text-base">Datos</span>
				</button>

				<button
					onClick={() => handleActiveTab("mariachi")}
					className={`${
						mariachiTabActive.mariachi
							? "text-blue-700 border-blue-500 dark:text-blue-300"
							: "text-gray-700 border-transparent dark:text-white "
					}
				flex items-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2  sm:px-4 -px-1  whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-4 h-4 mx-1 sm:w-6 sm:h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
						/>
					</svg>

					<span className="mx-1 text-sm sm:text-base"> Mariachis</span>
				</button>

				<button
					onClick={() => handleActiveTab("gral")}
					className={`${
						mariachiTabActive.gral
							? "text-blue-700 border-blue-500 dark:text-blue-300"
							: "text-gray-700 border-transparent dark:text-white "
					}
				flex items-center h-10 px-2 py-2 -mb-px text-center bg-transparent border-b-2  sm:px-4 -px-1  whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400`}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="w-4 h-4 mx-1 sm:w-6 sm:h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
						/>
					</svg>

					<span className="mx-1 text-sm sm:text-base">Generales</span>
				</button>
			</div>
			{children}
		</div>
	)
}

export default MariachiTa
