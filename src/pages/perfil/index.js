import React, { useEffect, useState } from "react"

import { getSession } from "next-auth/react"
import MariachiForbiden from "../../components/SVG/Icons/MariachiForbiden"
import { wrapper } from "../../../store"
import { useDispatch, useSelector } from "react-redux"
import {
	fetchUsersNew,
	selectUserAdmin,
} from "../../../store/features/users/userSlice"
import Layout from "src/components/Layout"
import SpinnerGral from "src/components/Spinners/SpinnerGral"
import AdminCard from "src/components/Cards/AdminCard"
import AdminForm from "src/components/Forms/AdminForm"

//const Layout = dynamic(() => import("../../components/Layout"), { ssr: false })

const perfil = ({ session }) => {
	const [editCard, setEditCard] = useState(false)
	const userAdmin = useSelector(selectUserAdmin)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!userAdmin.exist) {
			const reloadUsers = async () => {
				await dispatch(fetchUsersNew(session))
			}
			reloadUsers()
			//	router.push("/")
		}
	}, [])

	if (!userAdmin.exist) {
		return <SpinnerGral />
	}

	return (
		<Layout>
			{userAdmin.isAdmin ? (
				<div className={`no-scrollbar overflow-auto h-full  `}>
					<div
						className={`no-scrollbar overflow-auto  h-full  flex flex-col md:flex-row ${
							editCard ? "justify-evenly h-fit md:h-full" : "justify-center"
						}   items-center`}
					>
						<div
							className={` ${
								editCard ? "block" : "hidden"
							} no-scrollbar w-10/12	 md:w-2/5 h-fit md:h-full mb-5 md:mb-0 flex justify-center items-center`}
						>
							<AdminForm />
						</div>
						<div
							className={
								editCard ? "w-11/12	 md:w-2/5  h-[80vh] md:h-3/5" : "w-3/4 h-3/5"
							}
						>
							<AdminCard setEditCard={setEditCard} editCard={editCard} />
						</div>
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

export default perfil

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

		return {
			props: { session: session },
		}
	}
)
