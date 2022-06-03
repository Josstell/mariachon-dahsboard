import { useEffect, useState } from "react"

export default function useCategoryVar(category) {
	const [categoryVars, setCategoryVars] = useState({
		category: "",
		porcentage: "",
	})

	useEffect(() => {
		switch (category) {
			case "Economico":
				setCategoryVars({
					category: category,
					porcentage: "w-2/6",
				})
				break
			case "Normal":
				setCategoryVars({
					category: category,
					porcentage: "w-8/12",
				})
				break
			case "Premium":
				setCategoryVars({
					category: category,
					porcentage: "w-full",
				})
				break

			default:
				break
		}
	}, [category])

	return categoryVars
}
