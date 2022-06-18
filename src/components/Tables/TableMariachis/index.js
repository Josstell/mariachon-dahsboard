/* eslint-disable no-mixed-spaces-and-tabs */
//import Image from "next/image"
import { ViewGridAddIcon } from "@heroicons/react/outline"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { useSelector } from "react-redux"
import GetLogoWithName from "src/components/GetLogoWithName"
import useTruncatedIdOrTel from "src/hook/useTruncatedId"
import { selectAllMariachis } from "store/features/mariachis/mariachiSlice"

const TableMariachis = () => {
	const mariachisData = useSelector(selectAllMariachis)

	return (
		<div className="px-2 md:px1 w-full h-full">
			<div
				className="relative  flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded sm:mt-0 sm:mb-auto
					 bg-white  dark:bg-slate-700 dark:text-white"
			>
				<div className="rounded-t mb-0 px-4 py-3 border-0">
					<div className="flex flex-wrap items-center">
						<div className="relative w-full px-4 max-w-full flex justify-between">
							<h3 className="font-semibold text-lg text-slate-700 dark:text-white">
								Lista de Mariachis
							</h3>
							<Link href={`mariachis/nuevo`} passHref>
								<ViewGridAddIcon className="w-5 cursor-pointer" />
							</Link>
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
									Vinculos
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
							{mariachisData.map((mariachi) => (
								<tr key={mariachi._id}>
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
										{mariachi?.tel
											? useTruncatedIdOrTel(mariachi.tel)
											: "no disponible"}{" "}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										{mariachi.region}
									</td>
									<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										<div className="flex ">
											{/* {mariachi?.image ? (
											<div className="w-10 h-10 rounded-full border-2 border-slate-50 shadow relative">
													<Image
														className="rounded-full"
														src={mariachi?.image}
														layout="fill"
														objectFit="cover"
														alt=""
													/>
												) : (
													<Image
														className="rounded-full"
														src={mariachi?.profileImage.url}
														layout="fill"
														objectFit="cover"
														alt=""
													/>
											</div>
												)} */}
											{/* {mariachi.images.map((img) => (
												<img
													key={img.uid}
													src={img.url}
													alt="..."
													className="w-10 h-10 rounded-full border-2 border-slate-50 shadow"
												></img>
											))} */}
										</div>
									</td>
									{/* <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
										<div className="flex items-center">
											<span className="mr-2">60%</span>
											<div className="relative w-full">
												<div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
													<div
														style={{ width: "60%" }}
														className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
													></div>
												</div>
											</div>
										</div>
									</td> 
									 <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
										{/* <className />
									</td> 
									*/}
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
