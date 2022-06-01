import React from "react"

const SpinnerLoadign = () => {
	return (
		<div className="flex items-center justify-center space-x-2 animate-pulse">
			<div className="w-5 h-5 bg-slate-600 dark:bg-slate-50 rounded-full"></div>
			<div className="w-5 h-5 bg-slate-600 dark:bg-slate-50 rounded-full"></div>
			<div className="w-5 h-5 bg-slate-600 dark:bg-slate-50 rounded-full"></div>
		</div>
	)
}

export default SpinnerLoadign
