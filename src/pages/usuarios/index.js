import React from "react"

import dynamic from "next/dynamic"
import { getSession } from "next-auth/react"
import MariachiForbiden from "../../components/SVG/Icons/MariachiForbiden"
import TableUser from "../../components/TableUsers"
const Layout = dynamic(() => import("../../components/Layout"), { ssr: false })

const usuarios = () => {
	const isAdmin = true

	return (
		<Layout>
			{isAdmin ? (
				<div className="flex flex-col justify-center items-center">
					<TableUser />
				</div>
			) : (
				<>
					<MariachiForbiden className="w-80 fill-slate-900 dark:fill-slate-50" />
					<p className="">
						Usted no esta autorizado para usar esta app (users).
					</p>
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
