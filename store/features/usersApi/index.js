// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import { HYDRATE } from "next-redux-wrapper"

// Define a service using a base URL and expected endpoints

const queryUser = encodeURIComponent(
	`*[_type == "user" && !(_id in path('drafts.**'))] | order(_createdAt desc)`
)
const queryUserById = encodeURIComponent(`*[_type=="user"&&(_id==$id)][0]`)
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const tokenWithWriteAccess = process.env.SANITY_API_TOKEN

const sanityAPI = `https://${projectId}.api.sanity.io/v2021-10-21/data/query/${dataset}`

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
			query: () => `?query=${queryUser}`,
		}),
		getUserAPIById: builder.query({
			query: (id) => `?query=${queryUserById}&%24id="${id}"`,
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
