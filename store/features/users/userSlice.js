import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { HYDRATE } from "next-redux-wrapper"
import client from "@lib/sanity"
import { groq } from "next-sanity"
import axios from "axios"

const initialState = {
	users: [],
	usersSearch: [],
	admin: {},
	userUpdate: {},
	userById: {},
	status: "idle",
	statusGSUser: "idle",
	error: null,
}
const query = groq`
*[_type == "user" && !(_id in path('drafts.**'))] | order(_createdAt desc)
`

// get all users
export const fetchUsersNew = createAsyncThunk(
	"users/fetchUsersNew",
	async (session) => {
		console.log("Session: ", session)
		try {
			const users = await client.fetch(query)

			if (!(users.length === 0)) {
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

export const updateUser = createAsyncThunk(
	"users/updateUser",
	async (user, { dispatch }) => {
		// We send the initial data to the fake API server

		try {
			const { data } = await axios.put("/api/users/update", user)

			const admin = data.categorySet.find((category) => category === "Admin")

			const userData = {
				...user,
				exist: true,
				isAdmin: admin === "Admin" ? true : false,
			}
			return dispatch(addClientToGoogleSheet(userData))
		} catch (error) {
			const text = {
				message: "Algo paso! No se actualizaron datos en Base de datos.",
			}

			const errorData = {
				data: error?.response?.data ? error?.response?.data : text,
			}

			return errorData
		}
	}
)

// add new user
export const addNewUser = createAsyncThunk(
	"user/addNewUser",
	// The payload creator receives the partial `{title, content, user}` object
	async (newUser, { dispatch }) => {
		// We send the initial data to the fake API server

		try {
			const { data } = await axios.post("/api/users/add", newUser)

			const admin = data.categorySet.find((category) => category === "Admin")

			const newData = {
				...newUser,
				exist: true,
				isAdmin: admin === "Admin" ? true : false,
				_id: data._id,
			}
			return dispatch(addClientToGoogleSheet(newData))
		} catch (error) {
			const text = {
				message: "Algo paso! No se guardaron datos en Base de datos.",
			}

			const errorData = {
				data: error?.response?.data ? error?.response?.data : text,
			}

			return errorData
		}

		// The response includes the complete post object, including unique ID
	}
)

/// get user by Id

export const addClientToGoogleSheet = createAsyncThunk(
	"users/addClientToGoogleSheet",
	async (client) => {
		try {
			//`${NEXT_PUBLIC_URL_API}/api/google-sheet/add/client`,
			const { data } = await axios.post(`/api/google-sheet/add/client`, client)

			if (data) {
				return {
					data: data,
					userData: client,
				}
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
		setUsers: (state, action) => {
			state.users = action.payload
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
		setStatusGSUser: (state, action) => {
			state.statusGSUser = action.payload
		},
		setUpdatedUser: (state, action) => {
			const userToUpdate = action.payload
			const target = state.users.find((obj) => obj._id === userToUpdate._id)
			if (userToUpdate?.isAdmin) {
				state.admin = userToUpdate
				Object.assign(target, userToUpdate)
			} else {
				Object.assign(target, userToUpdate)
			}
		},
		setNewUser: (state, action) => {
			const userToUpdate = action.payload
			//const target = state.users.find((obj) => obj._id === userToUpdate._id)
			state.users.unshift(userToUpdate)
			// if (!target) {
			// }
		},
		setUsersSearch: (state, action) => {
			state.usersSearch = action.payload
		},
		setUpdatedUserSearch: (state, action) => {
			const userToUpdate = action.payload
			const target = state.usersSearch.find(
				(obj) => obj._id === userToUpdate._id
			)
			if (userToUpdate?.isAdmin) {
				state.admin = userToUpdate
				Object.assign(target, userToUpdate)
			} else {
				Object.assign(target, userToUpdate)
			}
		},
		setNewUserSearch: (state, action) => {
			const userToUpdate = action.payload
			const target = state.usersSearch.find(
				(obj) => obj._id === userToUpdate._id
			)
			if (!target) {
				state.usersSearch.unshift(userToUpdate)
			}
		},
	},

	extraReducers: {
		[fetchUsersNew.pending]: (state) => {
			state.status = "loading"
		},
		[fetchUsersNew.fulfilled]: (state, action) => {
			const adminUsr = action.payload?.admin
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
		// [addNewUser.rejected]: (state) => {
		// 	state.status = "failed"
		// 	state.error = "¡Algo paso faver de intentarlo más tarde!"
		// },
		[addNewUser.fulfilled]: (state, action) => {
			const userToAdd = action.payload?.payload?.userData
			if (action.payload?.payload?.userData) {
				const target = state.users.find((obj) => obj._id === userToAdd._id)
				state.status = "succeeded"
				if (!target) {
					state.users.unshift(userToAdd)
				}
			} else {
				state.status = "failed"
				state.error = action.payload.data
			}
		},
		// [updateUser.rejected]: (state) => {
		// 	state.error = "¡Algo paso faver de intentarlo más tarde!"
		// 	state.status = "failed"
		// },
		[updateUser.pending]: (state) => {
			state.status = "loading"
		},
		[updateUser.fulfilled]: (state, action) => {
			state.userUpdate = {}
			const userAd = action.payload?.payload?.userData

			const target = state.users.find((obj) => obj._id === userAd._id)

			if (userAd) {
				state.status = "succeeded"
				if (userAd?.isAdmin) {
					state.admin = userAd
					Object.assign(target, userAd)
				} else {
					Object.assign(target, userAd)
				}
			} else {
				state.statusGSUser = "failed"
				state.error = "Error en la carga de google sheet"
			}
		},
		// [addClientToGoogleSheet.rejected]: (state) => {
		// 	state.error = "¡Algo paso favor de intentarlo más tarde!"
		// 	state.status = "failed"
		// },
		[addClientToGoogleSheet.fulfilled]: (state, action) => {
			if (action.payload?.userData) {
				state.statusGSUser = "succeeded"
			} else {
				state.statusGSUser = "failed"
				state.error = "Error en la carga de google sheet"
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
					statusGSUser: action.payload.users.statusGSUser,
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
			state.statusGSUser = action.payload.users.statusGSUser
			state.error = action.payload.users.error
		},
	},
})

//export const { setUsers } = usersSlice.actions

export default usersSlice.reducer
export const {
	setAdminUser,
	setUsers,
	setUserUpdate,
	setStatusUser,
	getUserById,
	setStatusGSUser,
	setUpdatedUser,
	setNewUser,
	setUsersSearch,
	setUpdatedUserSearch,
	setNewUserSearch,
} = usersSlice.actions

export const selectAllUsers = (state) => state.users.users

export const selectUserAdmin = (state) => state.users.admin
export const selectUserUpdate = (state) => state.users.userUpdate
export const selectStatusUser = (state) => state.users.status
export const selectStatusGSUser = (state) => state.users.statusGSUser
export const selectUsersSearch = (state) => state.users.usersSearch

export const selectError = (state) => state.users.error
