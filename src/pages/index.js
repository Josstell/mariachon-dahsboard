import { useEffect } from "react"
import { getSession, useSession } from "next-auth/react"

import Layout from "../components/Layout"
import MariachiForbiden from "../components/SVG/Icons/MariachiForbiden"

//import axios from "axios"
import { wrapper } from "../../store"
import {
	addNewUser,
	fetchUsersNew,
	selectUserAdmin,
} from "../../store/features/users/userSlice"
import { useDispatch, useSelector } from "react-redux"
import Agenda from "src/components/Agenda"
import { getBookingsByDate } from "store/features/bookingsApi"
import { getDateAvantAndBefore } from "src/helpers/utils"
import dayjs from "dayjs"
import { getBookingsByQuery } from "@lib/sanity"

export default function Home() {
	const userAdmin = useSelector(selectUserAdmin)



	//const userUpdate = useSelector(selectUserUpdate)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!userAdmin.exist) {
			dispatch(addNewUser(userAdmin))
		}
	}, [])

	return (
		<Layout>
			{userAdmin.isAdmin ? (
				<div className="no-scrollbar overflow-auto h-full w-full">
				<Agenda />
				</div>
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
		if (!session) {
			return {
				redirect: {
					destination: "/signin",
					permanent: false,
				},
			}
		}

		if (!store.getState().users.users.length) {
			await store.dispatch(fetchUsersNew(session))
		}

		const today = getDateAvantAndBefore(dayjs(new Date()))


		await store.dispatch(
			getBookingsByDate.initiate(getBookingsByQuery(today.before, today.after))
		)
		// await store.dispatch(fetchBookings(true))

		return {
			props: {},
		}
	}
)
