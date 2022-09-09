/* eslint-disable no-mixed-spaces-and-tabs */
//import Image from "next/image"
import { ViewGridAddIcon } from "@heroicons/react/outline"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useSelector } from "react-redux"
//import { SelectSimple } from "src/components/Forms/Smart/Inputs"
import SearchWithModalMariachis from "src/components/Forms/Smart/SearchWithModal/SearchWithModalMariachis"
import GetLogoWithName from "src/components/GetLogoWithName"
import SpinnerLogo from "src/components/Spinners/SpinnerLogo"
import BookingIcon from "src/components/SVG/Icons/BookingIcon"
import LupaSearchIcon from "src/components/SVG/Icons/LupaSearchIcon"
import { selectAllMariachis } from "store/features/mariachis/mariachiSlice"

//import { regions } from "src/helpers/dataset"

const TableMariachis = () => {
	//const regionData = regions.response.estado

	const mariachisData = useSelector(selectAllMariachis)

	const [mariachisDataSearch, setMariachisDataSearch] = useState(
		mariachisData || []
	)

	const [hideIconShowSearch, setHideIconShowSearch] = useState(false)

	//const [regionSelected, setreRionSelected] = useState("")

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

	// const handleGetRegion = (e) => {
	// 	console.log("Estado: ", e.target.value)
	// 	setreRionSelected(e.target.value)
	// }
	// console.log("Estado fuera: ", regionSelected, mariachisDataSearch)

	if (!mariachisDataSearch) {
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
						setMariachisDataSearch={setMariachisDataSearch}
						setHideIconShowSearch={setHideIconShowSearch}
						hideIconShowSearch={hideIconShowSearch}
					/>
					{/* <div className="px-12">
						<div className="w-2/4">
							<SelectSimple
								name="regions"
								options={regionData}
								handleGral={handleGetRegion}
								hidden
							/>
						</div>
						<div className="w-2/4"></div>
					</div> */}
				</div>
				<div className="rounded-t mb-0 px-4 py-3 border-0">
					<div className="flex flex-wrap items-center">
						<div className="relative w-full px-4 max-w-full flex justify-between">
							<h3 className="font-semibold text-lg text-slate-700 dark:text-white">
								Lista de Mariachis
							</h3>
							<div className="flex flex-row justify-between ">
								<LupaSearchIcon
									className={`fill-slate-300 w-5 mr-2 z-100 ${
										hideIconShowSearch ? "hidden" : null
									}`}
									onClick={() => setHideIconShowSearch(true)}
								/>
								<Link href={`mariachis/nuevo`} passHref>
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
									Servicios
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
										{mariachi?.service
											? getServices(mariachi.service).map((ser) => (
													<div className="text-[8px] uppercase" key={ser}>
														{ser}
														{` ->`} ${mariachi.service[ser]}
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
