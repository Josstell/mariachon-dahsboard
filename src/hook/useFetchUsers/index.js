import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers, selectUserAdmin } from "store/features/users/userSlice"

export default function useFetchUsers(session) {
	const userAdmin = useSelector(selectUserAdmin)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!userAdmin.exist) {
			const reloadUsers = async () => {
				await dispatch(fetchUsers(session))
			}
			reloadUsers()
			//	router.push("/")
		}
	}, [userAdmin, dispatch, session])

	return userAdmin
}