import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectStatusUser } from "store/features/users/userSlice"

const useSearchUserByCategory = (users, categorySelected) => {
	const [coorSelect, setCoorSelect] = useState([])

	const status = useSelector(selectStatusUser)

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

	useEffect(() => {
		const categories = []
		if (status === "succeeded") {
			users.map((user, index) => {
				const category = user.categorySet.find(
					(category) => category === categorySelected
				)
				if (category != undefined) categories.push(users[index])
			})

			setCoorSelect(categories)
		}
	}, [status])

	return coorSelect
}

export default useSearchUserByCategory
