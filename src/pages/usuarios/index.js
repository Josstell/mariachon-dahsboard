import React from "react"

import dynamic from "next/dynamic"
import { getSession } from "next-auth/react"
import MariachiForbiden from "../../components/SVG/Icons/MariachiForbiden"
import TableUser from "../../components/TableUsers"
import { wrapper } from "../../../store"
import { useSelector } from "react-redux"
import { selectUserAdmin } from "../../../store/features/users/userSlice"
const Layout = dynamic(() => import("../../components/Layout"), { ssr: false })

const usuarios = (props) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const userAdmin = useSelector(selectUserAdmin)

	return (
		<Layout>
			{userAdmin.isAdmin ? (
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
		return {
			props: {},
		}
	}
)
