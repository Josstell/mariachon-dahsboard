import { createClient, createPreviewSubscriptionHook, groq } from "next-sanity"
import createImageUrlBuilder from "@sanity/image-url"

import { config } from "./config"

if (!config.projectId) {
	throw Error("The Project ID is not set. Check your environment variables.")
}
export const urlFor = (source) => createImageUrlBuilder(config).image(source)

export const imageBuilder = (source) =>
	createImageUrlBuilder(config).image(source)

export const usePreviewSubscription = createPreviewSubscriptionHook(config)

export const client = createClient(config)

export const previewClient = createClient({
	...config,
	useCdn: false,
})

export const getClient = (usePreview) => (usePreview ? previewClient : client)

export default client

/****************************************************************************/

const query = groq`
*[_type == "user"   ] | order(_createdAt desc)
`

export const subscriptionUser = client.listen(query)

const queryMar = groq`
*[_type == "mariachi" ]| order(_createdAt desc)
`
export const subscriptionMariachi = client.listen(queryMar)

const queryBook = groq`
*[_type == "booking"  ]| order(_createdAt desc)
`

export const subscriptionBooking = client.listen(queryBook)

export const getBookingsByQuery = (before, after) => {
	return encodeURIComponent(`*[_type == "booking"  && !(_id in path('drafts.**')) && (dateTime(dateAndTime) >= dateTime("${before}")) && (dateTime(dateAndTime) <= dateTime("${after}"))] | order(dateTime(dateAndTime) desc) {
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
    }`)
}
