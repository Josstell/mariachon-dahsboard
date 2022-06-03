import React from "react"
import { ChevronDownIcon } from "@heroicons/react/outline"

export function Input({ register, name, label, hidden, ...rest }) {
	return (
		<div
			className={`w-full items-center  py-2 border-teal-500  border-b my-2 ${
				!hidden && "hidden"
			} `}
		>
			<label className="block uppercase tracking-wide text-gray-700 dark:text-slate-50 text-[10px] font-bold mb-2">
				{label}
			</label>
			<input
				{...register(name)}
				{...rest}
				className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-slate-50 mr-3 py-1 px-2 leading-tight focus:outline-none"
			/>
		</div>
	)
}

export function TextArea({ register, name, label, hidden, ...rest }) {
	return (
		<div
			className={`w-full items-center  py-2 border-teal-500  border-b my-2 				${
				!hidden && "hidden"
			}
`}
		>
			<label className="block uppercase tracking-wide text-gray-700 dark:text-slate-50 text-[10px] font-bold mb-2">
				{label}
			</label>
			<textarea
				{...register(name)}
				{...rest}
				className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-slate-50 mr-3 py-1 px-2 leading-tight focus:outline-none"
			/>
		</div>
	)
}

export function Select({ register, options, name, label, hidden, ...rest }) {
	return (
		<div
			className={`w-full items-center  py-2  my-2 relative ${
				!hidden && "hidden"
			}`}
		>
			<label className="block uppercase tracking-wide text-gray-700 dark:text-slate-50 text-[10px] font-bold mb-2">
				{label}
			</label>
			<select
				className="block appearance-none w-full bg-slate-400/50 border-none text-gray-700 dark:text-slate-50  border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
				{...register(name)}
				{...rest}
			>
				{options.map((value) => (
					<option key={value} value={value}>
						{value}
					</option>
				))}
			</select>
			<div className="pointer-events-none absolute inset-y-0 top-4 right-0 flex items-center   px-1 text-slate-900 dark:text-slate-50">
				<ChevronDownIcon className="w-5  cursor-pointer" />
			</div>
		</div>
	)
}

export function Button({ message }) {
	return (
		<button
			className=" my-10 mb:mt-0 w-full bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-2 dark:text-white py-1 px-2 rounded"
			type="submit"
		>
			{message}
		</button>
	)
}
