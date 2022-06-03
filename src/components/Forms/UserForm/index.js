import React from "react"

import SpinnerLoadign from "src/components/Spinners/SpinnerLoading"

const UserForm = ({ register, handleSubmit, onSubmit, errors, loading }) => {
	return (
		<form
			onSubmit={handleSubmit((data) => onSubmit(data))}
			className="w-full  flex flex-col justify-center items-center"
		>
			<div className="w-full items-center  py-2 border-teal-500  border-b my-2">
				<label className="block uppercase tracking-wide text-gray-700 dark:text-slate-50 text-[10px] font-bold mb-2">
					Nombre completo
				</label>
				<input
					{...register("name", { required: true })}
					className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-slate-50 mr-3 py-1 px-2 leading-tight focus:outline-none"
					type="text"
					placeholder="Nombre "
				/>
				{errors.name && (
					<span className="text-red-500 text-[10px]">Nombre requerido</span>
				)}
			</div>
			<div className="w-full items-center  py-2 border-teal-500  border-b my-2">
				<label className="block uppercase tracking-wide text-gray-700 dark:text-slate-50 text-[10px] font-bold mb-2">
					Télefono
				</label>
				<input
					{...register("tel", {
						required: true,
						pattern: /^[0-9\b]+$/i,
						minLength: 10,
						maxLength: 10,
					})}
					className="appearance-none bg-transparent border-none w-full text-gray-700  dark:text-slate-50 mr-3 py-1 px-2 leading-tight focus:outline-none"
					placeholder="Telefono"
				/>
				{errors.tel?.type === "pattern" && (
					<span className="text-red-500 text-[10px]">
						Por favor introduce solo numeros del 0-9. <br />
					</span>
				)}
				{(errors.tel?.type === "minLength" ||
					errors.tel?.type === "maxLength") && (
					<span className="text-red-500 text-[10px]">
						El numéro tiene que ser de 10 cifras. <br />
					</span>
				)}
				{errors.tel && (
					<span className="text-red-500 text-[10px]">
						Número celular es requerido.
					</span>
				)}
			</div>
			<div className="w-full items-center  py-2 border-teal-500  border-b my-2">
				<label className="block uppercase tracking-wide text-gray-700 dark:text-slate-50 text-[10px] font-bold mb-2">
					Email
				</label>
				<input
					{...register("email", {
						pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
					})}
					className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-slate-50 mr-3 py-1 px-2 leading-tight focus:outline-none"
					placeholder="Correo electrónico"
				/>
			</div>

			<div className="w-full items-center  py-2 border-teal-500  border-b my-2">
				<label className="block uppercase tracking-wide text-gray-700 dark:text-slate-50 text-[10px] font-bold mb-2">
					Ciudad o estado
				</label>
				<input
					{...register("city", { required: false })}
					className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-slate-50 mr-3 py-1 px-2 leading-tight focus:outline-none"
					type="text"
					placeholder="Ciudad o estado"
				/>
			</div>
			<button
				className=" my-10 mb:mt-0 w-3/5 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-2 text-white py-1 px-2 rounded"
				type="submit"
				disabled={loading}
			>
				Actualizar datos
			</button>
			{loading && <SpinnerLoadign />}
		</form>
	)
}

export default UserForm
