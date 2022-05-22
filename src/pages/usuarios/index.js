import React from "react"

import dynamic from "next/dynamic"
const Layout = dynamic(() => import("../../components/Layout"), { ssr: false })

const usuarios = () => {
	return <Layout>Usuarios</Layout>
}

export default usuarios
