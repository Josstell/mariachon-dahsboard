import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

import { useTheme } from "next-themes"
import { MenuIcon, XIcon } from "@heroicons/react/solid"

import LogoMariachon from "../../SVG/Icons/LogoMariachon"
import Search from "../../Search"

const Nav = ({ open, setOpen }) => {
	const { data: session } = useSession()

	const { theme, setTheme } = useTheme()
	const [darkMode, setDarkMode] = useState(false)

	const handleDarkMode = (e) => {
		e.preventDefault()
		setDarkMode(!darkMode)
		setTheme(theme === "dark" ? "light" : "dark")
	}

	console.log("Session: ", session)

	return (
		<div className="shadow-md  w-full fixed top-0 left-0">
			<div className="flex bg-slate-100 dark:bg-slate-900 items-center justify-between md:px-10 px-7">
				<div
					onClick={() => setOpen()}
					className="cursor-pointer md:hidden flex "
				>
					{open ? <XIcon className="w-5" /> : <MenuIcon className="w-5" />}
				</div>
				<Link href="/" passHref>
					<LogoMariachon className="w-32 h-16 fill-slate-900 dark:fill-slate-50 relative cursor-pointer" />
				</Link>

				<Search />

				<div className="mr-5">
					<input
						type="checkbox"
						name="darkMode"
						id="checkbox"
						className="hidden"
						value={darkMode}
						onClick={handleDarkMode}
					/>
					<label htmlFor="checkbox" className="cursor-pointer">
						<div className="w-9 h-5 flex items-center bg-gray-300 rounded-full p2">
							<div className="w-4 h-4 bg-white rounded-full shadow"></div>
						</div>
					</label>
				</div>

				<div className="flex justify-center items-center ">
					{/* <CogIcon className="w-10 mx-2" /> */}

					<div className="flex flex-col justify-center items-center">
						<div
							className="w-8 h-8 flex flex-col  relative cursor-pointer"
							onClick={signOut}
						>
							<Image
								className="rounded-full"
								src={session.user.image}
								layout="fill"
								objectFit="cover"
								alt=""
							/>
						</div>

						<p className="text-xs text-center pt-1 text-slate-500">Admin</p>
					</div>
				</div>

				{/* <div
					onClick={() => setOpen()}
					className=" absolute right-8 top-6 cursor-pointer md:hidden"
				>
					{open ? <XIcon className="w-5" /> : <MenuIcon className="w-5" />}
				</div> */}

				{/* <ul
					className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white/10 md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
						open ? "top-[-200px]" : "top-[-490px]"
					}`}
				>
					{Links.map((link) => (
						<li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
							<a
								href={link.link}
								className="text-gray-800 hover:text-gray-400/5 duration-500"
							>
								{link.name}
							</a>
						</li>
					))}
					<button>Get Started</button>
				</ul> */}
			</div>
		</div>
	)
}

export default Nav
