/* eslint-disable no-mixed-spaces-and-tabs */
import Image from "next/image"
import React, { useEffect, useState } from "react"
import GetLogoWithNameV from "src/components/GetLogoWithName/GetLogoWithNameV"

const UserCard = ({ userUpdat }) => {
	const [userUpdate, setUserUpdate] = useState(userUpdat)

	useEffect(() => {
		setUserUpdate(userUpdat)
	}, [userUpdat])

	return (
		<div className="w-full h-[345px] flex flex-col justify-center items-center">
			<div className="w-full h-1/3 bg-gradient-to-r from-slate-700 to-slate-900 rounded-t-md shadow-xl "></div>
			<div
				className={`w-24 h-24 relative  align-middle ${
					userUpdate?.image || userUpdate?.profileImage?.url
						? "border-blue-900"
						: "border-slate-100"
				}  border-4 rounded-full -m-12  `}
			>
				{userUpdate?.image ? (
					<Image
						className="rounded-full"
						src={userUpdate?.image}
						layout="fill"
						objectFit="cover"
						alt=""
					/>
				) : userUpdate?.profileImage?.url ? (
					<Image
						className="rounded-full"
						src={userUpdate?.profileImage.url}
						layout="fill"
						objectFit="cover"
						alt=""
					/>
				) : (
					<GetLogoWithNameV
						text={userUpdate?.name || "Mariachon"}
						numberLetter={0}
					/>
				)}
			</div>
			<div className="w-full h-2/3 text-slate-50 dark:text-slate-900 bg-slate-50 rounded-b-lg flex flex-col justify-center items-center ">
				<h3 className="text-xl font-semibold ">{userUpdate?.name}</h3>
				<h3 className="text-lg font-semibold ">{userUpdate?.username}</h3>

				<div className="text-base font-light ">
					{userUpdate?.categorySet}
					{/* {userUpdate?.categorySet === []
						? "user"
						: userUpdate?.categorySet.map((cat) => (
								<ul key={cat}>
									<li>{cat}</li>
								</ul>
						  ))} */}
				</div>
				<h3 className="text-sm font-light ">
					{userUpdate?.region || "no disponible"}
				</h3>
				<h3 className="text-xs font-light ">
					{userUpdate?.email || "no disponible"}
				</h3>
				<h3 className="text-xs font-light ">
					{userUpdate?.tel || "no diponible"}
				</h3>
			</div>
		</div>
	)
}

export default UserCard
