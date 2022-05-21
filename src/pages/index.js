import Sidebar from "../components/Sidebar"

import NavBar from "../components/Layout/NavBar"
import { useState, useEffect } from "react"

import { ChevronRightIcon, MusicNoteIcon } from "@heroicons/react/solid"

const Menus = [
	{ title: "Dashboard", src: "Chart_fill" },
	{ title: "Inbox", src: "Chat" },
	{ title: "Accounts", src: "User", gap: true },
	{ title: "Schedule ", src: "Calendar" },
	{ title: "Search", src: "Search" },
	{ title: "Analytics", src: "Chart" },
	{ title: "Files ", src: "Folder", gap: true },
	{ title: "Setting", src: "Setting" },
]

export default function Home() {
	const [open, setOpen] = useState(false)

	const handleSideBar = () => {
		setOpen(!open)
	}

	// const handleTimeToCloseMenu = (time) => {
	// 	setOpen(false)
	// 	setInterval(() => {
	// 		setOpen(true)
	// 	}, 5000)
	// }

	return (
		<>
			<div className="container  grid grid-cols-12 gap-1">
				<div className=" col-span-12 h-16 ">
					<NavBar setOpen={handleSideBar} open={open} />
				</div>
				<div
					className={`bg-red-500  h-[95vh]  ${
						open
							? "col-span-6 md:col-span-3 "
							: "hidden md:block  md:col-span-1 "
					}    transition-all duration-1600 ease-in `}
				>
					<div
						className={`  bg-dark-purple h-[95vh] p-2  pt-8 relative duration-300`}
					>
						<ChevronRightIcon
							className={`w-7 bg-white absolute cursor-pointer -right-3 top-9  border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
							onClick={() => handleSideBar()}
						/>
						<div
							className="grid grid-cols-8 items-center cursor-pointer "
							onClick={() => handleSideBar()}
						>
							<MusicNoteIcon
								className={`cursor-pointer duration-500 col-span-2 w-7 text-white  ${
									!open && "rotate-[360deg] col-span-8"
								} `}
							/>
							<h1
								className={`text-white origin-left font-medium text-xl duration-200 col-span-6  ${
									!open && "hidden"
								} `}
							>
								Mariachon
							</h1>
						</div>
						{/* 
						<ul className="pt-6">
							{Menus.map((Menu, index) => (
								<li
									key={index}
									className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
										index === 0 && "bg-light-white"
									} `}
								>
									<img src={`images/${Menu.src}.png`} />
									<span
										className={`${!open && "hidden"} origin-left duration-200`}
									>
										{Menu.title}
									</span>
								</li>
							))}
						</ul> */}
					</div>
				</div>

				<div
					className={`bg-slate-600 col-span-12 md:col-span-9 h-[95vh] ${
						open ? "col-span-6 md:col-span-9" : " md:col-span-11"
					} transition-all duration-1600 ease-in `}
				>
					3
				</div>
			</div>
		</>
	)
}

// ;<div className="container  grid grid-col-12 gap-1">
// 	{/*  */}
// 	<div className=" col-span-12 h-16 ">
// 		<NavBar setOpen={setOpen} open={open} />
// 	</div>
// 	<div
// 		className={`bg-red-500  md:h-[95vh]  md:col-span-2  ${
// 			open ? "visible col-span-6 " : "invisible h-0 "
// 		} md:visible transition-all duration-1600 ease-in`}
// 	>
// 		2
// 	</div>

// 	<div
// 		className={`bg-slate-600 col-span-12 md:col-span-10 h-[95vh] ${
// 			open ? "col-span-6" : "visible"
// 		} transition-all duration-1600 ease-in `}
// 	>
// 		3
// 	</div>
// </div>
