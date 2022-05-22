import React from "react"
import dynamic from "next/dynamic"
const Layout = dynamic(() => import("../../components/Layout"), { ssr: false })

const reservas = () => {
	return <Layout>reservas</Layout>
}

export default reservas
