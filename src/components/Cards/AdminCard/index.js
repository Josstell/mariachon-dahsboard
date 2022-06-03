import Image from "next/image"
import React from "react"
import { useSelector } from "react-redux"

const AdminCard = ({ editCard, setEditCard, userUpdate }) => {
	const userAdmin = useSelector((state) => state.users.admin)
	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			<div className="w-full h-1/3 bg-gradient-to-r from-slate-50 to-slate-300 dark:bg-gradient-to-r dark:from-slate-700 dark:to-slate-900 rounded-t-md shadow-xl relative ">
				<div className="py-6 px-3 mt-10 md:mt-32 sm:mt-0 absolute right-0">
					<button
						className="bg-slate-200  active:bg-blueGray-100 uppercase  dark:text-slate-50 dark:bg-slate-600 font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
						type="button"
						onClick={() => setEditCard(!editCard)}
					>
						Editar
					</button>
				</div>
			</div>
			<div className="w-24 h-24 relative  align-middle border-white border-4 rounded-full -m-12  ">
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
			<div className="w-full h-2/3  text-slate-50 dark:text-slate-900 bg-slate-800 dark:bg-slate-50 rounded-b-lg flex flex-col justify-center items-center ">
				<h3 className="text-xl font-semibold ">{userUpdate?.name}</h3>
				<h3 className="text-base font-light ">
					{userAdmin?.categorySet || "user"}
				</h3>
				<h3 className="text-sm font-light ">
					{userUpdate?.city || "no disponible"}
				</h3>
				<h3 className="text-xs font-light ">{userUpdate?.email}</h3>
				<h3 className="text-xs font-light ">
					{userUpdate?.tel || "no diponible"}
				</h3>
			</div>
		</div>
	)
}

export default AdminCard
