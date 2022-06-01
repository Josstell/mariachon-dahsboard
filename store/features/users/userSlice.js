import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { HYDRATE } from "next-redux-wrapper"
import client from "@lib/sanity"
import { groq } from "next-sanity"
import axios from "axios"

const initialState = {
	users: [],
	admin: {},
	userUpdate: {},
	status: "idle",
	error: null,
}
const query = groq`
*[_type == "user"]
`

// get all users
export const fetchUsersNew = createAsyncThunk(
	"users/fetchUsersNew",
	async (session) => {
		const users = await client.fetch(query)
		console.log("si entra!!!!!!", users)
		if (users.length > 0) {
			const userAdmin = users.find((user) => user.email === session.user.email)

			if (!(userAdmin === undefined)) {
				const admin = userAdmin.categorySet.find(
					(category) => category === "Admin"
				)
				return {
					users: users,
					admin: {
						...userAdmin,
						exist: true,
						isAdmin: admin === "Admin" ? true : false,
					},
				}
			} else {
				return {
					users: users,
					admin: {
						...session.user,
						exist: false,
						isAdmin: false,
					},
				}
			}
		} else {
			return {
				users: users,
				admin: { ...session.user, exist: false, isAdmin: false },
			}
		}

		//dispatch(setAdminUser(userAdmin))
	}
)

// update user

export const updateUser = createAsyncThunk("users/updateUser", async (user) => {
	// We send the initial data to the fake API server
	try {
		const { data } = await axios.put("/api/users/update", user)

		if (data) {
			const admin = data.categorySet.find((category) => category === "Admin")
			return {
				...data,
				exist: true,
				isAdmin: admin === "Admin" ? true : false,
			}
		}
	} catch (error) {
		console.log(error)
	}
	// The response includes the complete post object, including unique ID
})

// add new user
export const addNewUser = createAsyncThunk(
	"user/addNewUser",
	// The payload creator receives the partial `{title, content, user}` object
	async (newUser) => {
		// We send the initial data to the fake API server
		try {
			await axios.post("/api/users/add", newUser)
		} catch (error) {
			console.log(error)
		}
		// The response includes the complete post object, including unique ID
	}
)

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setAdminUser: (state, action) => {
			const data = action.data
			state.admin = { ...state.admin, data }
		},
		setUserUpdate: (state, action) => {
			state.userUpdate = action.payload
		},
	},

	extraReducers: {
		[fetchUsersNew.pending]: (state) => {
			state.status = "loading"
		},
		[fetchUsersNew.fulfilled]: (state, action) => {
			state.status = "succeeded"
			state.users = action.payload.users
			state.admin = action.payload.admin
		},
		[fetchUsersNew.rejected]: (state) => {
			state.status = "failed"
		},
		[addNewUser.pending]: (state) => {
			state.status = "loading"
		},
		[addNewUser.fulfilled]: (state) => {
			state.status = "succeeded"
		},
		[addNewUser.rejected]: (state) => {
			state.status = "failed"
		},

		[updateUser.fulfilled]: (state, action) => {
			state.status = "succeeded"
			state.userUpdate = {}
			const userAd = action.payload

			if (action.payload.isAdmin) {
				state.admin = action.payload
				state.users = state.users.map((user) =>
					user._id === userAd._id ? userAd : user
				)
			}
		},

		[HYDRATE]: (state, action) => {
			if (
				action.payload.bookings.bookings.length === 0 &&
				action.payload.mariachis.mariachis.length === 0 &&
				action.payload.users.users.length === 1
			) {
				return {
					...state,
					users: action.payload.users.users,
				}
			}

			if (
				action.payload.users.users.length === 0 ||
				action.payload.users.admin === {}
			) {
				return state
			}

			state.users = action.payload.users.users
			state.admin = action.payload.users.admin
			state.status = action.payload.users.status
			state.error = action.payload.users.error
		},
	},
})

//export const { setUsers } = usersSlice.actions

export default usersSlice.reducer
export const { setAdminUser, setUserUpdate } = usersSlice.actions

export const selectAllUsers = (state) => state.users.users
export const selectUserAdmin = (state) => state.users.admin
export const selectUserUpdate = (state) => state.users.userUpdate
export const selectStatus = (state) => state.users.status
export const selectError = (state) => state.users.error
