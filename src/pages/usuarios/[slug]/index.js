import client from "@lib/sanity"
import { groq } from "next-sanity"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import AdminCard from "src/components/Cards/AdminCard"
import AdminForm from "src/components/Forms/AdminForm"
import Layout from "src/components/Layout"
import SpinnerGral from "src/components/Spinners/SpinnerGral"
import MariachiForbiden from "src/components/SVG/Icons/MariachiForbiden"
import { wrapper } from "store"
import { selectUserAdmin } from "store/features/users/userSlice"

const userById = ({ data }) => {
	const router = useRouter()
	console.log("datos de usuario: ", data)

	const [editCard, setEditCard] = useState(false)
	const userAdmin = useSelector(selectUserAdmin)
	const dispatch = useDispatch()

	// useEffect(() => {
	// 	if (!userAdmin.exist) {
	// 		const reloadUsers = async () => {
	// 			//await dispatch(fetchUsers(session))
	// 		}
	// 		reloadUsers()
	// 		//	router.push("/")
	// 	}
	// }, [userAdmin, dispatch])

	if (!userAdmin.exist || router.isFallback) {
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
							<AdminForm />
						</div>
						<div
							className={
								editCard ? "w-11/12	 md:w-2/5  h-[80vh] md:h-3/5" : "w-3/4 h-3/5"
							}
						>
							<AdminCard setEditCard={setEditCard} editCard={editCard} />
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
		},

		//	props: { data: data[0] }, // will be passed to the page component as props
	}
})
