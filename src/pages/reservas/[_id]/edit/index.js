/* eslint-disable no-mixed-spaces-and-tabs */
import client from "@lib/sanity"
import { getSession } from "next-auth/react"
import { groq } from "next-sanity"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"

import BookingCard from "src/components/Cards/BookingCard"
import BookingForm from "src/components/Forms/BookingForm"
import Layout from "src/components/Layout"
import SpinnerLogo from "src/components/Spinners/SpinnerLogo"
import MariachiForbiden from "src/components/SVG/Icons/MariachiForbiden"
import BookingTa from "src/components/Tabs/ReservaTabs"
import { wrapper } from "store"
import { selectAllMariachis } from "store/features/mariachis/mariachiSlice"
import { selectUserAdmin } from "store/features/users/userSlice"

const reservaById = ({ data }) => {
	const router = useRouter()

	const userAdmin = useSelector(selectUserAdmin)

	const dataMariachi = useSelector(selectAllMariachis)

	const [mariachiSelected, setMariachiSelected] = useState({})

	const [arrayPlayList, setArrayPlayList] = useState([])

	useEffect(() => {
		const play = data.playlist[0] === "" ? [] : data.playlist
		setArrayPlayList(play)
	}, [])

	const methods = useForm()
	const { watch } = methods

	const dataReservaToCard = {
		dateAndTime: watch("dateAndTime") || "",
		client: {
			_id: watch("clientId") || "",
			name: watch("nameClient") || "",
			tel: watch("telClient") || "",
			email: watch("emailClient") || "",
		},
		shippingAddress: {
			address: watch("address") || "",
			city: watch("city") || "",
			cp: watch("cp") || "",
			region: watch("region") || "",
		},
		orderItems: {
			mariachi: {
				_id: watch("idMariachi") || "",
			},
			categorySet: watch("category_mariachi") || [],
			members: watch("members") || "",
			price: watch("price") || 0,
			deposit: watch("deposit") || 0,
			fee: watch("fee") || 0,
			qty: watch("qty") || 0,
			service: watch("service") || "",
		},
		message: watch("message") || "",
		playlist: [],
	}

	useEffect(() => {
		//if (mariachiSelected._id !== dataReservaToCard.orderItems.mariachi._id)
		console.log("id", dataReservaToCard.orderItems.mariachi._id)

		if (dataReservaToCard.orderItems.mariachi._id === undefined) {
			console.log("id1", dataReservaToCard.orderItems.mariachi._id)

			const marSeleected = dataMariachi.find(
				(dat) => dat._id === data.orderItems.mariachi._id
			)
			setMariachiSelected(marSeleected)
		} else {
			console.log("id2", dataReservaToCard.orderItems.mariachi._id)
			const marSeleected = dataMariachi.find(
				(dat) => dat._id === dataReservaToCard.orderItems.mariachi._id
			)
			setMariachiSelected(marSeleected)
		}

		//S}
	}, [dataReservaToCard.orderItems.mariachi._id])

	// useEffect(() => {
	// 	setMariachiSelected({
	// 		...mariachiSelected,
	// 		categorySet: dataReservaToCard.orderItems.mariachi.categorySet,
	// 	})
	// }, [dataReservaToCard.orderItems.mariachi.categorySet])

	if (!userAdmin.exist || router.isFallback) {
		return <SpinnerLogo />
	}

	// console.log("mariachi id", dataReservaToCard.orderItems)
	console.log(" data", dataReservaToCard)
	console.log("mariachi!!! ", mariachiSelected)

	// console.log("data real", watch("idMariachi"))

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
								<BookingForm
									methods={methods}
									reserva={
										mariachiSelected === {} ||
										dataReservaToCard.orderItems.service === undefined
											? data
											: {
													...data,
													orderItems: {
														...dataReservaToCard.orderItems,
														mariachi: {
															...mariachiSelected,
														},
														categorySet: mariachiSelected?.categorySet || "",
														members: mariachiSelected?.members || 0,
														_key: data.orderItems._key,
													},
											  }
									}
									arrayPlayList={arrayPlayList}
									setArrayPlayList={setArrayPlayList}
								/>
							</BookingTa>
						</div>
						<div className={"w-full h-full md:w-4/12 md:h-5/6	 "}>
							<BookingCard
								reserva={
									mariachiSelected === {}
										? dataReservaToCard
										: {
												...dataReservaToCard,
												orderItems: {
													...dataReservaToCard.orderItems,
													mariachi: {
														...mariachiSelected,
													},
													categorySet: dataReservaToCard.orderItems.categorySet,
													members: dataReservaToCard.orderItems.members,
												},
												playlist: arrayPlayList,
										  }
								}
								data={data}
							/>
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
	  members,
categorySet,
    mariachi->{
		_id,
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
