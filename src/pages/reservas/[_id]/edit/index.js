import client from "@lib/sanity"
import { getSession } from "next-auth/react"
import { groq } from "next-sanity"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"

import BookingCard from "src/components/Cards/BookingCard"
import BookingForm from "src/components/Forms/BookingForm"
import Layout from "src/components/Layout"
import SpinnerLogo from "src/components/Spinners/SpinnerLogo"
import MariachiForbiden from "src/components/SVG/Icons/MariachiForbiden"
import BookingTa from "src/components/Tabs/ReservaTabs"
import { wrapper } from "store"
import { selectUserAdmin } from "store/features/users/userSlice"

const reservaById = ({ data }) => {
	const router = useRouter()

	// const [dataRever, setDataRever] = useState(reserva)

	const userAdmin = useSelector(selectUserAdmin)

	// const [mariachiBy_Id, coordinatorById] =
	// 	useGetMaraichiAndCoordinatorByMariachiId(data.orderItems[0].mariachi._ref)

	// const clientbyId = useGetUserById(data.client._ref)

	// useEffect(() => {
	// 	setDataRever({
	// 		...data,
	// 		mariachiBy_Id,
	// 		coordinatorById,
	// 		client: clientbyId,
	// 	})
	// }, [data, clientbyId, mariachiBy_Id, coordinatorById])

	if (!userAdmin.exist || router.isFallback) {
		return <SpinnerLogo />
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
							<BookingTa>
								<BookingForm />
							</BookingTa>
						</div>
						<div className={"w-full h-full md:w-4/12 md:h-5/6	 "}>
							<BookingCard reserva={data} />
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

export async function getStaticPaths() {
	const query = groq`
*[_type == "booking" && !(_id in path('drafts.**')) ]{
    _id
}

`
	const booking = await client.fetch(query)

	const paths = booking.map((path) => ({
		params: { _id: path._id.toString() },
	}))

	console.log("links: ", paths)

	return { paths: paths, fallback: true }
}

export const getStaticProps = wrapper.getStaticProps(() => async (ctx) => {
	const query = groq`*[_type == "booking" && _id == $id][0]{
 _id,
client->{
  _id,
  name,
  tel,
  email,
},
dateAndTime,
  message,
  playlist,
  price,
  qty,
  userName,
  status,
  shippingAddress,
  paymentResult,
  orderItems[0]{
    _key,
    deposit,
    price,
    qty,
    service,
    mariachi->{
    name,
tel,
coordinator->{
  _id,
  name,
  tel
},
members,
service,
categorySet,
region,
logo
  }
  }
    }
	`

	const session = await getSession(ctx)

	const booking = await client.fetch(query, {
		id: ctx.params._id,
	})

	// const data = users.filter((est) => est._id.toString() === ctx.params.slug)

	// const data = await store
	// 	.dispatch(selectAllUsers())
	// 	.filter((est) => est.slug.toString() === params.slug)

	return {
		props: {
			data: booking,
			session: session,
		},

		//	props: { data: data[0] }, // will be passed to the page component as props
	}
})

export default reservaById
