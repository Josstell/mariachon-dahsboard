import React, { useEffect } from "react"
import { getSession } from "next-auth/react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers, selectUserAdmin } from "store/features/users/userSlice"
import { wrapper } from "store"
import { fetchBookings } from "store/features/bookings/bookingSlice"
import Layout from "../../components/Layout"
import SpinnerGral from "src/components/Spinners/SpinnerGral"
import TableBookings from "src/components/Tables/TableBookings"

const reservas = ({ session }) => {
	const userAdmin = useSelector(selectUserAdmin)

	const dispatch = useDispatch()

	useEffect(() => {
		if (!userAdmin.exist) {
			const reloadUsers = async () => {
				await dispatch(fetchUsers(session))
			}
			reloadUsers()
		}
	}, [userAdmin, dispatch, session])

	if (!userAdmin.exist) {
		return <SpinnerGral />
	}

	return (
		<Layout>
			{userAdmin?.isAdmin ? (
				<div className="flex justify-center items-center">
					<TableBookings />
				</div>
			) : (
				<>
					{/* <MariachiForbiden className="w-80 fill-slate-900 dark:fill-slate-50" /> */}
					<p>Usted no esta autorizado aun para usar esta app (reservas).</p>
				</>
			)}
		</Layout>
	)
}

export default reservas

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (ctx) => {
		const session = await getSession(ctx)

		await store.dispatch(fetchBookings(true))

		if (!session) {
			return {
				redirect: {
					destination: "/signin",
					permanent: false,
				},
			}
		}

		// if (!existAdmin.users.admin) {
		// 	return {
		// 		redirect: {
		// 			destination: "/",
		// 			permanent: false,
		// 		},
		// 	}
		// }
		return {
			props: { session: session },
		}
	}
)
