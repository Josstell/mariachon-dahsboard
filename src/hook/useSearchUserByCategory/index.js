import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectStatusUser, setStatusUser } from "store/features/users/userSlice"

const useSearchUserByCategory = (users, categorySelected) => {
	const [coorSelect, setCoorSelect] = useState([])

	const status = useSelector(selectStatusUser)

	const dispatch = useDispatch()

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
			dispatch(setStatusUser("idle"))
		}
	}, [status])

	return coorSelect
}

export default useSearchUserByCategory
