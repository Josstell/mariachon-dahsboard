import React from "react"
import dynamic from "next/dynamic"
const Layout = dynamic(() => import("../../components/Layout"), { ssr: false })
const usuarios = () => {
	return <Layout>Panel</Layout>
}

export default usuarios
