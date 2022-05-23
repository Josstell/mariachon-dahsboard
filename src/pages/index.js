import { useEffect, useState } from "react"
import { getSession } from "next-auth/react"

import Layout from "../components/Layout"
import MariachiForbiden from "../components/SVG/Icons/MariachiForbiden"

import client from "@lib/sanity"
import { groq } from "next-sanity"
import axios from "axios"

const query = groq`
*[_type == "user"]
`

export default function Home({ session, users, userAd }) {
	const [userAdmin, setUserAdmin] = useState({})
	const [isAdmin, setIsAdmin] = useState(false)
	const [error, setError] = useState("")
	const {
		user: { email },
	} = session
	console.log("data users:", session)
	console.log("data user:", users)

	useEffect(() => {
		if (!userAd) {
			const dataRegister = async () => {
				try {
					const userData = await axios.post("/api/users/add", session.user)
					setUserAdmin(userData.data)
				} catch (error) {
					setError(error.response.data)
				}
			}
			dataRegister()
		} else {
			setUserAdmin(userAd)

			const admin = userAd.categorySet.find((category) => category === "admin")
			console.log("is admins", admin)
			setIsAdmin(admin)
		}
	}, [session.user, setUserAdmin])

	console.log("despues del guardar en sanity: ", userAdmin)
	console.log("erore", error)

	return (
		<Layout>
			{isAdmin ? (
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

export async function getServerSideProps(context) {
	const preview = false
	const session = await getSession(context)
	const users = await client.fetch(query)

	const userAdmin = users.find((user) => user.email === session.user.email)

	console.log("get: ", userAdmin)

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
				user: { ...session.user, provider: "Google", categorySet: ["client"] },
				expires: session.expires,
			},
			users: users,
			userAd: userAdmin || null,
		},
	}
}
