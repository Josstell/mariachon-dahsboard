import client from "@lib/sanity"
import { groq } from "next-sanity"
import { useRouter } from "next/router"
import BookingCard from "src/components/Cards/BookingCard"
import SpinnerLogo from "src/components/Spinners/SpinnerLogo"
import { wrapper } from "store"

const reservaByIDShow = ({ data }) => {
	const router = useRouter()

	if (router.isFallback) {
		return <SpinnerLogo />
	}

	return (
		<div className="w-screen h-fit bg-slate-100 dark:bg-slate-900">
			<BookingCard reserva={data} />
		</div>
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

	try {
		const booking = await client.fetch(query, {
			id: ctx.params._id,
		})

		return {
			props: {
				data: booking,
			},
		}
	} catch (error) {
		console.log(error)
	}
})

export default reservaByIDShow
