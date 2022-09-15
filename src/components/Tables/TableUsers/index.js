import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { useSelector } from "react-redux"
import GetLogoWithName from "src/components/GetLogoWithName"
import { selectAllUsers } from "store/features/users/userSlice"

import { ViewGridAddIcon } from "@heroicons/react/outline"
//import Search from "src/components/Search"
import LupaSearchIcon from "src/components/SVG/Icons/LupaSearchIcon"
import BookingIcon from "src/components/SVG/Icons/BookingIcon"
import { SelectSimple } from "src/components/Forms/Smart/Inputs"
import SearchWithModalMariachis from "src/components/Forms/Smart/SearchWithModal/SearchWithModalMariachis"

import { regions } from "src/helpers/dataset"

const TableUser = () => {
	const regionData = regions.response.estado

	const usersData = useSelector(selectAllUsers)

	const [usersDataSearch, setUsersDataSearch] = useState(usersData)

	const [hideIconShowSearch, setHideIconShowSearch] = useState(false)

	const [regionSelected, setRegionSelected] = useState("All")

	const handleGetRegion = (e) => {
		setRegionSelected(e.target.value)
	}

	return (
		<div className="px-2 md:px1 w-full h-full">
			<div
				className="relative  flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded sm:mt-0 sm:mb-auto
					 bg-white  dark:bg-slate-700 dark:text-white"
			>
				<div className={!hideIconShowSearch && "hidden"}>
					<SearchWithModalMariachis
						dataOriginal={usersData}
						mariachiDataSearch={usersDataSearch}
						setMariachisDataSearch={setUsersDataSearch}
						setHideIconShowSearch={setHideIconShowSearch}
						hideIconShowSearch={hideIconShowSearch}
						regionSelected={regionSelected}
						typeData="user"
					/>
				</div>
				<div className="rounded-t mb-0 px-4 py-3 border-0">
					<div className="flex flex-wrap items-center">
						<div className="relative w-full px-4 max-w-full flex flex-row justify-between divide-x-2 md:divide-x-0 pr-2 ">
							<h3 className="font-semibold text-lg text-slate-700 dark:text-white ">
								Usuarios
							</h3>
							<div className="flex flex-row justify-between items-center pl-2 ">
								<div className="mr-2">
									<SelectSimple
										name="regions"
										options={regionData}
										handleGral={handleGetRegion}
										hidden
										tableSize={true}
									/>
								</div>
								<LupaSearchIcon
									className={`fill-slate-300 w-5 mr-2 z-100 ${
										hideIconShowSearch ? "hidden" : null
									}`}
									onClick={() => setHideIconShowSearch(true)}
								/>
								<Link href={`/usuarios/nuevo`} passHref>
									<ViewGridAddIcon className="w-5 cursor-pointer" />
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="block w-full overflow-x-auto">
					{/* Projects table */}
					<table className="items-center w-full bg-transparent border-collapse">
						<thead>
							<tr>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left  
										bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Nomrbre completo
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									username
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									email
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									tel
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									role
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Estado
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Etapa
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Editar
								</th>

								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Reservar
								</th>
							</tr>
						</thead>
						<tbody>
							{usersDataSearch.map((user) => (
								<tr
									key={user._id}
									className="transition duration-300 ease-in-out hover:bg-slate-600/95"
								>
									<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
										<span
											className="ml-3 font-bold 
													text-slate-600
													dark:text-white"
										>
											{/* //{useTruncatedIdOrTel(user._id)} */}
											{user.name}
										</span>
									</th>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{user.username}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{user.email}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{user?.tel ? user.tel : "no disponible"}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{user?.categorySet &&
											user?.categorySet.map((category, index) => (
												<span key={index}>
													{!(index === user.categorySet.length - 1) &&
													!(category === null)
														? `${category}, `
														: category}
												</span>
											))}
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{user.region}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{user?.stage || ""}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										<div className="flex ">
											<Link href={`/usuarios/${user._id.toString()}`}>
												<a className="w-10 h-10 rounded-full border-1 border-slate-50 shadow relative">
													{user?.image ? (
														<Image
															className="rounded-full"
															src={user?.image}
															layout="fill"
															objectFit="cover"
															alt=""
														/>
													) : user?.profileImage?.url ? (
														<Image
															className="rounded-full"
															src={user?.profileImage.url}
															layout="fill"
															objectFit="cover"
															alt=""
														/>
													) : (
														<GetLogoWithName
															text={user.name}
															numberLetter={0}
														/>
													)}
												</a>
												{/* {user.images.map((img) => (
												<img
													key={img.uid}
													src={img.url}
													alt="..."
													className="w-10 h-10 rounded-full border-2 border-slate-50 shadow"
												></img>
											))} */}
											</Link>
										</div>
									</td>

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
										<Link
											href={{
												pathname: "reservas/nuevo",
												query: { client: user._id },
											}}
											passHref
										>
											<BookingIcon className="fill-slate-900 dark:fill-slate-100 w-8 h-8" />
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}

export default TableUser
