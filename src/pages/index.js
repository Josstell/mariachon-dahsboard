import { getSession } from "next-auth/react"

import Layout from "../components/Layout"

export default function Home({ session }) {
	console.log("data user:", session)
	return (
		<Layout>
			<div>
				<h1>Dashboard(Protected Route)</h1>
				<p>
					Welcome to dashboard: <b>hola</b>
				</p>
				<p>hola</p>
			</div>
		</Layout>
	)
}

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
		props: {
			session: session,
		},
	}
}
