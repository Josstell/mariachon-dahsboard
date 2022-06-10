import client from "@lib/sanity"
import { groq } from "next-sanity"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import BookingCard from "src/components/Cards/BookingCard"
import SpinnerLogo from "src/components/Spinners/SpinnerLogo"
import { wrapper } from "store"

const queryMar = groq`*[_type == "mariachi" && _id == $id][0]{
 _id,
name,
coordinator->{
  _id,
  name,
  tel,
  email
},
members,
service,
categorySet,
region,
logo        
    }
`

const queryUser = groq`*[_type == "user" && _id == $id][0]{
  _id,
  email,
  name,
  tel,
  city
}
	`

const reservaByIDShow = ({ data }) => {
	const router = useRouter()
	const [dataReserva, setdataReserva] = useState({})
	const [loading, setloading] = useState(true)
	console.log("reserva show: ", data)

	useEffect(() => {
		const getMariachi = async () => {
			setloading(true)
			const mariachibyId = await client.fetch(queryMar, {
				id: data.orderItems[0].mariachi._ref,
			})

			const clientbyId = await client.fetch(queryUser, {
				id: data.client._ref,
			})

			setdataReserva({
				...data,
				mariachiBy_Id: mariachibyId,
				client: clientbyId,
			})
			setloading(false)
		}
		getMariachi()
	}, [])

	if (router.isFallback || loading || dataReserva === {}) {
		return <SpinnerLogo />
	}

	return (
		<div className="w-screen h-fit bg-slate-100 dark:bg-slate-900">
			<BookingCard reserva={dataReserva} />
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
   client,
  dateAndTime,
  message,
  playlist,
  price,
  qty,
  userName,
  status,
  shippingAddress,
  paymentResult,
  orderItems
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
