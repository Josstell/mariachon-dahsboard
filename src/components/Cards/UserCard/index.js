import Image from "next/image"
import React from "react"

const UserCard = () => {
	return (
		<div className="w-2/5 h-3/4 flex flex-col justify-center items-center">
			<div className="w-full h-1/3 bg-gradient-to-r from-slate-700 to-slate-900 rounded-t-md shadow-xl "></div>
			<div className="w-24 h-24 relative  align-middle border-blue-900 border-4 rounded-full -m-12  ">
				<Image
					className="shadow-xl rounded-full"
					alt="..."
					src="/images/user.jpeg"
					layout="fill"
					objectFit="contain"
				/>
			</div>
			<div className="w-full h-2/3 text-slate-50 dark:text-slate-900 bg-slate-50 rounded-b-lg flex flex-col justify-center items-center ">
				<h3 className="font-sans-serif ">Jose Juan Téllez Guzmán</h3>
				<h3>Tianguismanalco, Puebla</h3>
				<h3>Admin</h3>
				<h3>jjtellezg@gmail.com</h3>
				<h3>2215178999</h3>
			</div>
		</div>
	)
}

export default UserCard
