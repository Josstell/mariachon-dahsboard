import React from "react"
import dynamic from "next/dynamic"
import { getSession } from "next-auth/react"
import MariachiForbiden from "../../components/SVG/Icons/MariachiForbiden"
import { useSelector } from "react-redux"
import { selectUserAdmin } from "store/features/users/userSlice"
const Layout = dynamic(() => import("../../components/Layout"), { ssr: false })

const usuarios = () => {
	const userAdmin = useSelector(selectUserAdmin)

	return (
		<Layout>
			{userAdmin?.isAdmin ? (
				<h3>Tienes derechos de usuario</h3>
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

export async function getServerSideProps({ req, res }) {
	const session = await getSession({ req })
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
