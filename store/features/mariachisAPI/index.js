// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import { HYDRATE } from "next-redux-wrapper"

// Define a service using a base URL and expected endpoints

const queryMariachis = encodeURIComponent(
	`*[_type == "mariachi" && !(_id in path('drafts.**')) ]| order(_createdAt desc){
  _id,
  createdBy,
modifiedBy,
dateCreated,
dateModified,
  slug{
  current
},
name,
description,
address,
city,
region,
cp,
tel,
coordinator->{
  _id,
  name,
  tel
},
crew,
members,
service,
categorySet,
logo, 
images,
videos,
stage
}`
)
const queryMariachiById = encodeURIComponent(
	`*[_type == "mariachi" && (slug.current==$slug)][0]{
  _id,
  createdBy,
modifiedBy,
dateCreated,
dateModified,
  slug{
  current
},
name,
description,
address,
city,
region,
cp,
tel,
coordinator->{
  _id,
  name,
  tel
},
crew,
members,
service,
categorySet,
logo, 
images,
videos,
stage
}`
)

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const tokenWithWriteAccess = process.env.NEXT_PUBLIC_SANITY_API_TOKEN

const sanityAPI = `https://${projectId}.api.sanity.io/v2021-06-07/data`

export const mariachisSanityApi = createApi({
	reducerPath: "mariachisApi",

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
	tagTypes: ["Mariachis"],

	extractRehydrationInfo(action, { reducerPath }) {
		if (action.type === HYDRATE) {
			return action.payload[reducerPath]
		}
	},
	endpoints: (builder) => ({
		getMariachis: builder.query({
			query: () => `/query/${dataset}?query=${queryMariachis}`,
			providesTags: ["Mariachis"],
		}),
		getMariachiAPIById: builder.query({
			query: (slug) =>
				`/query/${dataset}?query=${queryMariachiById}&%24slug="${slug}"`,
		}),
		addUpdateNewMariachi: builder.mutation({
			query: (mutations) => ({
				url: `/mutate/${dataset}`,
				method: "POST",
				body: { mutations },
			}),
			invalidatesTags: ["Mariachis"],
		}),
	}),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetMariachisQuery,
	useGetMariachiAPIByIdQuery,
	useAddUpdateNewMariachiMutation,
	util: { getRunningOperationPromises },
} = mariachisSanityApi

export const { getMariachis, getMariachiAPIById, addUpdateNewMariachi } =
	mariachisSanityApi.endpoints
