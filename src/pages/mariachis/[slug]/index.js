import React from "react"
import client from "@lib/sanity"
import { getSession } from "next-auth/react"
import { groq } from "next-sanity"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import MariachiCard from "src/components/Cards/MariachiCard"
import MariachiForm from "src/components/Forms/MariachiForm"
import Layout from "src/components/Layout"
import SpinnerGral from "src/components/Spinners/SpinnerGral"
import MariachiForbiden from "src/components/SVG/Icons/MariachiForbiden"
import MariachiTab from "src/components/Tabs/MariachiTab"
import { wrapper } from "store"
import { selectUserAdmin } from "store/features/users/userSlice"

const mariachiById = ({ data }) => {
	const router = useRouter()
	const userAdmin = useSelector(selectUserAdmin)
	const activeFormTab = useSelector(
		(state) => state.mariachis.mariachiTabActive
	)

	const methods = useForm()

	if (!userAdmin.exist || router.isFallback) {
		return <SpinnerGral />
	}
	return (
		<Layout>
			{userAdmin.isAdmin ? (
				<div className={`no-scrollbar overflow-auto w-full h-full  `}>
					<div
						className={`no-scrollbar overflow-auto   h-full md:h-full flex flex-col md:flex-row md:justify-evenly
							 items-center`}
					>
						<div className={"w-4/12 h-3/5 "}>
							<MariachiTab>
								<MariachiForm methods={methods} activeFormTab={activeFormTab} />
							</MariachiTab>
						</div>
						<div className={"w-full h-full md:w-4/12 md:h-5/6	 "}>
							<MariachiCard mariachiUp={data} />
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

export default mariachiById

export async function getStaticPaths() {
	const query = groq`
*[_type == "mariachi"]{
  _id,
  slug
}
`
	const mariachis = await client.fetch(query)

	const paths = mariachis.map((path) => ({
		params: { slug: path.slug.current.toString() },
	}))

	console.log("links: ", paths)

	return { paths: paths, fallback: true }
}

export const getStaticProps = wrapper.getStaticProps(() => async (ctx) => {
	const query = groq`*[_type == "mariachi" && slug.current == $slug][0]{
  _id,
  slug{
  current
},
name,
description[0]{
  children[0]{
    text
  }
},
address,
tel,
coordinator->{
  _id,
  name,
  tel
},
crew,
memebers,
service,
categorySet,
region,
logo
}`

	const mariachi = await client.fetch(query, {
		slug: ctx.params.slug,
	})

	const session = await getSession(ctx)
	// const data = users.filter((est) => est._id.toString() === ctx.params.slug)

	// const data = await store
	// 	.dispatch(selectAllUsers())
	// 	.filter((est) => est.slug.toString() === params.slug)

	return {
		props: {
			data: mariachi,
			session: session,
		},

		//	props: { data: data[0] }, // will be passed to the page component as props
	}
})
