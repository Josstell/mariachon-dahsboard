import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { HYDRATE } from "next-redux-wrapper"
import client from "@lib/sanity"
import { groq } from "next-sanity"

import axios from "axios"

const { NEXT_PUBLIC_URL_API } = process.env

const initialState = {
	bookings: [],
	statusBook: "idle",
	statusBookGS: "idle",
	statusBEmail: "idle",

	error: null,
	bookingTabActive: {
		client: true,
		mariachi: false,
		address: false,
		parameters: false,
	},
}
const query = groq`
*[_type == "booking"  && !(_id in path('drafts.**'))]{
 _id,
 reserva,
 dateCreated,
dateModified,
createdBy,
modifiedBy,
client->{
  _id,
  name,
  tel,
  email
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
	fee,
	priceOptionSelected,
    service,
	  members,
categorySet,
    mariachi->{
		_id,
    name,
	crew,
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
logo,

  }

  }
    }
`
export const fetchBookings = createAsyncThunk(
	"bookings/fetchBookings",
	async (isAdmin) => {
		if (isAdmin) {
			const bookings = await client.fetch(query)
			console.log("Hola Bookings", bookings)
			return bookings
		} else {
			return []
		}

		//dispatch(setAdminUser(userAdmin))
	}
)

export const updateBooking = createAsyncThunk(
	"bookings/updateUser",
	(booking, { getState, dispatch }) => {
		const {
			mariachis: { mariachis },
			users: { users },
		} = getState()

		// 		// We send the initial data to the fake API server booking
		axios
			.put("/api/reservas/update", booking)
			.then((response) => {
				const data = response.data
				if (data) {
					const mariachiUpdated = mariachis.find(
						(mar) => mar._id === data.orderItems[0].mariachi._ref
					)
					const clientUpdated = users.find(
						(user) => user._id === data.client._ref
					)
					const items = data.orderItems[0]

					const dataReserva = {
						...data,
						client: clientUpdated,
						orderItems: {
							...items,
							mariachi: mariachiUpdated,
						},
					}
					dispatch(addBookingToGoogleSheet({ ...dataReserva, sendEmail: true }))

					return dataReserva
				}
			})
			.catch((error) => {
				const text = { message: "Algo paso! Favor de intentarlo màs tarde." }

				const errorData = {
					data: error?.response?.data ? error?.response?.data : text,
				}

				return errorData
			})
	}
)

export const addBooking = createAsyncThunk(
	"bookings/addBooking",
	(booking, { getState, dispatch }) => {
		// We send the initial data to the fake API server
		const {
			users: { users },
			mariachis: { mariachis },
		} = getState()
		axios
			.post("/api/reservas/add", booking)
			.then((response) => {
				const data = response.data

				const clientAdded = users.find((user) => user._id === data.client._ref)
				const mariachiUpdated = mariachis.find(
					(mar) => mar._id === data.orderItems[0].mariachi._ref
				)
				const items = data.orderItems[0]

				const dataReserva = {
					...data,
					client: clientAdded,
					orderItems: {
						...items,
						mariachi: mariachiUpdated,
					},
				}

				dispatch(addBookingToGoogleSheet({ ...dataReserva, sendEmail: true }))

				return dataReserva
			})
			.catch((error) => {
				const text = { message: "Algo paso! Favor de intentarlo màs tarde." }

				const errorData = {
					data: error?.response?.data ? error?.response?.data : text,
				}

				return errorData
			})
		// The response includes the complete post object, including unique ID
	}
)

//

export const addBookingToGoogleSheet = createAsyncThunk(
	"bookings/addBookingToGoogleSheet",
	(reserva, { dispatch }) => {
		axios
			.post(`${NEXT_PUBLIC_URL_API}/api/google-sheet/add/reservation`, reserva)
			.then((response) => {
				console.log("hola", response.data)
				const data = response.data

				dispatch(sendBooking(reserva))

				return data
			})
			.catch((error) => {
				const text = {
					message: "Algo paso! No se guardaron datos en Google Sheet.",
				}

				const errorData = {
					data: error?.response?.data ? error?.response?.data : text,
				}

				return errorData
			})
	}
)

