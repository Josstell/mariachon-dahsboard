import React, { useEffect } from "react"

import { getSession } from "next-auth/react"
import MariachiForbiden from "../../components/SVG/Icons/MariachiForbiden"
import { wrapper } from "../../../store"
import { useDispatch, useSelector } from "react-redux"
import {
	fetchUsersNew,
	selectStatus,
	selectUserAdmin,
	setStatus,
} from "../../../store/features/users/userSlice"
import TableUser from "src/components/Tables/TableUsers"
import Layout from "src/components/Layout"
import SpinnerGral from "src/components/Spinners/SpinnerGral"
//const Layout = dynamic(() => import("../../components/Layout"), { ssr: false })

const usuarios = ({ session }) => {
	const userAdmin = useSelector(selectUserAdmin)
	const dispatch = useDispatch()
	const status = useSelector(selectStatus)

	useEffect(() => {
		if (status === "succeeded") {
			dispatch(setStatus("idle"))
		}
	}, [status])

	useEffect(() => {
		if (!userAdmin.exist) {
			dispatch(fetchUsersNew(session))
		}
		//	router.push("/")
	}, [userAdmin, dispatch, session])

	if (!userAdmin.exist) {
		return <SpinnerGral />
	}

	return (
		<Layout>
			{userAdmin.isAdmin ? (
				<div className="flex  justify-center items-center">
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
	() => async (ctx) => {
		const session = await getSession(ctx)

		if (!session) {
			return {
				redirect: {
					destination: "/signin",
					permanent: false,
				},
			}
		}

		// if (!(existAdmin.users.admin.name !== undefined)) {
		// 	console.log("Existe dentro: ", existAdmin.users.admin.name)
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
