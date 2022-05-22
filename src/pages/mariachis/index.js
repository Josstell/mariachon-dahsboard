import React from "react"
import dynamic from "next/dynamic"
const Layout = dynamic(() => import("../../components/Layout"), { ssr: false })

const mariachis = () => {
	return <Layout>mariachis</Layout>
}

export default mariachis
