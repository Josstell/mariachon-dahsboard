import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { selectAllMariachis } from "store/features/mariachis/mariachiSlice"
import { selectAllUsers } from "store/features/users/userSlice"

export default function useGetMaraichiAndCoordinatorByMariachiId(_id) {
	const users = useSelector(selectAllUsers)
	const mariachis = useSelector(selectAllMariachis)

	const [mariachiBy_Id, setMarachiBy_Id] = useState({})
	const [coordinatorById, setCoordinatorById] = useState({})
	useEffect(() => {
		const mariachi = () => {
			return new Promise((resolve) => {
				const mariachiData = mariachis.find((mar) => mar._id === _id)

				resolve(mariachiData)
			})
		}

		mariachi()
			.then((data) => {
				const coordinadorData = users.find(
					(user) => user._id === data.coordinator._id
				)
				setMarachiBy_Id(data)
				setCoordinatorById(coordinadorData)
			})
			.catch((err) => console.log(err))
	}, [])
	return [mariachiBy_Id, coordinatorById]
}

export function useGetUserById(_id) {
	const users = useSelector(selectAllUsers)

	const [userById, setUserById] = useState({})

	useEffect(() => {
		const userById_ = users.find((user) => user._id === _id)
		setUserById(userById_)
	}, [])

	return userById
}
