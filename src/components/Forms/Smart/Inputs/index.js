import { ChevronDownIcon, UserAddIcon } from "@heroicons/react/outline"
import { PlusIcon, TrashIcon } from "@heroicons/react/solid"
import { useState } from "react"
import { Controller, useFieldArray, useWatch } from "react-hook-form"
import PricesIcon from "src/components/SVG/Icons/PricesIcon"

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

export function RadioButton({
	register,
	name,
	label,
	hidden,
	colorsEtapes,
	...rest
}) {
	return (
		<div
			className={`flex mt-5 justify-center items-center ${!hidden && "hidden"}`}
		>
			<div className="bg-gray-200 rounded-lg ">
				{label.map((labe, i) => {
					let colorBlock = colorsEtapes ? colorsEtapes[labe] : null

					let cssColor = `peer-checked:bg-[${colorBlock}]`
					return (
						<div key={i} className={`inline-flex rounded-lg `}>
							<input
								className="peer "
								{...register(name)}
								{...rest}
								id={labe + "Mariachi"}
								value={labe}
								hidden
							/>
							<label
								htmlFor={labe + "Mariachi"}
								className={`bg-slate-200 text-slate-900 peer-checked:text-slate-50  ${
									colorsEtapes ? cssColor : "peer-checked:bg-green-600"
								} text-xs font-bold  text-center self-center py-2 px-2 rounded-lg cursor-pointer hover:opacity-75`}
							>
								{labe}
							</label>
						</div>
					)
				})}

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

export function Select({
	register,
	options,
	name,
	label,
	hidden,
	addUser,
	setAddUser,
	setRole,
	...rest
}) {
	const [userAdd] = useState(addUser)
	const handleAddUser = () => {
		setRole(label)
		setAddUser(!addUser)
	}
	return (
		<div
			className={`w-full flex justify-between items-end  py-2  my-2   ${
				!hidden && "hidden"
			}`}
		>
			<div className="w-11/12 relative">
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
			{userAdd && (
				<UserAddIcon
					className="w-5 mb-2 cursor-pointer"
					onClick={() => handleAddUser()}
				/>
			)}
		</div>
	)
}

export function Button({ message, hidden, disabledBtn }) {
	return (
		<div className={`${!hidden && "hidden"} my-10`}>
			<button
				className={`first-letter:my-10 mb:mt-0 w-full  ${
					!disabledBtn
						? "bg-teal-500  border-teal-500 hover:border-teal-700 hover:bg-teal-700 dark:text-white"
						: "bg-teal-300  border-teal-300 dark:text-gray"
				}text-sm border-2  py-1 px-2 rounded `}
				type="submit"
				disabled={disabledBtn}
			>
				{disabledBtn ? message + "..." : message}
			</button>
		</div>
	)
}

export function SelectSimple({
	name,
	hidden,
	options,
	booking,
	handleWhatsApp,
	handleGral,
	tableSize,
}) {
	return (
		<div
			className={`w-full flex justify-between items-end relative  py-1  my-1   ${
				!hidden && "hidden"
			}`}
		>
			<select
				className={`block appearance-none w-full bg-slate-400/50 border-none text-gray-700 dark:text-slate-50  border-gray-400 hover:border-gray-500 px-1 py-1 pr-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline 
					${tableSize ? "text-xs" : null}`}
				name={name}
				onChange={
					handleWhatsApp
						? (e) => handleWhatsApp(booking, e.target.value)
						: handleGral
				}
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
			<div className="pointer-events-none absolute inset-y-0 top-0 right-0 flex items-center   px-0 text-slate-900 dark:text-slate-50">
				<ChevronDownIcon className="w-5  cursor-pointer" />
			</div>
		</div>
	)
}

export function RadioButtonSimple({ name, label, hidden, handleServices }) {
	return (
		<div
			className={`flex mt-2 justify-center items-center ${!hidden && "hidden"}`}
		>
			<div className="bg-gray-200 rounded-lg ">
				{label.map((labe, i) => {
					return (
						<div key={i} className={`inline-flex rounded-lg -my-0`}>
							<input
								className="peer "
								name={name}
								id={labe + "Mariachi"}
								value={labe}
								type="radio"
								hidden={hidden}
								onChange={handleServices}
							/>
							<label
								htmlFor={labe + "Mariachi"}
								className={`bg-slate-200 text-[10px] font-bold text-slate-900 peer-checked:text-slate-50 peer-checked:bg-slate-900 text-center self-center py-2 p-1 rounded-lg cursor-pointer hover:opacity-75`}
							>
								{labe}
							</label>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export function MultipleInput({ register, name, keyNames, hidden, control }) {
	const value = useWatch({
		name: "services",
		control,
	})
	const defaulValues = { regular: 0, minimo: 0, festivo: 0 }

	const [countIndex, setcountIndex] = useState(value?.length || 0)

	const { fields, append, remove } = useFieldArray({
		control,
		name: name,
	})

	const handleAppend = () => {
		append(defaulValues)
		setcountIndex(countIndex === keyNames.length ? countIndex : countIndex + 1)
	}

	const handleRemove = (index) => {
		remove(index)
		setcountIndex(countIndex === 0 ? countIndex : countIndex - 1)
	}

	return (
		<div className={`w-11/12	  md:w-full py-2 px-5 ${!hidden && "hidden"}`}>
			<div className=" w-full flex flex-row justify-between items-center">
				<p>Precios</p>
				<div
					className="w-full flex flex-row justify-end items-center cursor-pointer"
					onClick={countIndex === keyNames.length ? null : handleAppend}
				>
					<PricesIcon className="fill-slate-900 dark:fill-slate-100 w-7 h-7" />
					<PlusIcon className="font-extrabold w-3 h-3 mx-1" />
				</div>
			</div>
			<ul className={`w-full`}>
				{fields.map((item, index) => {
					return (
						<li key={item.id}>
							<label className=" uppercase tracking-wide text-gray-700 dark:text-slate-50 text-[10px] font-bold mb-2 ">
								{keyNames[index]}
							</label>
							<div className="  flex flex-row justify-evenly items-center mt-2">
								<div className=" w-5/6	 flex flex-row justify-around items-center">
									<div className="w-1/4 relative  border-teal-500  border-b my-2">
										<span className="absolute -top-3 text-gray-50/50 text-xs left-0">
											regular
										</span>
										<input
											{...register(`${name}.${index}.regular`)}
											className="w-full appearance-none bg-transparent border-none  text-gray-700 dark:text-slate-50 mr-0 py-1 px-0 leading-tight focus:outline-none"
											type="number"
										/>
									</div>
									<div className="w-1/4 relative  border-teal-500  border-b my-2">
										<span className="absolute -top-3 text-gray-50/50 text-xs left-0">
											minimo
										</span>
										<input
											{...register(`${name}.${index}.minimo`)}
											className="w-full appearance-none bg-transparent border-none  text-gray-700 dark:text-slate-50 mr-0 py-1 px-0 leading-tight focus:outline-none"
											type="number"
										/>
									</div>

									<Controller
										render={({ field }) => (
											<div className="w-1/4 relative   border-teal-500  border-b my-2">
												<span className="absolute -top-3 text-gray-50/50 text-xs left-0">
													festivo
												</span>
												<input
													{...field}
													className="w-full appearance-none bg-transparent border-none  text-gray-700 dark:text-slate-50 mr-0 py-1 px-0 leading-tight focus:outline-none"
													type="number"
												/>
											</div>
										)}
										name={`${name}.${index}.festivo`}
										control={control}
									/>
								</div>
								<div className="w-1/6 	">
									<TrashIcon
										className="w-5 h-5"
										onClick={() => handleRemove(index)}
									/>
								</div>
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export function MultiInputSimple({ name, refs, label, hidden }) {
	return (
		<div className="w-screen md:w-full py-2 px-5">
			<label className=" uppercase tracking-wide text-gray-700 dark:text-slate-50 text-[10px] font-bold mb-2 ">
				{name}
			</label>
			<div className=" flex flex-row justify-around items-center">
				{label.map((lab, i) => {
					return (
						<div
							className={`w-1/4   border-teal-500  border-b my-2  ${
								!hidden && "hidden"
							} `}
							key={lab}
						>
							<input
								ref={refs[i]}
								className="appearance-none bg-transparent border-none  text-gray-700 dark:text-slate-50 mr-0 py-1 px-0 leading-tight focus:outline-none"
								placeholder={lab}
							/>
						</div>
					)
				})}
			</div>
		</div>
	)
}
