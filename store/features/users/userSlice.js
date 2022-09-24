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

export const updateUser = createAsyncThunk(
	"users/updateUser",
	async (user, { dispatch }) => {
		// We send the initial data to the fake API server

		console.log("actualizar usuario", user)

		try {
			const { data } = await axios.put("/api/users/update", user)

			const admin = data.categorySet.find((category) => category === "Admin")

			const userData = {
				...user,
				exist: true,
				isAdmin: admin === "Admin" ? true : false,
			}
			console.log("data!!!", userData)
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

		console.log("add nuevo", newUser)

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
			console.log("addUser Data", action.payload)

			if (action.payload?.payload?.userData) {
				state.status = "succeeded"
				state.users.push(action.payload?.payload?.userData)
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
			state.status = "succeeded"
			state.userUpdate = {}
			const userAd = action.payload?.payload?.userData

			console.log("Update Data", action.payload, userAd)

			if (userAd) {
				if (userAd?.isAdmin) {
					state.admin = userAd
					const index = state.users.findIndex((user) => user._id === userAd._id)
					console.log("admin", index)

					if (index) {
						state.users[index] = userAd
					}
				} else {
					console.log("noadmin")
					const index = state.users.findIndex((user) => user._id === userAd._id)
					state.users[index] = userAd
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
			console.log("GS completed", action.payload)
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
	setUserUpdate,
	setStatusUser,
	getUserById,
	setStatusGSUser,
} = usersSlice.actions

export const selectAllUsers = (state) => state.users.users

export const selectUserAdmin = (state) => state.users.admin
export const selectUserUpdate = (state) => state.users.userUpdate
export const selectStatusUser = (state) => state.users.status
export const selectStatusGSUser = (state) => state.users.statusGSUser

export const selectError = (state) => state.users.error
