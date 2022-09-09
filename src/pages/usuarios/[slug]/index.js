//import client from "@lib/sanity"
//import { groq } from "next-sanity"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import UserCard from "src/components/Cards/UserCard"
import UserForm from "src/components/Forms/UserForm"
import Layout from "src/components/Layout"
import SpinnerLoadign from "src/components/Spinners/SpinnerLoading"
import SpinnerLogo from "src/components/Spinners/SpinnerLogo"
import MariachiForbiden from "src/components/SVG/Icons/MariachiForbiden"
import { dateGral, optionsDate } from "src/helpers/utils"
import { wrapper } from "store"
import {
	selectAllUsers,
	selectError,
	selectStatusUser,
	selectUserAdmin,
	setStatusUser,
	setUserUpdate,
	updateUser,
} from "store/features/users/userSlice"

const userById = ({ id }) => {
	const users = useSelector(selectAllUsers)
	const [loading, setLoading] = useState(false)
	const [editCard, setEditCard] = useState(false)
	const [dataUser] = useState(users.find((user) => user._id === id))

	const router = useRouter()
	const dispatch = useDispatch()

	const userAdmin = useSelector(selectUserAdmin)

	const status = useSelector(selectStatusUser)
	const error = useSelector(selectError)

	const methods = useForm()

	const { setValue, watch } = methods

	useEffect(() => {
		if (dataUser === undefined) {
			router.push("/usuarios")
		}
	}, [])

	if (dataUser === undefined) {
		return <SpinnerLogo />
	}

	useEffect(() => {
		if (dataUser) {
			dispatch(setUserUpdate(dataUser))
		}
		if (!userAdmin.exist) {
			router.push("/")
		}
		setValue("name", dataUser.name)
		setValue("username", dataUser.username)

		setValue("tel", dataUser.tel)
		setValue("email", dataUser.email)
		setValue("region", dataUser?.region || "")

		setValue(
			"Cliente",
			dataUser.categorySet.find((cat) => cat === "Cliente")
		)
		setValue(
			"Mariachi",
			dataUser.categorySet.find((cat) => cat === "Mariachi")
		)
		setValue(
			"Coordinador",
			dataUser.categorySet.find((cat) => cat === "Coordinador")
		)
		setValue(
			"Admin",
			dataUser.categorySet.find((cat) => cat === "Admin")
		)
		// 		//
	}, [])

	const onSubmit = (dataForm) => {
		setLoading(true)

		//Creando variable session para recargar datos

		dispatch(
			setUserUpdate({
				...dataForm,
				_id: dataUser._id,
				categorySet: dataUser?.categorySet || "",
			})
		)
		dispatch(
			updateUser({
				...dataForm,
				_id: dataUser._id,
				categorySet: dataUser?.categorySet || "",
				modifiedBy: { _ref: userAdmin._id, _type: "reference" },
				dateModified: dateGral.toLocaleDateString("es-MX", optionsDate),
			})
		)
	}

	const notifyError = () => toast.error(error)
	const notifySuccess = () => toast.success("Datos actualizados correctamente")

	useEffect(() => {
		if (status === "failed") {
			notifyError()
			dispatch(setStatusUser("idle"))
		}
		if (status === "succeeded") {
			dispatch(setStatusUser("idle"))
			notifySuccess()

			setTimeout(() => router.push("/usuarios"), 1000)
		}
	}, [status, error, notifyError, dispatch, router])

	const userUpdat = {
		name: watch("name"),
		username: watch("username"),
		tel: watch("tel"),
		email: watch("email"),
		region: watch("region"),
		categorySet: dataUser?.categorySet[0] || "",
	}

	if (!userAdmin.exist || router.isFallback) {
		return <SpinnerLogo />
	}

	return (
		<Layout>
			{userAdmin.isAdmin ? (
				<div className={`no-scrollbar overflow-auto w-full  h-full  `}>
					<div
						className={`no-scrollbar overflow-auto h-[1024px] md:h-fit flex flex-col md:flex-row 
							justify-evenly items-center`}
					>
						<div className="w-4/12 h-fit min-w-[370px]  md:min-h-full">
							{/* <UserForm />  Formulario */}
							<div className="m-auto md:m-0">
								{!(status === "idle") ? (
									<SpinnerLoadign />
								) : (
									<UserForm
										methods={methods}
										data={dataUser}
										onSubmit={onSubmit}
										loading={loading}
									/>
								)}

								<Toaster />
							</div>
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

export default userById

// export async function getStaticPaths() {
// 	const query = groq`
// *[_type == "user"]{
// 	_id,
// 	slug,
// }
// `
// 	const users = await client.fetch(query)

// 	const paths = users.map((path) => ({
// 		params: { slug: path._id.toString() },
// 	}))

// 	console.log("links: ", paths)

// 	return { paths: paths, fallback: true }
// }

export const getServerSideProps = wrapper.getServerSideProps(
	() => async (ctx) => {
		// 		const query = groq`*[_type == "user" && _id == $id][0]{
		//   _id,
		//   categorySet,
		//   username,
		//   email,
		//   name,
		//   tel,
		//   city,
		//   region
		// }
		// 	`

		const session = await getSession(ctx)

		// const users = await client.fetch(query, {
		// 	id: ctx.params.slug,
		// })

		// const data = users.filter((est) => est._id.toString() === ctx.params.slug)

		// const data = await store
		// 	.dispatch(selectAllUsers())
		// 	.filter((est) => est.slug.toString() === params.slug)

		return {
			props: {
				//	data: users,
				id: ctx.params.slug,
				session: session,
			},

			//	props: { data: data[0] }, // will be passed to the page component as props
		}
	}
)
