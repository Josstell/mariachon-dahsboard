import { useEffect, useState } from "react"

export default function useGetMaraichiAndCoordinatorByMariachiId(
	users,
	mariachis,
	_id
) {
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

export function useGetDataById(data, _id) {
	const [userById, setUserById] = useState({})

	useEffect(() => {
		const userById_ = data.find((user) => user._id === _id)
		setUserById(userById_)
	}, [])

	return userById
}
