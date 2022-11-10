import Image from "next/image"
import React, { useState } from "react"
import GetLogoWithName from "src/components/GetLogoWithName"

import { ViewGridAddIcon } from "@heroicons/react/outline"
//import Search from "src/components/Search"
import LupaSearchIcon from "src/components/SVG/Icons/LupaSearchIcon"
import BookingIcon from "src/components/SVG/Icons/BookingIcon"
import { SelectSimple } from "src/components/Forms/Smart/Inputs"
import SearchWithModalMariachis from "src/components/Forms/Smart/SearchWithModal/SearchWithModalMariachis"

import { regions } from "src/helpers/dataset"
import TotalSum from "src/components/SVG/Icons/TotalSum"
import { useRouter } from "next/router"
import { useGetUsersQuery } from "store/features/usersApi"
import SpinnerCircular from "src/components/Spinners/SpinnerCircular"
import SpinnerLogo from "src/components/Spinners/SpinnerLogo"
import { phoneFormat } from "src/helpers/utils"

// const query = groq`
// *[_type == "user" && !(_id in path('drafts.**'))  ] | order(_createdAt desc)
// `
//&& _id != $ownerId

const TableUser = () => {
	const router = useRouter()

	const {
		data: usersApi,
		isLoading,
		isFetching,
	} = useGetUsersQuery(undefined, {
		refetchOnMountOrArgChange: true,
		refetchOnFocus: true,
		refetchOnReconnect: true,
	})

	// useEffect(() => {
	// 	if (isSuccess) {
	// 		dispatch(setUsers(usersApi.result))
	// 	}
	// }, [isFetching, isSuccess])

	// const {
	// 	data: usersApi,
	// 	isLoading,
	// 	isSuccess,
	// } = useSelector(usersSanityApi.endpoints.getUsers.select())

	//const dispatch = useDispatch()

	//const usersSearch = useSelector(selectUsersSearch)

	/*********************************************************************/

	// const subscriptionUserLocal = subscriptionUser.subscribe((update) => {
	// 	const userDataset = update.result
	// 	const isAlreadyUser = usersApi?.result.find(
	// 		(user) => user._id === userDataset._id
	// 	)

	// 	const isAlreadyUserSearch = usersSearch.find(
	// 		(user) => user._id === userDataset._id
	// 	)

	// 	// if (isAlreadyUser) {
	// 	// 	dispatch(setUpdatedUser(userDataset))
	// 	// } else if (!isAlreadyUser) {
	// 	// 	dispatch(setNewUser(userDataset))
	// 	// }

	// 	// if (isAlreadyUserSearch) {
	// 	// 	dispatch(setUpdatedUserSearch(userDataset))
	// 	// } else if (!isAlreadyUser) {
	// 	// 	dispatch(setNewUserSearch(userDataset))
	// 	// }
	// })

	//console.log("isListening", isListening)

	/*********************************************************************/

	const regionData = regions.response.estado

	const [usersDataSearch, setUsersDataSearch] = useState([])

	const [hideIconShowSearch, setHideIconShowSearch] = useState(false)

	const [regionSelected, setRegionSelected] = useState("All")

	// useEffect(() => {
	// 	// 	//setUsersDataSearch(usersSearch)
	// 	console.log("esta cargando", isLoading, usersApi?.result)
	// 	if (!isLoading && usersSearch !== []) {
	// 		console.log("entor")
	// 		dispatch(setUsersSearch(usersApi?.result))
	// 	}
	// 	// 	//	setDataset({})
	// }, [isLoading, usersSearch, subscriptionUserLocal])

	const handleGetRegion = (e) => {
		setRegionSelected(e.target.value)
	}

	const handleUserUrl = (id) => {
		//	subscriptionUserLocal.unsubscribe()
		router.push(`/usuarios/${id.toString()}`)
	}

	const handleNewUser = () => {
		//	subscriptionUserLocal.unsubscribe()
		router.push(`/usuarios/nuevo`)
	}
	const handleReservas = (id) => {
		//	subscriptionUserLocal.unsubscribe()
		router.push({
			pathname: "reservas/nuevo",
			query: { client: id },
		})
	}

	if (isLoading) {
		return <SpinnerLogo />
	}

	return (
		<div className="px-2 md:px1 w-full h-full">
			<div
				className="relative  flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded sm:mt-0 sm:mb-auto
					 bg-white  dark:bg-slate-700 dark:text-white"
			>
				<div className={!hideIconShowSearch && "hidden"}>
					<SearchWithModalMariachis
						dataOriginal={usersApi?.result || []}
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
							<h3 className="font-semibold text-lg text-slate-700 dark:text-white flex flex-col justify-center items-center ">
								<span>Usuarios</span>
								{isFetching ? (
									<SpinnerCircular />
								) : (
									<div className="flex justify-center items-center">
										<TotalSum className="fill-slate-900 dark:fill-slate-100 w-5 h-5 mt-1" />
										<span className="text-sm "> {usersDataSearch.length}</span>
									</div>
								)}
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
								{/* <Link href={`/usuarios/nuevo`} passHref> */}
								<div onClick={handleNewUser}>
									<ViewGridAddIcon className="w-5 cursor-pointer" />
								</div>
								{/* </Link> */}
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
									Avatar
								</th>
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
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										<div className="flex ">
											{/* //	<Link href={`/usuarios/${user._id.toString()}`}> */}
											<a
												className="w-10 h-10 rounded-full border-1 border-slate-50 shadow relative"
												onClick={() => handleUserUrl(user._id)}
											>
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
													<GetLogoWithName text={user.name} numberLetter={0} />
												)}
											</a>

											{/* </Link> */}
										</div>
									</td>

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
										{user?.tel ? phoneFormat(user.tel) : "no disponible"}
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

									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right cursor-pointer">
										{user.stage[0] !== "ANULADO" && (
											<div onClick={() => handleReservas(user._id)}>
												<BookingIcon className="fill-slate-900 dark:fill-slate-100 w-8 h-8" />
											</div>
										)}
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
