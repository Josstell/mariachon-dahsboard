import React, { useState } from "react"

import { MenuIcon, XIcon } from "@heroicons/react/solid"

import { CogIcon } from "@heroicons/react/outline"

import Image from "next/image"

const Nav = ({ open, setOpen }) => {
	let Links = [
		{ name: "HOME", link: "/" },
		{ name: "SERVICE", link: "/" },
		{ name: "ABOUT", link: "/" },
		{ name: "BLOG'S", link: "/" },
		{ name: "CONTACT", link: "/" },
	]

	return (
		<div className="shadow-md w-full fixed top-0 left-0">
			<div className="flex  items-center justify-between bg-white/5 py-0 md:px-10 px-7">
				<div
					onClick={() => setOpen()}
					className="cursor-pointer md:hidden flex "
				>
					{open ? <XIcon className="w-5" /> : <MenuIcon className="w-5" />}
				</div>

				<div className="w-32 h-16 p-0 m-0 relative cursor-pointer">
					<Image
						src="/images/icons/mariachonBlack.svg"
						layout="fill"
						objectFit="cover"
						alt=""
					/>
				</div>

				<div className="mr-5">
					<input type="checkbox" name="" id="checkbox" className="hidden" />
					<label htmlFor="checkbox" className="cursor-pointer">
						<div className="w-9 h-5 flex items-center bg-gray-300 rounded-full p2">
							<div className="w-4 h-4 bg-white rounded-full shadow"></div>
						</div>
					</label>
				</div>

				<div className="flex justify-center items-center ">
					{/* <CogIcon className="w-10 mx-2" /> */}

					<div className="flex flex-col justify-center items-center">
						<div className="w-9 h-9 flex flex-col  relative">
							<Image
								className="rounded-full"
								src="/images/user.jpeg"
								layout="fill"
								objectFit="cover"
								alt=""
							/>
						</div>

						<p className="text-xs text-center text-slate-500">joss</p>
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
