import { configureStore } from "@reduxjs/toolkit"
import { createWrapper } from "next-redux-wrapper"

import usersReducer from "./features/users/userSlice"
import mariachisReducer from "./features/mariachis/mariachiSlice"
import bookingReducer from "./features/bookings/bookingSlice"
import { usersSanityApi } from "./features/usersApi"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { mariachisSanityApi } from "./features/mariachisAPI"
import { bookingsSanityApi } from "./features/bookingsApi"

const store = configureStore({
	reducer: {
		users: usersReducer,
		mariachis: mariachisReducer,
		bookings: bookingReducer,
		[usersSanityApi.reducerPath]: usersSanityApi.reducer,
		[mariachisSanityApi.reducerPath]: mariachisSanityApi.reducer,
		[bookingsSanityApi.reducerPath]: bookingsSanityApi.reducer,
	},
	middleware: (gDM) =>
		gDM().concat([
			usersSanityApi.middleware,
			mariachisSanityApi.middleware,
			bookingsSanityApi.middleware,
		]),

	devTools: true,
})

setupListeners(store.dispatch)

const makeStore = () => store

export const wrapper = createWrapper(makeStore)
