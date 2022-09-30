import { getSession } from "next-auth/react"
import MariachiForbiden from "../../components/SVG/Icons/MariachiForbiden"
import { setStatusUser } from "store/features/users/userSlice"
import Panel from "src/components/Panel"
import { setStatus } from "store/features/mariachis/mariachiSlice"
import { setStatusBooking } from "store/features/bookings/bookingSlice"
import { wrapper } from "store"
import Layout from "src/components/Layout"
import SpinnerLogo from "src/components/Spinners/SpinnerLogo"
import useFetchUsers from "src/hook/useFetchUsers"

const usuarios = ({ session }) => {
	const userAdmin = useFetchUsers(session)

	if (!userAdmin.exist) {
		return <SpinnerLogo />
	}

	return (
		<Layout>
			{userAdmin?.isAdmin ? (
				<div className={`no-scrollbar overflow-auto w-full h-full  `}>
					<Panel />
				</div>
			) : (
				<>
					<MariachiForbiden className="w-80 fill-slate-900 dark:fill-slate-50" />
					<p>Usted no esta autorizado aun para usar esta app (panel).</p>
				</>
			)}
		</Layout>
	)
}

export default usuarios

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (ctx) => {
		const session = await getSession(ctx)
		if (!session)
			return {
				redirect: {
					destination: "/signin",
					permanent: false,
				},
			}

		await store.dispatch(setStatusUser("idle"))
		await store.dispatch(setStatus("idle"))
		await store.dispatch(setStatusBooking("idle"))

		return {
			props: { session: session },
		}
	}
)
