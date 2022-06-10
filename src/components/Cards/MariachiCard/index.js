import Image from "next/image"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import AddressIcon from "src/components/SVG/Icons/AddressIcon"
import CategoriesIcon from "src/components/SVG/Icons/CategoriesIcon"
import CoordinatorIcon from "src/components/SVG/Icons/CoordinatorIcon"
import MembersIcon from "src/components/SVG/Icons/MembersIcon"
import PricesIcon from "src/components/SVG/Icons/PricesIcon"
//import useCategoryVar from "src/hook/useCategoryVar"
import { selectAllUsers } from "store/features/users/userSlice"

const MariachiCard = ({ mariachiUp }) => {
	const [coordinator, setCoordinator] = useState({})

	const allUser = useSelector(selectAllUsers)

	//const category = useCategoryVar(mariachiUp.categorySet)

	useEffect(() => {
		setCoordinator(allUser.find((user) => user._id === mariachiUp.coordinator))
	}, [mariachiUp.coordinator])

	return (
		<div className="w-full h-full shadow-[0_0_100px_rgba(0,0,0,0.3)] dark:shadow-[0_0_100px_rgba(50,50,50,0.3)] bg-slate-100 dark:bg-slate-800  rounded-t-lg rounded-b-lg flex flex-col text-slate-300">
			<div className="relative w-full h-2/5	 ">
				<Image
					className="rounded-t-lg"
					src="/images/mariachiTexcalco.png"
					alt=""
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<div className="px-4">
				<h3 className="text-3xl my-1 text-slate-900 dark:text-slate-100 font-bold">
					{mariachiUp?.name}
				</h3>
				<p className="text-xs text-slate-700 dark:text-slate-400 font-light">
					{mariachiUp?.description}
				</p>
				<div className="px-4 py-4">
					<h5 className="mx-0 font-thin flex">
						<AddressIcon className="fill-slate-900 dark:fill-slate-100 w-7 h-7" />{" "}
						<span className="ml-5 text-slate-900 dark:text-slate-100">
							{mariachiUp?.address}
						</span>
					</h5>
					<h5 className="mx-0 font-thin flex">
						<CoordinatorIcon className="fill-slate-900 dark:fill-slate-100 w-7 h-7" />{" "}
						<span className="ml-5 text-slate-900 dark:text-slate-100">
							{" "}
							{coordinator?.name}{" "}
						</span>
					</h5>
					<div className="pl-1 flex justify-start items-center">
						<PricesIcon className="fill-slate-900 dark:fill-slate-100 w-7 h-7" />{" "}
						<div className="mx-4">
							<h5 className="text-xs font-mono text-slate-900 dark:text-slate-100 ">
								<span>Serenata:</span> ${mariachiUp?.service?.serenata}
							</h5>
							<h5 className="text-xs font-mono text-slate-900 dark:text-slate-100">
								<span>Hora:</span> ${mariachiUp?.service?.hora}
							</h5>
							<h5 className="text-xs font-mono text-slate-900 dark:text-slate-100">
								<span>Contrato:</span> ${mariachiUp?.service?.contract}
							</h5>
						</div>
						<MembersIcon className="ml-10 fill-slate-900 dark:fill-slate-100 w-7 h-7" />{" "}
						<h6 className="mx-4  px-2 text-slate-900 dark:text-slate-100">
							{mariachiUp?.members || "?"}
						</h6>
					</div>

					{/* <div className="relative pt-1">
						<div className="flex mb-2 items-center justify-between">
							<div>
								<span className="text-xs font-semibold py-1 px-2 uppercase rounded-full text-pink-600 bg-pink-200 flex justify-between items-center ">
									<CategoriesIcon className="fill-slate-900 dark:fill-slate-100 w-5 h-5" />
									Categoria
								</span>
							</div>
							<div className="text-right">
								<span className="text-xs font-semibold inline-block text-pink-600">
									basico
								</span>
							</div>
						</div>
						<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-pink-200"></div>
					</div> */}

					<div className="relative pt-1 mt-5">
						<div className="flex mb-2 items-center justify-between">
							<CategoriesIcon className="fill-slate-900 dark:fill-slate-100 w-4 h-4 mr-2" />
							<div className="text-right">
								<span className="text-xs font-semibold text-slate-900 dark:text-slate-100 flex">
									{mariachiUp?.categorySet}
								</span>
							</div>
						</div>
						<div className="overflow-hidden  h-2 mb-4 text-xs flex rounded bg-purple-200">
							<div
								className={`${
									mariachiUp?.categorySet === "Normal"
										? "w-8/12"
										: mariachiUp?.categorySet === "Basico"
										? "w-2/6"
										: "w-full"
								} shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500`}
							></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default MariachiCard
