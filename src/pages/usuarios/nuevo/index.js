import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import UserCard from "src/components/Cards/UserCard"
import UserForm from "src/components/Forms/UserForm"
import Layout from "src/components/Layout"

import toast, { Toaster } from "react-hot-toast"

import MariachiForbiden from "src/components/SVG/Icons/MariachiForbiden"
import {
	addNewUser,
	selectError,
	selectStatus,
	selectUserAdmin,
	setStatus,
} from "store/features/users/userSlice"

import { nanoid } from "@reduxjs/toolkit"
import { useRouter } from "next/router"

const addnewuser = () => {
	const [loading, setLoading] = useState(false)
	const [editCard, setEditCard] = useState(false)

	const router = useRouter()

	const userAdmin = useSelector(selectUserAdmin)
	const status = useSelector(selectStatus)
	const error = useSelector(selectError)

	const dispatch = useDispatch()

	const data = {}

	const methods = useForm()

	const { setValue, watch } = methods

	const notifyError = () => toast.error(error)
	const notifySuccess = () => toast.success("Datos creados correctamente")

	useEffect(() => {
		dispatch(setStatus("idle"))
		setValue("name", "")
		setValue("tel", "")
		setValue("email", "")
		setValue("region", "")
	}, [])

	useEffect(() => {
		if (status === "failed") {
			setLoading(false)
			notifyError()
			dispatch(setStatus("idle"))
		}
		if (status === "succeeded") {
			setLoading(false)
			notifySuccess()
			//dispatch(setStatus("idle"))
			router.push("/usuarios")
		}
	}, [router, status])

	const onSubmit = (dataFormUser) => {
		setLoading(true)

		const data = {
			...dataFormUser,
			categorySet: [
				dataFormUser.Cliente,
				dataFormUser.Mariachi,
				dataFormUser.Coordinador,
				dataFormUser.Admin,
			],
		}

		const dataUpdate = {
			...data,
			email:
				data.email === "" ? `noemail${nanoid()}@mariachon.com.mx` : data.email,
			categorySet:
				data?.categorySet === undefined
					? []
					: data?.categorySet?.filter((cat) => cat !== false),
		}
		console.log("formulario:  ", dataUpdate)

		dispatch(addNewUser(dataUpdate))
	}

	const userUpdat = {
		name: watch("name"),
		tel: watch("tel"),
		email: watch("email"),
		region: watch("region"),
		categorySet: [
			watch("Cliente"),
			watch("Mariachi"),
			watch("Coordinador"),
			watch("Admin"),
		],
	}

	console.log(userUpdat)

	return (
		<Layout>
			{userAdmin.isAdmin ? (
				<div className={`no-scrollbar overflow-auto w-full h-full  `}>
					<div
						className={`no-scrollbar overflow-auto   h-full md:h-full flex flex-col md:flex-row 
							justify-evenly items-center`}
					>
						<div
							className={`no-scrollbar md:w-2/4	w-5/12 h-fit md:h-full mb-5 md:mb-0 flex flex-col justify-center items-center`}
						>
							{/* <UserForm />  Formulario */}

							<UserForm
								methods={methods}
								data={{ ...data, button: "Crear nuevo" }}
								onSubmit={onSubmit}
								loading={loading}
							/>
							<Toaster />
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

export default addnewuser
