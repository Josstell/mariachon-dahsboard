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
const tokenWithWriteAccess = process.env.NEXT_PUBLIC_SANITY_API_TOKEN

const sanityAPI = `https://${projectId}.api.sanity.io/v2021-06-07/data`

export const usersSanityApi = createApi({
	reducerPath: "usersApi",

	baseQuery: retry(
		fetchBaseQuery({
			baseUrl: sanityAPI,
			prepareHeaders: (headers) => {
				headers.set("authorization", `Bearer ${tokenWithWriteAccess}`)
				return headers
			},
		}),
		{ maxRetries: 5 }
	),
	keepUnusedDataFor: 60,

	//pollingInterval: 3000,
	tagTypes: ["Users"],

	extractRehydrationInfo(action, { reducerPath }) {
		if (action.type === HYDRATE) {
			return action.payload[reducerPath]
		}
	},
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => `/query/${dataset}?query=${queryUser}`,
			providesTags: ["Users"],
		}),
		getUserAPIById: builder.query({
			query: (id) => `/query/${dataset}?query=${queryUserById}&%24id="${id}"`,
		}),
		addUpdateNewUser: builder.mutation({
			query: (mutations) => ({
				url: `/mutate/${dataset}?returnDocuments=true`,
				method: "POST",
				body: { mutations },
			}),
			invalidatesTags: ["Users"],
		}),
	}),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetUsersQuery,
	useGetUserAPIByIdQuery,
	useAddUpdateNewUserMutation,
	util: { getRunningOperationPromises },
} = usersSanityApi

export const { getUsers, getUserAPIById, addUpdateNewUser } =
	usersSanityApi.endpoints
