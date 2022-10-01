import { getSession } from "next-auth/react"
import MariachiForbiden from "../../components/SVG/Icons/MariachiForbiden"

import {
	fetchMariachis,
	setStatus,
} from "store/features/mariachis/mariachiSlice"
import { wrapper } from "../../../store"
import TableMariachis from "src/components/Tables/TableMariachis"
import Layout from "../../components/Layout"
import useFetchUsers from "src/hook/useFetchUsers"
import SpinnerLogo from "src/components/Spinners/SpinnerLogo"
import { setStatusUser } from "store/features/users/userSlice"
import { setStatusBooking } from "store/features/bookings/bookingSlice"
//const Layout = dynamic(() => import("../../components/Layout"), { ssr: false })

const mariachis = ({ session }) => {
	const userAdmin = useFetchUsers(session)

	if (!userAdmin.exist) {
		return <SpinnerLogo />
	}

	return (
		<Layout>
			{userAdmin?.isAdmin ? (
				<div className={`no-scrollbar overflow-auto w-full h-full  `}>
					<div
						className={`no-scrollbar overflow-auto   h-full  flex flex-col items-center md:flex-row   md:justify-center md:items-center
							 `}
					>
						<TableMariachis />
					</div>
				</div>
			) : (
				<>
					<MariachiForbiden className="w-80 fill-slate-900 dark:fill-slate-50" />
					<p>Usted no esta autorizado aun para usar esta app (Mariachis).</p>
				</>
			)}
		</Layout>
	)
}

export default mariachis

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

		await store.dispatch(fetchMariachis(true))

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
