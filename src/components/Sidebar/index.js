import Image from "next/image"
import { useState } from "react"

const Sidebar = () => {
	const [open, setOpen] = useState(true)
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

	return (
		<div className="flex">
			<div
				className={` ${
					open ? "w-72" : "w-20 "
				} bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
			>
				<div
					className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
					onClick={() => setOpen(!open)}
				>
					<Image
						src="images/control.png"
						alt="control"
						layout="fill"
						objectFit="cover"
					/>
				</div>

				<div className="flex gap-x-4 items-center">
					<Image
						className={`cursor-pointer duration-500 ${
							open && "rotate-[360deg]"
						}`}
						src="images/logo.png"
						alt="control"
						layout="fill"
						objectFit="cover"
					/>
					<h1
						className={`text-white origin-left font-medium text-xl duration-200 ${
							!open && "scale-0"
						}`}
					>
						Designer
					</h1>
				</div>
				<ul className="pt-6">
					{Menus.map((Menu, index) => (
						<li
							key={index}
							className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
								index === 0 && "bg-light-white"
							} `}
						>
							<div className="relative w-12 h-12">
								<Image
									src={`images/${Menu.src}.png`}
									alt="control"
									layout="fill"
									objectFit="cover"
								/>
							</div>
							<span className={`${!open && "hidden"} origin-left duration-200`}>
								{Menu.title}
							</span>
						</li>
					))}
				</ul>
			</div>
			<div className="h-screen flex-1 p-7">
				<h1 className="text-2xl font-semibold ">Home Page</h1>
			</div>
		</div>
	)
}
export default Sidebar
