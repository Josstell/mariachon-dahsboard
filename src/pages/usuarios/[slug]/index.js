import client from "@lib/sanity"
import { getSession } from "next-auth/react"
import { groq } from "next-sanity"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import UserCard from "src/components/Cards/UserCard"
import UserForm from "src/components/Forms/UserForm"
import Layout from "src/components/Layout"
import SpinnerLogo from "src/components/Spinners/SpinnerLogo"
import MariachiForbiden from "src/components/SVG/Icons/MariachiForbiden"
import { wrapper } from "store"
import {
	selectUserAdmin,
	setUserUpdate,
	updateUser,
} from "store/features/users/userSlice"

const userById = ({ data }) => {
	const [loading, setLoading] = useState(false)

	const router = useRouter()
	const dispatch = useDispatch()

	const [editCard, setEditCard] = useState(false)

	const userAdmin = useSelector(selectUserAdmin)

	const methods = useForm()

	const { setValue, watch } = methods

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
		setValue("region", data?.region || "")
		// 		//
	}, [])

	const onSubmit = (dataForm) => {
		setLoading(true)

		console.log(dataForm)

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
				modifiedBy: { _ref: userAdmin._id, _type: "reference" },
			})
		)
		setLoading(false)

		router.push("/usuarios")
	}

	const userUpdat = {
		name: watch("name"),
		tel: watch("tel"),
		email: watch("email"),
		region: watch("region"),
		categorySet: data?.categorySet || "",
	}

	if (!userAdmin.exist || router.isFallback) {
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
						<div
							className={`no-scrollbar md:w-5/12 h-fit md:h-full mb-5 md:mb-0 flex justify-center items-center`}
						>
							{/* <UserForm />  Formulario */}

							<UserForm
								methods={methods}
								data={data}
								onSubmit={onSubmit}
								loading={loading}
							/>
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
  city,
  region
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
