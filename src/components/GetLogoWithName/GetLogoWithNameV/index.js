import React, { useMemo } from "react"

const GetLogoWithNameV = ({ text, numberLetter }) => {
	const logoLetra = useMemo(
		() => `${text.charAt(numberLetter)}`,
		[text, numberLetter]
	)

	return (
		<div className="w-full h-full bg-slate-50 p-0 m-0 dark:bg-orange-600 flex justify-center items-center text-xl  rounded-full">
			{logoLetra}
		</div>
	)
}

export default GetLogoWithNameV
