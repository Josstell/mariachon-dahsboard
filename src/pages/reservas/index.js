import { getSession } from "next-auth/react"

import { wrapper } from "store"
import {
	fetchBookings,
	setStatusBooking,
} from "store/features/bookings/bookingSlice"
import Layout from "../../components/Layout"
import TableBookings from "src/components/Tables/TableBookings"
import useFetchUsers from "src/hook/useFetchUsers"
import SpinnerLogo from "src/components/Spinners/SpinnerLogo"
import { setStatusUser } from "store/features/users/userSlice"
import { setStatus } from "store/features/mariachis/mariachiSlice"
// import HbookingCard from "src/components/Cards/BookingCard/HbookingCard"
// import BookingCard from "src/components/Cards/BookingCard"

const reservas = ({ session }) => {
	const userAdmin = useFetchUsers(session)

	if (!userAdmin.exist) {
		return <SpinnerLogo />
	}

	return (
		<Layout>
			{userAdmin?.isAdmin ? (
				<div className={`no-scrollbar overflow-auto w-full h-full  `}>
					<div
						className={`no-scrollbar overflow-auto   h-full  flex flex-col md:flex-row  md:justify-evenly
							 items-center`}
					>
						{" "}
						<TableBookings userAdmin={userAdmin} />
						{/* <HbookingCard /> */}
						{/* <BookingCard /> */}
					</div>
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

		if (!session) {
			return {
				redirect: {
					destination: "/signin",
					permanent: false,
				},
			}
		}

		await store.dispatch(fetchBookings(true))

		await store.dispatch(setStatusUser("idle"))
		await store.dispatch(setStatus("idle"))
		await store.dispatch(setStatusBooking("idle"))
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
