// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import { HYDRATE } from "next-redux-wrapper"

// Define a service using a base URL and expected endpoints

const sanityAPI = `/api/users`

export const usersSanityApi = createApi({
	reducerPath: "usersApi",
	baseQuery: retry(fetchBaseQuery({ baseUrl: sanityAPI }), { maxRetries: 5 }),
	keepUnusedDataFor: 60,
	refetchOnMountOrArgChange: true,
	refetchOnFocus: true,
	refetchOnReconnect: true,
	pollingInterval: 3000,

	extractRehydrationInfo(action, { reducerPath }) {
		if (action.type === HYDRATE) {
			return action.payload[reducerPath]
		}
	},
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => `/get/all`,
		}),
		getUserAPIById: builder.query({
			query: (id) => `/get/${id}`,
		}),
	}),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetUsersQuery,
	useGetUserAPIByIdQuery,
	util: { getRunningOperationPromises },
} = usersSanityApi

export const { getUsers, getUserAPIById } = usersSanityApi.endpoints
