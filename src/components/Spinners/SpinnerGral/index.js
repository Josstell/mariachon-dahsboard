import React from "react"

const SpinnerGral = () => {
	return (
		<span className="h-screen w-full flex justify-center items-center">
			<span className="animate-spin relative flex h-10 w-10 rounded-sm bg-purple-700 dark:bg-purple-300 opacity-75"></span>
		</span>
	)
}

export default SpinnerGral
