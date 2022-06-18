import { ChevronDownIcon } from "@heroicons/react/outline"

export function Input({
	register,
	errors,
	name,
	label,
	hidden,
	params,
	...rest
}) {
	return (
		<>
			<div
				className={`w-full items-center  py-2 border-teal-500  border-b my-2 ${
					!hidden && "hidden"
				} `}
			>
				<label className="block uppercase tracking-wide text-gray-700 dark:text-slate-50 text-[10px] font-bold mb-2">
					{label}
				</label>
				<input
					{...register(name, params)}
					{...rest}
					className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-slate-50 mr-3 py-1 px-2 leading-tight focus:outline-none"
				/>
			</div>
			{name === "name" && errors?.name ? (
				<span className="text-red-500 text-[10px]">Nombre requerido</span>
			) : null}

			{name === "tel" && errors?.tel?.type === "pattern" ? (
				<span className="text-red-500 text-[10px]">
					Por favor introduce solo numeros del 0-9. <br />
				</span>
			) : null}
			{name === "tel" &&
			(errors?.tel?.type === "minLength" ||
				errors?.tel?.type === "maxLength") ? (
				<span className="text-red-500 text-[10px]">
					El numéro tiene que ser de 10 cifras. <br />
				</span>
			) : null}
			{name === "tel" && errors?.tel ? (
				<span className="text-red-500 text-[10px]">
					Número celular es requerido.
				</span>
			) : null}

			{name === "email" && errors?.email?.type === "pattern" ? (
				<span className="text-red-500 text-[10px]">
					Correo no valido. <br />
				</span>
			) : null}
		</>
	)
}

export function Checkbox({ register, name, hidden, ...rest }) {
	return (
		<div
			className={`flex w-full justify-evenly items-start  my-6 ${
				!hidden && "hidden"
			}`}
		>
			{name.map((item, index) => (
				<div className="w-25" key={index}>
					<label className="  text-slate-900 dark:text-slate-50 font-bold px-2">
						<input
							{...register(item)}
							{...rest}
							className="mr-2 leading-tight"
							type="checkbox"
							value={item}
						/>
						<span className="text-xs">{item}</span>
					</label>
				</div>
			))}
		</div>
	)
}

export function RadioButton({ register, name, label, hidden, ...rest }) {
	return (
		<div className={`flex justify-center items-center ${!hidden && "hidden"}`}>
			<div className="bg-gray-200 rounded-lg ">
				{label.map((labe, i) => (
					<div key={i} className={`inline-flex rounded-lg `}>
						<input
							className="peer"
							{...register(name)}
							{...rest}
							id={labe + "Mariachi"}
							value={labe}
							hidden
						/>
						<label
							htmlFor={labe + "Mariachi"}
							className="bg-slate-200 text-slate-900 peer-checked:text-slate-50  peer-checked:bg-green-600  text-center self-center py-2 px-4 rounded-lg cursor-pointer hover:opacity-75"
						>
							{labe}
						</label>
					</div>
				))}

				{/* <div className="inline-flex rounded-lg">
					<input
						className="peer"
						{...register(name)}
						{...rest}
						id="normalMariachi"
						value={"Normal"}
						hidden
					/>
					<label
						htmlFor="normalMariachi"
						className="bg-slate-200 text-slate-900 peer-checked:text-slate-50 peer-checked:bg-green-600 text-center self-center py-2 px-4 rounded-lg cursor-pointer hover:opacity-75"
					>
						{label[1]}
					</label>
				</div>
				<div className="inline-flex rounded-lg">
					<input
						className="peer"
						{...register(name)}
						{...rest}
						id="premiumMariachi"
						value={"Premium"}
						hidden
					/>
					<label
						htmlFor="premiumMariachi"
						className="bg-slate-200 text-slate-900 peer-checked:text-slate-50 peer-checked:bg-green-600 text-center self-center py-2 px-4 rounded-lg cursor-pointer hover:opacity-75"
					>
						{label[2]}
					</label>
				</div> */}
			</div>
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
				{options.map((val) => (
					<option
						key={val._id || val.clave || val._ref}
						value={val._id || val.clave || val._ref}
					>
						{val.name}
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
