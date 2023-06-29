import { getSession } from "next-auth/react"

import { wrapper } from "store"
import { setStatusBooking } from "store/features/bookings/bookingSlice"
import Layout from "../../components/Layout"
import TableBookings from "src/components/Tables/TableBookings"
import SpinnerLogo from "src/components/Spinners/SpinnerLogo"
import {
	fetchUsersNew,
	selectUserAdmin,
	setStatusUser,
} from "store/features/users/userSlice"
import { setMariachis, setStatus } from "store/features/mariachis/mariachiSlice"
import { getBookings } from "store/features/bookingsApi"
import { useSelector } from "react-redux"
import { getMariachis } from "store/features/mariachisAPI"
// import HbookingCard from "src/components/Cards/BookingCard/HbookingCard"
// import BookingCard from "src/components/Cards/BookingCard"

const reservas = () => {
	const userAdmin = useSelector(selectUserAdmin)

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

		await store.dispatch(fetchUsersNew(session))

		const { data } = await store.dispatch(getMariachis.initiate())
		await store.dispatch(setMariachis(data.result))

		await store.dispatch(setStatusUser("idle"))
		await store.dispatch(setStatus("idle"))
		await store.dispatch(setStatusBooking("idle"))

		await store.dispatch(getBookings.initiate())

		//await Promise.all(getRunningOperationPromises())

		//await Promise.all(getRunningQueriesThunk())
		// if (!existAdmin.users.admin) {
		// 	return {
		// 		redirect: {
		// 			destination: "/",
		// 			permanent: false,
		// 		},
		// 	}
		// } h
		return {
			props: {},
		}
	}
)
