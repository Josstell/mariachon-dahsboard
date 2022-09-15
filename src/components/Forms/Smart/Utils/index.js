import React from "react"

const Separator = ({ hidden }) => {
	return (
		<div
			className={`mt-5 border-t-2 border-slate-50/40 w-full ${
				!hidden && "hidden"
			}`}
		></div>
	)
}

export default Separator
