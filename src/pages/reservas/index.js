import React from "react"
import dynamic from "next/dynamic"
import { getSession } from "next-auth/react"
import MariachiForbiden from "../../components/SVG/Icons/MariachiForbiden"
import { useSelector } from "react-redux"
import { selectUserAdmin } from "store/features/users/userSlice"
import { wrapper } from "store"
import { fetchBookings } from "store/features/bookings/bookingSlice"
const Layout = dynamic(() => import("../../components/Layout"), { ssr: false })

const reservas = () => {
	const userAdmin = useSelector(selectUserAdmin)

	return (
		<Layout>
			{userAdmin?.isAdmin ? (
				<h3>Tienes derechos de usuario</h3>
			) : (
				<>
					<MariachiForbiden className="w-80 fill-slate-900 dark:fill-slate-50" />
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
