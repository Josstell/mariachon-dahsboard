import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	fetchBookings,
	selectAllBookings,
} from "store/features/bookings/bookingSlice"
import {
	fetchMariachis,
	selectAllMariachis,
} from "store/features/mariachis/mariachiSlice"
import { fetchUsersNew, selectUserAdmin } from "store/features/users/userSlice"

export default function useFetchUsers(session) {
	const userAdmin = useSelector(selectUserAdmin)
	const mariachiData = useSelector(selectAllMariachis)
	const reservaData = useSelector(selectAllBookings)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!userAdmin.exist) {
			const reloadUsers = async () => {
				await dispatch(fetchUsersNew(session))
			}
			reloadUsers()
			//	router.push("/")
		}

		if (!(mariachiData.length > 0)) {
			dispatch(fetchMariachis(true))
		}
		if (!(reservaData.length > 0)) {
			dispatch(fetchBookings(true))
		}
	}, [userAdmin, dispatch, session, mariachiData, reservaData])

	return userAdmin
}
