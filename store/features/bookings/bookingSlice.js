import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { HYDRATE } from "next-redux-wrapper"
import client from "@lib/sanity"
import { groq } from "next-sanity"

const initialState = {
	bookings: [],
	status: "idle",
	error: null,
}
const query = groq`
*[_type == "booking"]{
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

const bookingsSlice = createSlice({
	name: "bookings",
	initialState,
	reducers: {
		// setAdminUser: (state, action) => {
		// 	state.admin = action.payload
		// },
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
// export const { setAdminUser } = bookingsSlice.actions

export const selectAllBookings = (state) => state.bookings.bookings
export const selectStatus = (state) => state.bookings.status
export const selectError = (state) => state.bookings.error
