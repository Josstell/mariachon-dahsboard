import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { HYDRATE } from "next-redux-wrapper"
import client from "@lib/sanity"
import { groq } from "next-sanity"
import axios from "axios"

const initialState = {
	mariachis: [],
	status: "idle",
	error: null,
	mariachiTabActive: {
		data: true,
		mariachi: false,
		gral: false,
	},
}
const query = groq`
*[_type == "mariachi" && !(_id in path('drafts.**')) ]{
  _id,
  name,
  description,
address,
tel,
service,
members,
slug{
  current
},
region,
logo,
categorySet,
createdBy,
modifiedBy,
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

// get all mariachis
export const fetchMariachis = createAsyncThunk(
	"mariachis/fetchMariachis",
	async (isAdmin) => {
		if (isAdmin) {
			try {
				const mariachis = await client.fetch(query)
				return mariachis
			} catch (error) {
				console.log(error)
			}
		} else {
			return []
		}

		//dispatch(setAdminUser(userAdmin))
	}
)

// update Mariachi

export const updateMariachi = createAsyncThunk(
	"mariachis/updateMariachi",
	async (mariachi, { getState }) => {
		// We send the initial data to the fake API server
		const {
			users: { users },
		} = getState()
		try {
			const { data } = await axios.put("/api/mariachis/update", mariachi)

			if (data) {
				const coordinatorUpdated = users.find(
					(user) => user._id === data.coordinator._ref
				)
				return {
					...data,
					coordinator: coordinatorUpdated,
				}
			}
		} catch (error) {
			const text = { message: "Algo paso! Favor de intentarlo màs tarde." }

			const errorData = {
				data: error?.response?.data ? error?.response?.data : text,
			}

			return errorData
		}
		// The response includes the complete post object, including unique ID
	}
)

// add new mariachi

export const addMariachi = createAsyncThunk(
	"mariachis/addMariachi",
	async (mariachi, { getState }) => {
		// We send the initial data to the fake API server
		const {
			users: { users },
		} = getState()
		try {
			const { data } = await axios.post("/api/mariachis/add", mariachi)

			console.log("Datos agregados:!!!!", data)
			if (data) {
				const coordinatorUpdated = users.find(
					(user) => user._id === data.coordinator._ref
				)

				return {
					...data,
					coordinator: coordinatorUpdated,
				}
			}
		} catch (error) {
			const text = { message: "Algo paso! Favor de intentarlo màs tarde." }

			const errorData = {
				data: error?.response?.data ? error?.response?.data : text,
			}

			return errorData
		}
		// The response includes the complete post object, including unique ID
	}
)

///

const mariachisSlice = createSlice({
	name: "mariachis",
	initialState,
	reducers: {
		// setAdminUser: (state, action) => {
		// 	state.admin = action.payload
		// },
		setDispMariachiTabActive: (state, action) => {
			state.mariachiTabActive = action.payload
		},
		setStatus: (state, action) => {
			state.status = action.payload
		},
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
		[updateMariachi.fulfilled]: (state, action) => {
			if (action.payload.data) {
				state.status = "failed"
				state.error = "Algo paso, por favor intentelo nuevamente."
			} else {
				state.status = "succeeded"
				const mariachiUp = action.payload
				state.mariachis = state.mariachis.map((mariachi) =>
					mariachi._id === mariachiUp._id ? mariachiUp : mariachi
				)
			}
		},
		[addMariachi.fulfilled]: (state, action) => {
			if (action.payload.data) {
				state.status = "failed"
				state.error = "Algo paso, por favor intentelo nuevamente."
			} else {
				state.status = "succeeded"
				state.mariachis.push(action.payload)
			}
		},
		[HYDRATE]: (state, action) => {
			if (
				action.payload.bookings.bookings.length === 0 &&
				action.payload.mariachis.mariachis.length === 1 &&
				action.payload.users.users.length === 0
			) {
				return { ...state, mariachis: action.payload.mariachis.mariachis }
			}

			if (action.payload.mariachis.mariachis.length === 0) {
				return state
			}

			state.mariachis = action.payload.mariachis.mariachis
			state.status = action.payload.mariachis.status
			state.error = action.payload.mariachis.error
		},
	},
})

//export const { setUsers } = mariachisSlice.actions

export default mariachisSlice.reducer
export const { setDispMariachiTabActive, setStatus } = mariachisSlice.actions

export const selectAllMariachis = (state) => state.mariachis.mariachis
export const selectStatus = (state) => state.mariachis.status
export const selectError = (state) => state.mariachis.error
