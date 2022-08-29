import Image from "next/image"
import Link from "next/link"
import { signOut } from "next-auth/react"

import { MenuIcon, XIcon } from "@heroicons/react/solid"

import LogoMariachon from "../../SVG/Icons/LogoMariachon"
// import Search from "../../Search"
import { useSelector } from "react-redux"
import { selectUserAdmin } from "store/features/users/userSlice"
import ButtonDM from "src/components/ButtonDM"

const Nav = ({ open, setOpen }) => {
	const userAdmin = useSelector(selectUserAdmin)

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
					<a>
						<LogoMariachon className="w-32 h-16 fill-slate-900 dark:fill-slate-50 relative cursor-pointer" />
					</a>
				</Link>

				{/* <Search /> */}

				<div className="flex flex-row justify-center items-center cursor-pointer">
					<ButtonDM />

					<div className="flex justify-center items-center ">
						{/* <CogIcon className="w-10 mx-2" /> */}

						<div className="flex flex-col justify-center items-center">
							<div
								className="w-8 h-8 flex flex-col  relative cursor-pointer"
								onClick={signOut}
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
										src={userAdmin?.profileImage?.url}
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

							<p className="text-xs text-center pt-1 text-slate-500">
								{userAdmin?.isAdmin ? "admin" : "user"}
							</p>
						</div>
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
