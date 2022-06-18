import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { HYDRATE } from "next-redux-wrapper"
import client from "@lib/sanity"
import { groq } from "next-sanity"

import axios from "axios"

const initialState = {
	bookings: [],
	status: "idle",
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
  client->{
  _id,
  name,
  tel,
 email,
  slug{
  current
}
},
dateAndTime,
orderItems[0]{
  desposit,
  price,
  service,
  fee,
  mariachi->{
  _id,
  name,
  logo,
  coordinator->{
  _id,
  name,
  tel,
 email,
}
}
},
shippingAddress,
paymentResult,
qty,
price,
message,
playlist,
status,
isPaid,
paidAt,
isMade
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
	async (booking, { getState }) => {
		const {
			mariachis: { mariachis },
			users: { users },
		} = getState()

		console.log("todos los estados: ", mariachis, users, booking)
		// We send the initial data to the fake API server
		try {
			const { data } = await axios.put("/api/reservas/update", booking)

			if (data) {
				const mariachiUpdated = mariachis.find(
					(mar) => mar._id === data.orderItems[0].mariachi._ref
				)
				const clientUpdated = users.find(
					(user) => user._id === data.client._ref
				)
				const items = data.orderItems[0]

				return {
					...data,
					client: clientUpdated,
					orderItems: {
						...items,
						mariachi: mariachiUpdated,
					},
				}
			}
		} catch (error) {
			console.log("Pinche Error", error)
		}
		// The response includes the complete post object, including unique ID
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
	},

	extraReducers: {
		[fetchBookings.pending]: (state) => {
			state.status = "loading"
		},
		[fetchBookings.fulfilled]: (state, action) => {
			state.status = "succeeded"
			state.bookings = action.payload
		},
		[fetchBookings.rejected]: (state) => {
			state.status = "failed"
		},
		[updateBooking.fulfilled]: (state, action) => {
			state.status = "succeeded"
			const bookingUp = action.payload
			state.bookings = state.bookings.map((booking) =>
				booking._id === bookingUp._id ? bookingUp : booking
			)
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
			state.status = action.payload.bookings.status
			state.error = action.payload.bookings.error
		},
	},
})

//export const { setUsers } = mariachisSlice.actions

export default bookingsSlice.reducer
export const { setDispBookingTabActive } = bookingsSlice.actions

// export const { setAdminUser } = bookingsSlice.actions

export const selectAllBookings = (state) => state.bookings.bookings
export const selectStatus = (state) => state.bookings.status
export const selectError = (state) => state.bookings.error
