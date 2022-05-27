import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { HYDRATE } from "next-redux-wrapper"
import client from "@lib/sanity"
import { groq } from "next-sanity"

const initialState = {
	users: [],
	admin: {},
	status: "idle",
	error: null,
}
const query = groq`
*[_type == "user"]
`
export const fetchUsers = createAsyncThunk(
	"users/fetchUsers",
	async (session) => {
		const users = await client.fetch(query)
		console.log("client: ", users)
		if (users.length > 0) {
			const userAdmin = users.find((user) => user.email === session.user.email)
			console.log("Si entramos", userAdmin)

			if (!(userAdmin === undefined)) {
				const admin = userAdmin.categorySet.find(
					(category) => category === "admin"
				)
				return {
					users: users,
					admin: {
						...userAdmin,
						exist: true,
						isAdmin: admin === "admin" ? true : false,
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

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		setAdminUser: (state, action) => {
			state.admin = action.payload
		},
	},

	extraReducers: {
		[fetchUsers.pending]: (state) => {
			state.status = "loading"
		},
		[fetchUsers.fulfilled]: (state, action) => {
			state.status = "succeeded"
			state.users = action.payload.users
			state.admin = action.payload.admin
		},
		[fetchUsers.rejected]: (state) => {
			state.status = "failed"
		},
		[HYDRATE]: (state, action) => {
			console.log("hydrate users: ", action.payload)
			console.log("aqui", state)

			if (
				action.payload.users.users.length === 0 ||
				action.payload.users.admin === {}
			) {
				return state
			}

			if (
				action.payload.bookings.bookings.length === 0 &&
				action.payload.mariachis.mariachis.length === 0 &&
				action.payload.users.users.length === 0
			) {
				return state
			}

			if (
				action.payload.bookings.bookings.length === 0 &&
				action.payload.mariachis.mariachis.length === 1 &&
				action.payload.users.users.length === 0
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
export const { setAdminUser } = usersSlice.actions

export const selectAllUsers = (state) => state.users.users
export const selectUserAdmin = (state) => state.users.admin
export const selectStatus = (state) => state.users.status
export const selectError = (state) => state.users.error
