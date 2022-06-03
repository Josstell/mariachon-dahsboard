import React, { useEffect, useState } from "react"

import { getSession } from "next-auth/react"
import MariachiForbiden from "../../components/SVG/Icons/MariachiForbiden"
import { wrapper } from "../../../store"
import { useDispatch, useSelector } from "react-redux"
import {
	fetchUsersNew,
	selectUserAdmin,
	setUserUpdate,
	updateUser,
} from "../../../store/features/users/userSlice"
import Layout from "src/components/Layout"
import SpinnerGral from "src/components/Spinners/SpinnerGral"
import AdminCard from "src/components/Cards/AdminCard"
import AdminForm from "src/components/Forms/AdminForm"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

//const Layout = dynamic(() => import("../../components/Layout"), { ssr: false })

const perfil = ({ session }) => {
	const [editCard, setEditCard] = useState(false)
	const userAdmin = useSelector(selectUserAdmin)
	const dispatch = useDispatch()

	const router = useRouter()

	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (!userAdmin.exist) {
			const reloadUsers = async () => {
				await dispatch(fetchUsersNew(session))
			}
			reloadUsers()
			//	router.push("/")
		}
	}, [])

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

	useEffect(() => {
		setValue("name", userAdmin.name)
		setValue("tel", userAdmin.tel)
		setValue("email", userAdmin.email)
		setValue("city", userAdmin?.city || "")
	}, [])

	const onSubmit = (data) => {
		setLoading(true)
		console.log("despues del formulario...", data)

		//Creando variable session para recargar datos

		dispatch(setUserUpdate({ ...data, _id: userAdmin._id }))
		dispatch(updateUser({ ...data, _id: userAdmin._id }))
		setLoading(false)

		router.push("/")
	}

	if (!userAdmin.exist) {
		return <SpinnerGral />
	}

	return (
		<Layout>
			{userAdmin.isAdmin ? (
				<div className={`no-scrollbar overflow-auto h-full  `}>
					<div
						className={`no-scrollbar overflow-auto  h-full  flex flex-col md:flex-row ${
							editCard ? "justify-evenly h-fit md:h-full" : "justify-center"
						}   items-center`}
					>
						<div
							className={` ${
								editCard ? "block" : "hidden"
							} no-scrollbar w-10/12	 md:w-2/5 h-fit md:h-full mb-5 md:mb-0 flex justify-center items-center`}
						>
							<AdminForm
								register={register}
								handleSubmit={handleSubmit}
								onSubmit={onSubmit}
								setValue={setValue}
								watch={watch}
								errors={errors}
								loading={loading}
							/>
						</div>
						<div
							className={
								editCard ? "w-11/12	 md:w-2/5  h-[80vh] md:h-3/5" : "w-3/4 h-3/5"
							}
						>
							<AdminCard
								setEditCard={setEditCard}
								editCard={editCard}
								userUpdate={userUpdate}
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

export default perfil

export const getServerSideProps = wrapper.getServerSideProps(
	() => async (ctx) => {
		const session = await getSession(ctx)

		if (!session) {
			return {
				redirect: {
					destination: "/signin",
					permanent: false,
				},
			}
		}

		return {
			props: { session: session },
		}
	}
)
