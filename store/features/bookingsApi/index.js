// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import { HYDRATE } from "next-redux-wrapper"

// Define a service using a base URL and expected endpoints

const queryBookings = encodeURIComponent(
	`*[_type == "booking"  && !(_id in path('drafts.**'))]| order(_createdAt desc){
 _id,
 reserva,
 host,
 dateCreated,
dateModified,
createdBy,
modifiedBy,
client->{
  _id,
  name,
  tel,
  email
},
sendTo->{
	_id,
	name
},
dateAndTime,
  message,
  playlist,
  price,
  qty,
  userName,
  status,
  shippingAddress,
  paymentResult,

  orderItems[0]{
    _key,
    deposit,
    price,
    qty,
	fee,
	priceOptionSelected,
    service,
	  members,
categorySet,
    mariachi->{
		_id,
    name,
	crew,
tel,
coordinator->{
  _id,
  name,
  tel
},
members,
service,
categorySet,
region,
logo,

  }

  }
    }`
)
const queryBookingById = encodeURIComponent(
	`*[_type == "booking"  && (_id == $id) ][0]{
 _id,
 reserva,
 host,
 dateCreated,
dateModified,
createdBy,
modifiedBy,
client->{
  _id,
  name,
  tel,
  email
},
sendTo->{
	_id,
	name
},
dateAndTime,
  message,
  playlist,
  price,
  qty,
  userName,
  status,
  shippingAddress,
  paymentResult,

  orderItems[0]{
    _key,
    deposit,
    price,
    qty,
	fee,
	priceOptionSelected,
    service,
	  members,
categorySet,
    mariachi->{
		_id,
    name,
	crew,
tel,
coordinator->{
  _id,
  name,
  tel
},
members,
service,
categorySet,
region,
logo,

  }

  }
    }`
)

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const tokenWithWriteAccess = process.env.NEXT_PUBLIC_SANITY_API_TOKEN

const sanityAPI = `https://${projectId}.api.sanity.io/v2021-06-07/data`

export const bookingsSanityApi = createApi({
	reducerPath: "bookingsApi",

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
	tagTypes: ["Bookings"],

	extractRehydrationInfo(action, { reducerPath }) {
		if (action.type === HYDRATE) {
			return action.payload[reducerPath]
		}
	},
	endpoints: (builder) => ({
		getBookings: builder.query({
			query: () => `/query/${dataset}?query=${queryBookings}`,
			providesTags: ["Bookings"],
		}),
		getBookingAPIById: builder.query({
			query: (id) =>
				`/query/${dataset}?query=${queryBookingById}&%24id="${id}"`,
		}),
		addUpdateNewBooking: builder.mutation({
			query: (mutations) => ({
				url: `/mutate/${dataset}?returnDocuments=true`,
				method: "POST",
				body: { mutations },
			}),
			invalidatesTags: ["Bookings"],
		}),
	}),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
	useGetBookingsQuery,
	useGetBookingAPIByIdQuery,
	useAddUpdateNewBookingMutation,
	util: { getRunningOperationPromises },
} = bookingsSanityApi

export const { getBookings, getBookingAPIById, addUpdateNewBooking } =
	bookingsSanityApi.endpoints
