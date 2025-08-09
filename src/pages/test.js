import { getSession } from "next-auth/react"
import React from "react"
import BookingCard from "src/components/Cards/BookingCard"
import SpinnerLogo from "src/components/Spinners/SpinnerLogo"
import useFetchUsers from "src/hook/useFetchUsers"
import { wrapper } from "store"
import { fetchBookings } from "store/features/bookings/bookingSlice"
import { fetchMariachis } from "store/features/mariachis/mariachiSlice"
import { fetchUsersNew } from "store/features/users/userSlice"

const reserva = {
	dateAndTime: "2022-05-28T18:00:00.000Z",
	message: "Llegar puntuales",
	userName: "Jorge",

	client: {
		_id: "579d5856-7018-40d0-aa5d-980b35b06f2e",
		email: "xonitg@gmail.com",
		name: "Jorge Guzm",
		tel: "2225110199",
	},
	orderItems: [
		{
			deposit: 500,
			mariachi: {
				_ref: "8f54aff9-d78b-4e0a-a43e-ba58442aa458",
				_type: "reference",
			},
			price: 2500,
			qty: 1,
			service: ["hora"],
			_key: "cd9553552f06",
		},
	],

	paymentResult: {
		email_address: "xonitg@gmail.com",
		payment: ["cash"],
	},
	playlist: [
		"Las mañanitas",
		"Llamarada",
		"Si tu te atreves",
		"El rey",
		"Motivos",
		"19 noches y 500 dias",
		"Gustito",
	],

	shippingAddress: {
		address: "7 sur 307",
		city: "Tianguismanalco",
		region: "Puebla",
	},
	status: ["PE"],
	_id: "082d1427-b8fb-4be2-9ade-b7fd8cc1dc98",
}
const test = ({ session }) => {
	const userAdmin = useFetchUsers(session)

	if (!userAdmin.exist) {
		return <SpinnerLogo />
	}
	return <BookingCard reserva={reserva} />
}

export default test

export const getServerSideProps = wrapper.getServerSideProps(
	(store) => async (ctx) => {
		const session = await getSession(ctx)
console.log(session)
		if (!session) {
			return {
				redirect: {
					destination: "/signin",
					permanent: false,
				},
			}
		}

		// if (!(existAdmin.users.admin.name !== undefined)) {
		// 	console.log("Existe dentro: ", existAdmin.users.admin.name)
		// 	return {
		// 		redirect: {
		// 			destination: "/",
		// 			permanent: false,
		// 		},
		// 	}
		// }
		await store.dispatch(fetchUsersNew(session))

		await store.dispatch(fetchMariachis(true))
		await store.dispatch(fetchBookings(true))

		return {
			props: { session: session },
		}
	}
)
