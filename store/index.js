import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"

import usersReducer from "./features/users/userSlice"
import mariachisReducer from "./features/mariachis/mariachiSlice"
import bookingReducer from "./features/bookings/bookingSlice"

const makeStore = () =>
	configureStore({
		reducer: {
			users: usersReducer,
			mariachis: mariachisReducer,
			bookings: bookingReducer,
		},
		devTools: true,
	})

export const wrapper = createWrapper(makeStore)
