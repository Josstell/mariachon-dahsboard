import Image from "next/image"
import React from "react"
import BookingIcon from "../components/SVG/Icons/BookingIcon"

const test = () => {
	return (
		<div>
			<div className="w-20 h-20">
				<Image
					src={"/images/icons/trompeta.svg"}
					layout="fill"
					objectFit="cover"
					alt=""
				/>
			</div>
			<BookingIcon className="fill-red-400" />
		</div>
	)
}

export default test
