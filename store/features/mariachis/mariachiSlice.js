import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { HYDRATE } from "next-redux-wrapper"
import client from "@lib/sanity"
import { groq } from "next-sanity"
import axios from "axios"

//const { NEXT_PUBLIC_URL_API } = process.env

const initialState = {
	mariachis: [],
	status: "idle",
	statusGS: "idle",
	error: null,
	messageAPIS: "",
	mariachiTabActive: {
		data: true,
		mariachi: false,
		gral: false,
	},
}
const query = groq`
*[_type == "mariachi" && !(_id in path('drafts.**')) ]| order(_createdAt desc){
  _id,
  createdBy,
modifiedBy,
dateCreated,
dateModified,
  slug{
  current
},
name,
description,
address,
city,
region,
cp,
tel,
coordinator->{
  _id,
  name,
  tel
},
crew,
members,
service,
categorySet,
logo, 
images,
videos,
stage

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
	async (mariachi, { getState, dispatch }) => {
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

				const dataUpdate = { ...data, coordinator: coordinatorUpdated }
				return dispatch(addMariachiToGoogleSheet(dataUpdate))
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
	async (mariachi, { getState, dispatch }) => {
		// We send the initial data to the fake API server
		const {
			users: { users },
		} = getState()
		try {
			const { data } = await axios.post("/api/mariachis/add", mariachi)

			if (data) {
				const coordinatorUpdated = users.find(
					(user) => user._id === data.coordinator._ref
				)

				const mariachiData = {
					...mariachi,
					_id: data._id,
					coordinator: coordinatorUpdated,
				}

				return dispatch(addMariachiToGoogleSheet(mariachiData))
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

// add update  mariachi to GoogleSheet

export const addMariachiToGoogleSheet = createAsyncThunk(
	"mariachis/addMariachiToGoogleSheet",
	async (mariachi) => {
		try {
			//`${NEXT_PUBLIC_URL_API}/api/google-sheet/add/mariachi`,
			const { data } = await axios.post(
				`/api/google-sheet/add/mariachi`,
				mariachi
			)

			return {
				data,
				mariachiData: mariachi,
			}
		} catch (error) {
			const text = {
				message: "Algo paso! No se guardaron datos en Google Sheet.",
			}

			const errorData = {
				data: error?.response?.data ? error?.response?.data : text,
			}

			return errorData
		}
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
		setStatusGS: (state, action) => {
			state.statusGS = action.payload
		},
		setUpdatedMariachi: (state, action) => {
			const mariachiToUpdate = action.payload
			const target = state.mariachis.find(
				(obj) => obj._id === mariachiToUpdate._id
			)
			Object.assign(target, mariachiToUpdate)
		},
		setNewMariachi: (state, action) => {
			const mariachiToUpdate = action.payload
			const target = state.mariachis.find(
				(obj) => obj._id === mariachiToUpdate._id
			)
			if (!target) {
				state.mariachis.unshift(mariachiToUpdate)
			}
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
			if (action.payload?.payload?.mariachiData) {
				state.statusGS = "succeeded"
				state.status = "succeeded"
			} else {
				state.status = "failed"
				state.error = "Algo paso, por favor intentelo nuevamente."
			}
		},
		[addMariachiToGoogleSheet.fulfilled]: (state, action) => {
			if (action.payload.mariachiData) {
				state.statusGS = "succeeded"
				state.messageAPIS = action.payload.data
			} else {
				state.statusGS = "failed"
				state.error = "Error en la carga de google sheet"
			}
		},
		[addMariachi.fulfilled]: (state, action) => {
			if (action.payload?.payload?.mariachiData) {
				state.statusGS = "succeeded"
				state.status = "succeeded"
			} else {
				state.status = "failed"
				state.error = "Algo paso, por favor intentelo nuevamente."
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
export const {
	setDispMariachiTabActive,
	setStatus,
	setStatusGS,
	setUpdatedMariachi,
	setNewMariachi,
} = mariachisSlice.actions

export const selectAllMariachis = (state) => state.mariachis.mariachis
export const selectStatus = (state) => state.mariachis.status
export const selectStatusGS = (state) => state.mariachis.statusGS

export const selectError = (state) => state.mariachis.error

export const selectMariachiBySlug = (state, slug) =>
	state.mariachis.mariachis.find((mar) => mar.slug === slug)
