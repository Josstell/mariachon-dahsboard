import client from "@lib/sanity"
import { getSession } from "next-auth/react"
import { groq } from "next-sanity"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import UserCard from "src/components/Cards/UserCard"
import Layout from "src/components/Layout"
import SpinnerGral from "src/components/Spinners/SpinnerGral"
import SpinnerLoadign from "src/components/Spinners/SpinnerLoading"
import MariachiForbiden from "src/components/SVG/Icons/MariachiForbiden"
import { wrapper } from "store"
import {
	selectUserAdmin,
	setUserUpdate,
	updateUser,
} from "store/features/users/userSlice"

const userById = ({ data }) => {
	const router = useRouter()
	const dispatch = useDispatch()

	console.log("data usuer a actualizar: ", data)

	const [loading, setLoading] = useState(false)

	const [editCard, setEditCard] = useState(false)

	const userAdmin = useSelector(selectUserAdmin)

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm()

	useEffect(() => {
		if (data) {
			dispatch(setUserUpdate(data))
		}
		if (!userAdmin.exist) {
			router.push("/")
		}
		setValue("name", data.name)
		setValue("tel", data.tel)
		setValue("email", data.email)
		setValue("city", data?.city || "")
		// 		//
	}, [])

	const onSubmit = (dataForm) => {
		setLoading(true)
		console.log("despues del formulario...", dataForm)

		//Creando variable session para recargar datos

		dispatch(
			setUserUpdate({
				...dataForm,
				_id: data._id,
				categorySet: data?.categorySet || "",
			})
		)
		dispatch(
			updateUser({
				...dataForm,
				_id: data._id,
				categorySet: data?.categorySet || "",
			})
		)
		// setLoading(false)

		router.push("/usuarios")
	}

	const userUpdat = {
		name: watch("name"),
		tel: watch("tel"),
		email: watch("email"),
		city: watch("city"),
		categorySet: data?.categorySet || "",
	}

	if (!userAdmin.exist || router.isFallback) {
		return <SpinnerGral />
	}

	return (
		<Layout>
			{userAdmin.isAdmin ? (
				<div className={`no-scrollbar overflow-auto w-full h-full  `}>
					<div
						className={`no-scrollbar overflow-auto   h-full md:h-full flex flex-col md:flex-row 
							justify-evenly items-center`}
					>
						<div
							className={`no-scrollbar md:w-5/12 h-fit md:h-full mb-5 md:mb-0 flex justify-center items-center`}
						>
							{/* <UserForm />  Formulario */}
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
										<span className="text-red-500 text-[10px]">
											Nombre requerido
										</span>
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
						</div>
						<div className={"md:w-5/12 h-3/5"}>
							<UserCard
								setEditCard={setEditCard}
								editCard={editCard}
								userUpdat={userUpdat}
							/>
						</div>
					</div>
				</div>
			) : (
				<>
					<MariachiForbiden className="w-80 fill-slate-900 dark:fill-slate-50" />
					<p className="">
						Usted no esta autorizado para usar esta app (users).
					</p>
				</>
			)}
		</Layout>
	)
}

export default userById

export async function getStaticPaths() {
	const query = groq`
*[_type == "user"]{
	_id,
	slug,
}
`
	const users = await client.fetch(query)

	const paths = users.map((path) => ({
		params: { slug: path._id.toString() },
	}))

	console.log("links: ", paths)

	return { paths: paths, fallback: true }
}

export const getStaticProps = wrapper.getStaticProps(() => async (ctx) => {
	const query = groq`*[_type == "user" && _id == $id][0]{
  _id,
  categorySet,
  email,
  name,
  tel,
  city
}
	`

	const session = await getSession(ctx)

	const users = await client.fetch(query, {
		id: ctx.params.slug,
	})

	// const data = users.filter((est) => est._id.toString() === ctx.params.slug)

	// const data = await store
	// 	.dispatch(selectAllUsers())
	// 	.filter((est) => est.slug.toString() === params.slug)

	return {
		props: {
			data: users,
			session: session,
		},

		//	props: { data: data[0] }, // will be passed to the page component as props
	}
})
