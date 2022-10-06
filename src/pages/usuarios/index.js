import React, { useEffect } from "react"

import { getSession } from "next-auth/react"
import MariachiForbiden from "../../components/SVG/Icons/MariachiForbiden"
import { wrapper } from "../../../store"
import { useDispatch, useSelector } from "react-redux"
import {
	fetchUsersNew,
	selectStatusUser,
	selectUserAdmin,
	setStatusUser,
} from "../../../store/features/users/userSlice"
import TableUser from "src/components/Tables/TableUsers"
import Layout from "src/components/Layout"
import { setStatus } from "store/features/mariachis/mariachiSlice"
import { setStatusBooking } from "store/features/bookings/bookingSlice"
import SpinnerLogo from "src/components/Spinners/SpinnerLogo"
import { useGetUsersQuery } from "store/features/usersApi"
//const Layout = dynamic(() => import("../../components/Layout"), { ssr: false })

const usuarios = ({ session }) => {
	const { data, isLoading } = useGetUsersQuery(undefined, {
		refetchOnMountOrArgChange: true,
		refetchOnFocus: true,
		refetchOnReconnect: true,
	})

	console.log("Data from rtk query", data)
	const userAdmin = useSelector(selectUserAdmin)
	const dispatch = useDispatch()
	const status = useSelector(selectStatusUser)

	useEffect(() => {
		if (status === "succeeded") {
			dispatch(setStatusUser("idle"))
		}
	}, [status])

	useEffect(() => {
		if (!userAdmin.exist) {
			dispatch(fetchUsersNew(session))
		}
		//	router.push("/")
	}, [userAdmin, dispatch, session])

	if (!userAdmin.exist) {
		return <SpinnerLogo />
	}

	return (
		<Layout>
			{userAdmin.isAdmin ? (
				<div className={`no-scrollbar overflow-auto w-full  h-full  `}>
					<div
						className={`no-scrollbar overflow-auto h-[1024px] md:h-fit flex flex-col md:flex-row 
							justify-evenly items-center`}
					>
						<TableUser />
					</div>
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

		if (!session) {
			return {
				redirect: {
					destination: "/signin",
					permanent: false,
				},
			}
		}

		await store.dispatch(setStatusUser("idle"))
		await store.dispatch(setStatus("idle"))
		await store.dispatch(setStatusBooking("idle"))

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
