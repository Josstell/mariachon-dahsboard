/* eslint-disable no-mixed-spaces-and-tabs */
//import Image from "next/image"
import { ViewGridAddIcon } from "@heroicons/react/outline"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { SelectSimple } from "src/components/Forms/Smart/Inputs"
import SearchWithModalMariachis from "src/components/Forms/Smart/SearchWithModal/SearchWithModalMariachis"
import GetLogoWithName from "src/components/GetLogoWithName"
import SpinnerLogo from "src/components/Spinners/SpinnerLogo"
import BookingIcon from "src/components/SVG/Icons/BookingIcon"
import LupaSearchIcon from "src/components/SVG/Icons/LupaSearchIcon"
import { selectAllMariachis } from "store/features/mariachis/mariachiSlice"

import { regions } from "src/helpers/dataset"

const TableMariachis = () => {
	const regionData = regions.response.estado

	const mariachisData = useSelector(selectAllMariachis)

	const [mariachisDataSearch, setMariachisDataSearch] = useState(
		mariachisData || []
	)

	useEffect(() => {
		setMariachisDataSearch(mariachisData)
	}, [mariachisData])

	const [hideIconShowSearch, setHideIconShowSearch] = useState(false)

	const [regionSelected, setRegionSelected] = useState("All")

	const getServices = (services) => {
		const servi = []

		Object.getOwnPropertyNames(services).forEach(function (val) {
			servi.push(val)
		})

		return servi
	}

	// useEffect(() => {
	// 	if (regionSelected !== "") {
	// 		const dataByRegion =
	// 			mariachisDataSearch !== []
	// 				? mariachisDataSearch.find((mariachi) => {
	// 						console.log(mariachi.region)
	// 						return mariachi.region.includes(regionSelected)
	// 				  })
	// 				: []
	// 		setMariachisDataSearch(dataByRegion)
	// 	}
	// }, [regionSelected])

	// useEffect(() => {
	// 	const mariachiByRegion = mariachisData.filter((dat) => {
	// 		return `${dat.region}`
	// 			.toLowerCase()
	// 			.includes(regionSelected.toLowerCase())
	// 	})
	// 	if (regionSelected === "All") {
	// 		console.log("OHHH All!!", regionSelected, mariachisData)
	// 		setMariachisDataSearch(mariachisData)
	// 	} else {
	// 		console.log("OHHH!!", regionSelected, mariachisData)

	// 		setMariachisDataSearch(mariachiByRegion)
	// 	}
	// }, [regionSelected, hideIconShowSearch])

	const handleGetRegion = (e) => {
		setRegionSelected(e.target.value)
	}

	if (!mariachisDataSearch) {
		return <SpinnerLogo />
	}

	console.log("Mariachis: ", mariachisDataSearch)

	return (
		<div className="px-2 md:px1 w-full h-full">
			<div
				className="relative  flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded sm:mt-0 sm:mb-auto
					 bg-white  dark:bg-slate-700 dark:text-white"
			>
				<div className={!hideIconShowSearch && "hidden"}>
					<SearchWithModalMariachis
						dataOriginal={mariachisData}
						mariachiDataSearch={mariachisDataSearch}
						setMariachisDataSearch={setMariachisDataSearch}
						setHideIconShowSearch={setHideIconShowSearch}
						hideIconShowSearch={hideIconShowSearch}
						regionSelected={regionSelected}
						typeData="mariachi"
					/>
				</div>
				<div className="rounded-t mb-0 px-4 py-3 border-0">
					<div className="flex flex-wrap items-center">
						<div className="relative w-full px-4 max-w-full flex justify-between items-center divide-x-2 md:divide-x-0 pr-2">
							<h3 className="font-semibold text-xs md:text-lg text-slate-700 dark:text-white ">
								Mariachis
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
									className={`fill-slate-300 w-7 mr-2 z-100 ${
										hideIconShowSearch ? "hidden" : null
									}`}
									onClick={() => setHideIconShowSearch(true)}
								/>
								<Link href={`mariachis/nuevo`} passHref>
									<ViewGridAddIcon className="w-7 cursor-pointer" />
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
									Logo
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Nombre
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Coordinador
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Tel
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
									Serenata
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Hora
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Contrato
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Categoria
								</th>
								<th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Elementos
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
								{/* <th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								>
									Borrar
								</th> */}
								{/* <th
									className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left 
											bg-slate-50 text-slate-500 border-slate-100
											dark:bg-slate-600 dark:text-slate-200 dark:border-slate-500"
								></th> */}
							</tr>
						</thead>
						<tbody>
							{mariachisDataSearch?.map((mariachi) => (
								<tr
									key={mariachi._id}
									className="transition duration-300 ease-in-out hover:bg-slate-600/95"
								>
									<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
										<span
											className="ml-3 font-bold 
													text-slate-600
													dark:text-white cursor-pointer"
										>
											{/* {useTruncatedIdOrTel(mariachi._id)} */}
											<Link
												href={`/mariachis/${mariachi.slug.current}`}
												passHref
											>
												<a>
													{mariachi?.logo ? (
														<div className="w-8 h-8 flex flex-col  relative cursor-pointer">
															<Image
																className="rounded-full"
																src={mariachi.logo}
																layout="fill"
																objectFit="cover"
																alt=""
															/>
														</div>
													) : (
														<GetLogoWithName
															text={mariachi.name}
															numberLetter={9}
														/>
													)}
												</a>
											</Link>
										</span>
									</th>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{mariachi.name}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{mariachi?.coordinator?.name}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{mariachi?.tel ? mariachi.tel : "no disponible"}{" "}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{mariachi.region}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{mariachi?.service?.serenata !== undefined
											? getServices(mariachi.service.serenata).map((ser) => (
													<div className="text-[8px] uppercase" key={ser}>
														{ser}
														{` ->`} ${mariachi.service.serenata[ser]}
													</div>
											  ))
											: null}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{mariachi?.service?.hora !== undefined
											? getServices(mariachi.service.hora).map((ser) => (
													<div className="text-[8px] uppercase" key={ser}>
														{ser}
														{` ->`} ${mariachi.service.hora[ser]}
													</div>
											  ))
											: null}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{mariachi?.service?.contrato !== undefined
											? getServices(mariachi.service.contrato).map((ser) => (
													<div className="text-[8px] uppercase" key={ser}>
														{ser}
														{` ->`} ${mariachi.service.contrato[ser]}
													</div>
											  ))
											: null}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{mariachi.categorySet}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{mariachi.members}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										<p
											className={`font-bold ${
												mariachi?.stage[0] === "AFILIADO" &&
												mariachi?.stage[0] !== undefined
													? "text-green-400"
													: "text-red-500"
											}`}
										>
											{mariachi.stage[0]}
										</p>
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										<Link
											href={{
												pathname: "reservas/nuevo",
												query: { mariachiId: mariachi._id },
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

export default TableMariachis