export const sendBooking = createAsyncThunk(
	"bookings/sendBooking",
	(reserva) => {
		axios
			.post(`${NEXT_PUBLIC_URL_API}/api/email/reservation`, reserva)
			.then((resp) => {
				const dataE = resp.data
				console.log("hola2 :", dataE)
				return dataE
			})
			.catch((error) => {
				const text = {
					message: "Algo paso! No se pudo enviar el correo.",
				}

				const errorData = {
					data: error?.response?.data ? error?.response?.data : text,
				}

				return errorData
			})
	}
)

const bookingsSlice = createSlice({
	name: "bookings",
	initialState,
	reducers: {
		// setAdminUser: (state, action) => {
		// 	state.admin = action.payload
		// },
		setDispBookingTabActive: (state, action) => {
			state.bookingTabActive = action.payload
		},
		setStatusBooking: (state, action) => {
			state.statusBook = action.payload
		},
		setStatusBookingGS: (state, action) => {
			state.statusBookGS = action.payload
		},
		setStatusBookingEmail: (state, action) => {
			state.statusBEmail = action.payload
		},
	},

	extraReducers: {
		[fetchBookings.pending]: (state) => {
			state.statusBook = "loading"
		},
		[fetchBookings.fulfilled]: (state, action) => {
			state.statusBook = "succeeded"
			state.bookings = action.payload
		},
		[fetchBookings.rejected]: (state) => {
			state.statusBook = "failed"
		},
		[updateBooking.fulfilled]: (state, action) => {
			if (action?.payload?.data) {
				state.statusBook = "failed"
				state.error = "Algo paso, por favor intentelo nuevamente."
			} else {
				state.statusBook = "succeeded"
				const bookingUp = action.payload
				state.bookings = state.bookings.map((booking) =>
					booking._id === bookingUp._id ? bookingUp : booking
				)
			}
		},
		[addBooking.fulfilled]: (state, action) => {
			if (action?.payload?.data) {
				state.statusBook = "failed"
				state.error = "Algo paso, por favor intentelo nuevamente."
			} else {
				state.statusBook = "succeeded"
				state.bookings.push(action.payload)
			}
		},
		[addBookingToGoogleSheet.fulfilled]: (state, action) => {
			if (action?.payload?.data) {
				state.statusGS = "failed"
				state.error = "Error en la carga de la reserva en google sheet"
			} else {
				state.statusBookGS = "succeeded"
			}
		},
		[sendBooking.fulfilled]: (state, action) => {
			if (action?.payload?.data) {
				state.statusBEmail = "failed"
				state.error = "Error en el envio del correo"
			} else {
				state.statusBEmail = "succeeded"
			}
		},

		[HYDRATE]: (state, action) => {
			if (
				action.payload.bookings.bookings.length === 1 &&
				action.payload.mariachis.mariachis.length === 0 &&
				action.payload.users.users.length === 0
			) {
				return { ...state, bookings: action.payload.bookings.bookings }
			}
			if (action.payload.bookings.bookings.length === 0) {
				return state
			}

			state.bookings = action.payload.bookings.bookings
			state.statusBook = action.payload.bookings.statusBook
			state.error = action.payload.bookings.error
		},
	},
})

//export const { setUsers } = mariachisSlice.actions

export default bookingsSlice.reducer
export const {
	setDispBookingTabActive,
	setStatusBooking,
	setStatusBookingGS,
	setStatusBookingEmail,
} = bookingsSlice.actions

// export const { setAdminUser } = bookingsSlice.actions

export const selectAllBookings = (state) => state.bookings.bookings
export const selectStatusBook = (state) => state.bookings.statusBook
export const selectStatusBookGS = (state) => state.bookings.statusBookGS
export const selectStatusBEmail = (state) => state.bookings.statusBEmail

export const selectError = (state) => state.bookings.error
