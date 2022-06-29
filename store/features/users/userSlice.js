import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { HYDRATE } from "next-redux-wrapper"
import client from "@lib/sanity"
import { groq } from "next-sanity"
import axios from "axios"

const initialState = {
	users: [],
	admin: {},
	userUpdate: {},
	userById: {},
	status: "idle",
	error: null,
}
const query = groq`
*[_type == "user" && !(_id in path('drafts.**'))]
`

// get all users
export const fetchUsersNew = createAsyncThunk(
	"users/fetchUsersNew",
	async (session) => {
		try {
			const users = await client.fetch(query)
			if (!(users.length === 0)) {
				console.log("si entra!!!!!!", users.length)
				const userAdmin = users.find(
					(user) => user.email === session.user.email
				)

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
				const sesuser = session.user
				console.log("Session", session)
				return {
					users: [sesuser],
					admin: { ...session.user, exist: false, isAdmin: false },
				}
			}
		} catch (error) {
			console.log(error)
		}

		//dispatch(setAdminUser(userAdmin))
	}
)

// New user

// export const createNewUser = createAsyncThunk("users/createNewUser", async(newUser) => {

// })

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
			const { data } = await axios.post("/api/users/add", newUser)
			return data
		} catch (error) {
			return error.response.data
		}
		// The response includes the complete post object, including unique ID
	}
)

/// get user by Id

// const queryUserById = groq`*[_type == "user" && _id == $id][0]{
//   _id,
//   categorySet,
//   email,
//   name,
//   tel,
//   city,
//   region
// }
// 	`

// export const fetchUserbyId = createAsyncThunk(
// 	"user/fetchUserbyId",
// 	// The payload creator receives the partial `{title, content, user}` object
// 	async (newUser, { dispatch }) => {
// 		// We send the initial data to the fake API server
// 		try {
// 			const users = await client.fetch(queryUserById, { id: newUser._ref })
// 			return users
// 		} catch (error) {
// 			return error.response.data
// 		}
// 		// The response includes the complete post object, including unique ID
// 	}
// )

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
		getUserById: (state, action) => {
			const user = state.users.find((user) => user._id === action.payload)
			state.userById = user
		},
		setStatusUser: (state, action) => {
			state.status = action.payload
		},
	},

	extraReducers: {
		[fetchUsersNew.pending]: (state) => {
			state.status = "loading"
		},
		[fetchUsersNew.fulfilled]: (state, action) => {
			const adminUsr = action.payload?.admin
			console.log("Exito", adminUsr)
			state.admin = { ...adminUsr }
			state.status = "succeeded"
			state.users = action.payload?.users
		},
		[fetchUsersNew.rejected]: (state) => {
			state.status = "failed"
		},
		[addNewUser.pending]: (state) => {
			state.status = "loading"
		},
		[addNewUser.fulfilled]: (state, action) => {
			console.log("user:!!!", action.payload, state.users.users)
			if (action.payload.message) {
				state.status = "failed"
				state.error = action.payload.message
			} else {
				state.status = "succeeded"
				state.users.push(action.payload)
			}
		},

		[updateUser.pending]: (state) => {
			state.status = "loading"
		},

		[updateUser.fulfilled]: (state, action) => {
			state.status = "succeeded"
			state.userUpdate = {}
			const userAd = action.payload

			if (action.payload?.isAdmin) {
				state.admin = action.payload
				state.users = state.users.map((user) =>
					user._id === userAd._id ? userAd : user
				)
			} else {
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
					admin: action.payload.users.admin,
					status: action.payload.users.status,
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
export const { setAdminUser, setUserUpdate, setStatusUser, getUserById } =
	usersSlice.actions

export const selectAllUsers = (state) => state.users.users

export const selectUserAdmin = (state) => state.users.admin
export const selectUserUpdate = (state) => state.users.userUpdate
export const selectStatusUser = (state) => state.users.status
export const selectError = (state) => state.users.error
