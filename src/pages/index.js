import { useEffect, useState } from "react"
import { getSession } from "next-auth/react"

import Layout from "../components/Layout"
import MariachiForbiden from "../components/SVG/Icons/MariachiForbiden"

import client from "@lib/sanity"
import { groq } from "next-sanity"
import axios from "axios"
import { wrapper } from "../../store"
import {
	fetchUsers,
	selectError,
	selectStatus,
	selectUserAdmin,
} from "../../store/features/users/userSlice"
import { useSelector } from "react-redux"

const query = groq`
*[_type == "user"]
`

export default function Home(props) {
	const userAdmin = useSelector(selectUserAdmin)
	const userStatus = useSelector(selectStatus)
	const errorUs = useSelector(selectError)

	useEffect(() => {
		if (!userAdmin.exist) {
			const dataRegister = async () => {
				try {
					await axios.post("/api/users/add", userAdmin)
				} catch (error) {
					console.log(error)
				}
			}

			dataRegister()
		}
	}, [userAdmin])

	return (
		<Layout>
			{userAdmin.isAdmin ? (
				<h3>Tienes derechos de usuario</h3>
			) : (
				<>
					<MariachiForbiden className="w-40 fill-slate-900 dark:fill-slate-50" />
					<p className="">Usted no esta autorizado para usar esta app.</p>
				</>
			)}
		</Layout>
	)
}

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (ctx) => {
		const session = await getSession(ctx)

		//store.dispatch(setUsers(users))
		await store.dispatch(fetchUsers(session))

		if (!session)
			return {
				redirect: {
					destination: "/signin",
					permanent: false,
				},
			}

		return {
			props: {
				session: {
					user: {
						...session.user,
						provider: "Google",
						categorySet: ["client"],
						expires: session.expires,
					},
				},
			},
		}
	}
)
