import { useEffect } from "react"
import { getSession } from "next-auth/react"

import Layout from "../components/Layout"
import MariachiForbiden from "../components/SVG/Icons/MariachiForbiden"

//import axios from "axios"
import { wrapper } from "../../store"
import {
	addNewUser,
	fetchUsersNew,
	selectUserAdmin,
	selectUserUpdate,
} from "../../store/features/users/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { fetchMariachis } from "store/features/mariachis/mariachiSlice"
import { fetchBookings } from "store/features/bookings/bookingSlice"

export default function Home() {
	const userAdmin = useSelector(selectUserAdmin)
	const userUpdate = useSelector(selectUserUpdate)
	const dispatch = useDispatch()

	console.log("update", userUpdate)

	useEffect(() => {
		if (!userAdmin.exist) {
			const dataRegister = async () => {
				await dispatch(addNewUser(userAdmin))
				// try {
				// 	await axios.post("/api/users/add", userAdmin)
				// } catch (error) {
				// 	console.log(error)
				// }
			}

			dataRegister()
		}
	}, [])

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
		// if(store.getState(selectUserAdmin.users.admin ==={}){
		// 			await store.dispatch(fetchUsers(session))

		// }

		const session = await getSession(ctx)

		//store.dispatch(setUsers(users))
		await store.dispatch(fetchUsersNew(session))

		await store.dispatch(fetchMariachis(true))
		await store.dispatch(fetchBookings(true))

		console.log("entramos de new")

		if (!session)
			return {
				redirect: {
					destination: "/signin",
					permanent: false,
				},
			}

		return {
			props: {},
		}
	}
)
