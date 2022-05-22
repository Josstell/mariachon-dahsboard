import React from "react"

import dynamic from "next/dynamic"
import { getSession } from "next-auth/react"
const Layout = dynamic(() => import("../../components/Layout"), { ssr: false })

const usuarios = () => {
	return <Layout>Usuarios</Layout>
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
