import { getSession } from "next-auth/react"

import Layout from "../components/Layout"
import MariachiForbiden from "../components/SVG/Icons/MariachiForbiden"

export default function Home({ session }) {
	console.log("data user:", session)
	const isAdmin = false

	return (
		<Layout>
			{isAdmin ? (
				<h3>Tienes derechos de usuario</h3>
			) : (
				<>
					<MariachiForbiden className="w-40 fill-slate-900 dark:fill-slate-50" />
					<p className="">Usted no esta autorizado para usar esta app.</p>
				</>
			)}
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
