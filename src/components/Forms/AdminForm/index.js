import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { useForm } from "react-hook-form"
import { setUserUpdate, updateUser } from "store/features/users/userSlice"
import { useRouter } from "next/router"

const AdminForm = () => {
	const router = useRouter()
	const userAdmin = useSelector((state) => state.users.admin)
	const loading = useSelector((state) => state.users.status)

	const dispatch = useDispatch()

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm()

	const userUpdate = {
		name: watch("name"),
		tel: watch("tel"),
		email: watch("email"),
		city: watch("city"),
	}

	dispatch(setUserUpdate(userUpdate))

	useEffect(() => {
		setValue("name", userAdmin.name)
		setValue("tel", userAdmin.tel)
		setValue("email", userAdmin.email)
		setValue("city", userAdmin?.city || "")
	}, [])

	const onSubmit = (data) => {
		console.log("despues del formulario...", data)

		//Creando variable session para recargar datos

		dispatch(setUserUpdate({ ...data, _id: userAdmin._id }))
		dispatch(updateUser({ ...data, _id: userAdmin._id }))

		router.push("/")
	}

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
					type="tel"
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
			{/* 			
			<div className="w-full items-center  py-2 border-teal-500  border-b my-2">
				<label className="block uppercase tracking-wide text-gray-700 dark:text-slate-50 text-[10px] font-bold mb-2">
					Dirección
				</label>
				<input
					{...register("address", { required: false })}
					className="appearance-none bg-transparent border-none w-full text-gray-700 dark:text-slate-50 mr-3 py-1 px-2 leading-tight focus:outline-none"
					type="text"
					placeholder="Dirección"
				/>
			</div> */}

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
			>
				Actualizar datos
			</button>
			{/* {loading === "loading" && (
				<div className="flex items-center justify-center space-x-2 animate-pulse">
					<div className="w-8 h-8 bg-blue-400 rounded-full"></div>
					<div className="w-8 h-8 bg-blue-400 rounded-full"></div>
					<div className="w-8 h-8 bg-blue-400 rounded-full"></div>
				</div> 
			)}*/}
		</form>
	)
}

export default AdminForm
