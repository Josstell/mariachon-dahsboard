import { getSession } from "next-auth/react"

import { wrapper } from "store"
import { fetchBookings } from "store/features/bookings/bookingSlice"
import Layout from "../../components/Layout"
import SpinnerGral from "src/components/Spinners/SpinnerGral"
import TableBookings from "src/components/Tables/TableBookings"
import useFetchUsers from "src/hook/useFetchUsers"

const reservas = ({ session }) => {
	const userAdmin = useFetchUsers(session)

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
