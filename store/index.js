import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"

import usersReducer from "./features/users/userSlice"

const makeStore = () =>
	configureStore({
		reducer: {
			users: usersReducer,
		},
		devTools: true,
	})

export const wrapper = createWrapper(makeStore)
