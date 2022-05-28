import React, { useMemo } from "react"

const GetLogoWithName = ({ text, numberLetter }) => {
	const logoLetra = useMemo(
		() => `${text.charAt(numberLetter)}`,
		[text, numberLetter]
	)

	return (
		<div>
			<div className="w-10 h-10 bg-slate-50 p-0 m-0 dark:bg-orange-600 flex justify-center items-center text-xl  rounded-full">
				{logoLetra}
			</div>
		</div>
	)
}

export default GetLogoWithName
