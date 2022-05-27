import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { HYDRATE } from "next-redux-wrapper"
import client from "@lib/sanity"
import { groq } from "next-sanity"

const initialState = {
	mariachis: [],
	status: "idle",
	error: null,
}
const query = groq`
*[_type == "mariachi"]{
  _id,
  name,
  description[0]{
    children[0]{
      text
    }
  },
address,
tel,
service,
members,
slug{
  current
},
region,
logo,
coordinator->{
  _id,
  name,
  tel,
 email,
  slug{
  current
}
}  
}
`
export const fetchMariachis = createAsyncThunk(
	"mariachis/fetchMariachis",
	async (isAdmin) => {
		if (isAdmin) {
			const mariachis = await client.fetch(query)
			console.log("Hola mariachis", mariachis)
			return mariachis
		} else {
			return []
		}

		//dispatch(setAdminUser(userAdmin))
	}
)

const mariachisSlice = createSlice({
	name: "mariachis",
	initialState,
	reducers: {
		// setAdminUser: (state, action) => {
		// 	state.admin = action.payload
		// },
	},

	extraReducers: {
		[fetchMariachis.pending]: (state) => {
			state.status = "loading"
		},
		[fetchMariachis.fulfilled]: (state, action) => {
			state.status = "succeeded"
			state.mariachis = action.payload
		},
		[fetchMariachis.rejected]: (state) => {
			state.status = "failed"
		},
		[HYDRATE]: (state, action) => {
			console.log("hydrate mariachis: ", action.payload)

			if (action.payload.mariachis.mariachis.length === 0) {
				console.log("1", state)

				return state
			}

			if (
				action.payload.bookings.bookings.length === 0 &&
				action.payload.mariachis.mariachis.length === 1 &&
				action.payload.users.users.length === 0
			) {
				return { ...state, mariachis: action.payload.mariachis.mariachis }
			}

			if (
				action.payload.bookings.bookings.length === 0 &&
				action.payload.mariachis.mariachis.length === 0 &&
				action.payload.users.users.length === 0
			) {
				return { ...state, mariachis: action.payload.mariachis.mariachis }
			}

			state.mariachis = action.payload.mariachis.mariachis
			state.status = action.payload.mariachis.status
			state.error = action.payload.mariachis.error
		},
	},
})

//export const { setUsers } = mariachisSlice.actions

export default mariachisSlice.reducer
// export const { setAdminUser } = mariachisSlice.actions

export const selectAllMariachis = (state) => state.mariachis.mariachis
export const selectStatus = (state) => state.mariachis.status
export const selectError = (state) => state.mariachis.error
