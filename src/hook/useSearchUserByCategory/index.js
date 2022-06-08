import { useEffect, useState } from "react"

const useSearchUserByCategory = (users, categorySelected) => {
	const [coorSelect, setCoorSelect] = useState([])

	useEffect(() => {
		const categories = []
		users.map((user, index) => {
			const category = user.categorySet.find(
				(category) => category === categorySelected
			)
			if (category != undefined) categories.push(users[index])
		})

		setCoorSelect(categories)
	}, [])

	return coorSelect
}

export default useSearchUserByCategory
