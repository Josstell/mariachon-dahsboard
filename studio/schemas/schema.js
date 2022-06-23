// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator"

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type"

import userSchema from "./userSchema"
import mariachiSchema from "./mariachiSchema"
import bookingSchema from "./bookingSchema"
import roleSchema from "./roleSchema"
import richText from "./richText"
import imageSchema from "./imageSchema"

import orderItem from "./orderItem"
import paymentResult from "./paymentResult"
import shippingAddress from "./shippingAddress"
import videoSchema from "./videoSchema"

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
	// We name our schema
	name: "default",
	// Then proceed to concatenate our document type
	// to the ones provided by any plugins that are installed
	types: schemaTypes.concat([
		userSchema,
		mariachiSchema,
		bookingSchema,
		roleSchema,
		richText,
		imageSchema,
		videoSchema,
		orderItem,
		paymentResult,
		shippingAddress,
		/* Your types here! */
	]),
})
