import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { signOut } from "next-auth/react"

import { ChevronLeftIcon } from "@heroicons/react/solid"
import {
	ChartSquareBarIcon,
	UserAddIcon,
	AdjustmentsIcon,
	LogoutIcon,
} from "@heroicons/react/outline"
import MariachiIcon from "../../components/SVG/Icons/MariachiIcon"
import BookingIcon from "../../components/SVG/Icons/BookingIcon"

import dynamic from "next/dynamic"
import { useSelector } from "react-redux"
import { selectUserAdmin } from "store/features/users/userSlice"

const NavBar = dynamic(() => import("./NavBar"), { ssr: false })

export default function Layout({ children }) {
	const userAdmin = useSelector(selectUserAdmin)

	const [open, setOpen] = useState(false)

	const handleSideBar = () => {
		setOpen(!open)
	}

	return (
		<>
			<div className="w-screen grid grid-cols-12 ">
				<div className="bg-transparent col-span-12 h-16 z-10">
					<NavBar setOpen={handleSideBar} open={open} />
				</div>
				<div
					className={`pl-1 bg-slate-200 dark:bg-slate-900  h-[95vh]  ${
						open
							? "col-span-6 md:col-span-3 "
							: "hidden md:block  md:col-span-1 "
					}    transition-all duration-1600 ease-in `}
				>
					<div className={`  h-[95vh] p-2  pt-8 relative duration-300 z-10`}>
						<ChevronLeftIcon
							className={`w-7 bg-slate-100 dark:bg-slate-900 absolute cursor-pointer -right-3 top-9  border-slate-800
           border-2 rounded-full  ${!open && "rotate-180"}`}
							onClick={() => handleSideBar()}
						/>
						<div
							className="grid grid-cols-8 items-center cursor-pointer "
							onClick={() => handleSideBar()}
						>
							{/* <MusicNoteIcon
								className={`cursor-pointer duration-500 col-span-2 w-7 text-slate-900 dark:text-slate-50  ${
									!open && "rotate-[360deg] col-span-8"
								} `}
							/> */}
							<div
								className={`w-8 h-8 flex duration-500 col-span-2 flex-col  relative cursor-pointer ${
									!open && "rotate-[360deg] col-span-8"
								}`}
							>
								{userAdmin?.image ? (
									<Image
										className="rounded-full"
										src={userAdmin?.image}
										layout="fill"
										objectFit="cover"
										alt=""
									/>
								) : userAdmin?.profileImage?.url ? (
									<Image
										className="rounded-full"
										src={userAdmin?.profileImage.url}
										layout="fill"
										objectFit="cover"
										alt=""
									/>
								) : (
									<Image
										className="rounded-full"
										src="/images/icons/logoMariachon.png"
										layout="fill"
										objectFit="cover"
										alt=""
									/>
								)}
							</div>
							<h3
								className={`text-slate-900 ml-0 md:-ml-5 flex flex-col dark:text-slate-50 origin-left font-medium text-sm md:text-lg duration-200 col-span-6  ${
									!open && "hidden"
								} `}
							>
								<span>{userAdmin?.name}</span>
								<span className="text-sm  text-slate-500">
									{userAdmin?.isAdmin ? "admin" : "user"}
								</span>
							</h3>
						</div>

						<ul className="pt-6">
							<Link href="/panel" passHref>
								<li
									className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white bg-slate-100 dark:bg-slate-900 text-sm items-center gap-x-4 
              								mt-2
										 bg-light-white`}
								>
									<ChartSquareBarIcon className="w-7 bg-slate-100 dark:bg-slate-900" />
									<span
										className={`${!open && "hidden"} origin-left duration-200 `}
									>
										Dashboard
									</span>
								</li>
							</Link>
							<Link href="/usuarios" passHref>
								<li
									className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white bg-slate-100 dark:bg-slate-900 text-sm items-center gap-x-4 
              								mt-2
				`}
								>
									<UserAddIcon className="w-7" />
									<span
										className={`${!open && "hidden"} origin-left duration-200`}
									>
										Usuarios
									</span>
								</li>
							</Link>
							<Link href="/mariachis" passHref>
								<li
									className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white bg-slate-100 dark:bg-slate-900 text-sm items-center gap-x-4 
              								mt-2
				`}
								>
									<MariachiIcon className="fill-slate-900 dark:fill-slate-100 w-8 h-8" />

									<span
										className={`${!open && "hidden"} origin-left duration-200`}
									>
										Mariachis
									</span>
								</li>
							</Link>
							<Link href="/reservas" passHref>
								<li
									className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white bg-slate-100 dark:bg-slate-900 text-sm items-center gap-x-4 
              								mt-2
				`}
								>
									<BookingIcon className="fill-slate-900 dark:fill-slate-100 w-8 h-8" />
									<span
										className={`${!open && "hidden"} origin-left duration-200`}
									>
										Reservas
									</span>
								</li>
							</Link>
						</ul>

						<hr className="my-10" />
						<ul>
							<Link href="/perfil" passHref>
								<li
									className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white bg-slate-100 dark:bg-slate-900 text-sm items-center gap-x-4 
              								mt-2
										 bg-light-white`}
								>
									<AdjustmentsIcon className="w-7 bg-slate-100 dark:bg-slate-900" />
									<span
										className={`${!open && "hidden"} origin-left duration-200 `}
									>
										Edital perfil
									</span>
								</li>
							</Link>
							<li
								className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white bg-slate-100 dark:bg-slate-900 text-sm items-center gap-x-4 
              								mt-2
										 bg-light-white`}
								onClick={signOut}
							>
								<LogoutIcon className="w-7 bg-slate-100 dark:bg-slate-900" />
								<span
									className={`${!open && "hidden"} origin-left duration-200 `}
								>
									Salir
								</span>
							</li>
						</ul>
					</div>
				</div>

				<div
					className={` bg-slate-100 dark:bg-slate-900/80 col-span-12 md:col-span-11 h-[95vh] ${
						open ? "col-span-6 md:col-span-9" : " md:col-span-11"
					} transition-all duration-1600 ease-in `}
				>
					{children}
				</div>
			</div>
		</>
	)
}
