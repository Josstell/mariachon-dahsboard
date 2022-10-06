import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"

import usersReducer from "./features/users/userSlice"
import mariachisReducer from "./features/mariachis/mariachiSlice"
import bookingReducer from "./features/bookings/bookingSlice"
import { usersSanityApi } from "./features/usersApi"

const makeStore = () =>
	configureStore({
		reducer: {
			users: usersReducer,
			mariachis: mariachisReducer,
			bookings: bookingReducer,
			[usersSanityApi.reducerPath]: usersSanityApi.reducer,
		},
		middleware: (gDM) => gDM().concat(usersSanityApi.middleware),

		devTools: true,
	})

export const wrapper = createWrapper(makeStore)
