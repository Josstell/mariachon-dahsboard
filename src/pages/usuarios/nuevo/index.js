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
	selectStatusGSUser,
	selectStatusUser,
	selectUserAdmin,
	setStatusGSUser,
	setStatusUser,
} from "store/features/users/userSlice"

import { nanoid } from "@reduxjs/toolkit"
import { useRouter } from "next/router"
import { dateGral, optionsDate } from "src/helpers/utils"
import SpinnerLogo from "src/components/Spinners/SpinnerLogo"

const addnewuser = () => {
	const [loading, setLoading] = useState(false)
	const [editCard, setEditCard] = useState(false)

	const router = useRouter()

	const userAdmin = useSelector(selectUserAdmin)
	const status = useSelector(selectStatusUser)
	const statusGSUser = useSelector(selectStatusGSUser)

	const error = useSelector(selectError)

	const dispatch = useDispatch()

	const data = {}

	const methods = useForm()

	const { setValue, watch } = methods

	useEffect(() => {
		if (!userAdmin.exist) {
			router.push("/usuarios")
		}
		dispatch(setStatusUser("idle"))
		setValue("name", "")
		setValue("username", "")
		setValue("tel", "")
		setValue("email", "")
		setValue("region", "PUE")
		setValue("Cliente", "Cliente")
	}, [])

	let toastIdUs

	const notifyError = () => toast.error(error, { id: toastIdUs })
	const notifySuccess = () =>
		toast.success("Usuario actualizado correctamente", { id: toastIdUs })

	useEffect(() => {
		if (status === "failed" || statusGSUser === "failed") {
			toast.dismiss(toastIdUs)

			notifyError()
			dispatch(setStatusUser("idle"))
			dispatch(setStatusGSUser("idle"))
			setLoading(false)
		}
		if (status === "succeeded" && statusGSUser === "succeeded") {
			toast.dismiss(toastIdUs)

			dispatch(setStatusUser("idle"))
			dispatch(setStatusGSUser("idle"))

			notifySuccess()
			setLoading(false)

			setTimeout(() => router.push("/usuarios"), 1000)
		}
	}, [status, statusGSUser, error, notifyError, dispatch, router])

	const onSubmit = (dataFormUser) => {
		setLoading(true)
		toastIdUs = toast.loading("Cargando...")

		const data = {
			...dataFormUser,
			categorySet: [
				dataFormUser.Cliente,
				dataFormUser.Mariachi,
				dataFormUser.Coordinador,
				dataFormUser.Admin,
			],
			createdBy: { _ref: userAdmin._id, _type: "reference" },
			dateCreated: dateGral.toLocaleDateString("es-MX", optionsDate),
			stage: ["PROSPECTO"],
			username:
				dataFormUser.username === ""
					? dataFormUser.name.split(" ").join("").toLocaleLowerCase()
					: dataFormUser.username,
		}

		const dataNew = {
			...data,
			email:
				data.email === "" ? `noemail${nanoid()}@mariachon.com.mx` : data.email,
			categorySet:
				data?.categorySet === undefined
					? []
					: data?.categorySet?.filter((cat) => cat !== false),
		}
		dispatch(addNewUser(dataNew))
	}

	const userUpdat = {
		name: watch("name"),
		username: watch("username"),
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
	if (!userAdmin.exist) {
		return <SpinnerLogo />
	}

	return (
		<Layout>
			{userAdmin.isAdmin ? (
				<div className={`no-scrollbar overflow-auto w-full h-full  `}>
					<div
						className={`no-scrollbar overflow-auto   h-full md:h-full flex flex-col md:flex-row 
							justify-evenly items-center`}
					>
						<div className="w-4/12 h-fit min-w-[370px]  md:min-h-full px-3">
							{/* <UserForm />  Formulario */}
							<div className="mt-96 m-auto md:m-0">
								<UserForm
									methods={methods}
									data={{ ...data, button: "Crear nuevo" }}
									onSubmit={onSubmit}
									loading={loading}
								/>
							</div>

							<Toaster />
						</div>
						<div className={"w-full h-full md:w-4/12 md:h-5/6	 "}>
							<div className="mb-5 m-auto md:m-0">
								<UserCard
									setEditCard={setEditCard}
									editCard={editCard}
									userUpdat={userUpdat}
								/>
							</div>
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
