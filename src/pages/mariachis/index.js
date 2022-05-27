import React from "react"
import dynamic from "next/dynamic"
import { getSession } from "next-auth/react"
import MariachiForbiden from "../../components/SVG/Icons/MariachiForbiden"
import { useSelector } from "react-redux"
import { selectUserAdmin } from "store/features/users/userSlice"
import { fetchMariachis } from "store/features/mariachis/mariachiSlice"
import { wrapper } from "../../../store"
import TableMariachis from "src/components/Tables/TableMariachis"
const Layout = dynamic(() => import("../../components/Layout"), { ssr: false })

const mariachis = () => {
	const userAdmin = useSelector(selectUserAdmin)

	return (
		<Layout>
			{userAdmin?.isAdmin ? (
				<TableMariachis />
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

		await store.dispatch(fetchMariachis(true))

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
