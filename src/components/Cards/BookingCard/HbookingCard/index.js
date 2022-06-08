import React from "react"

export default function HbookingCard() {
	return (
		<div className="lg:flex shadow rounded-lg border  border-gray-400">
			<div className="dark:bg-slate-200 rounded-lg lg:w-2/12 py-4 block h-full shadow-inner">
				<div className="text-center tracking-wide">
					<div className="dark:text-slate-900 font-bold text-4xl ">24</div>
					<div className="dark:text-slate-900 font-normal text-2xl">Sept</div>
				</div>
			</div>
			<div className="w-full  lg:w-11/12 xl:w-full px-1 dark:bg-slate-700 py-5 lg:px-2 lg:py-2 tracking-wide">
				<div className="flex flex-row lg:justify-start justify-center">
					<div className="dark:text-slate-100 font-medium text-sm text-center lg:text-left px-2">
						<i className="far fa-clock"></i> 1:30 PM
					</div>
					<div className="dark:text-slate-100 font-medium text-sm text-center lg:text-left px-2">
						Cliente : Jorge
					</div>
				</div>
				<div className="font-semibold dark:text-slate-50 text-xl text-center lg:text-left px-2">
					Mariachi 2000 de Puebla
				</div>

				<div className="flex">
					<div className="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
						Servicio: 1 Serenata
					</div>
					<div className="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
						precio: $
					</div>
				</div>
			</div>
			<div className="flex flex-row items-center w-full lg:w-1/3 bg-white lg:justify-end justify-center px-2 py-4 lg:px-0">
				<span className="tracking-wider text-gray-600 bg-gray-200 px-2 text-sm rounded leading-loose mx-2 font-semibold">
					Editar
				</span>
			</div>
		</div>
	)
}
