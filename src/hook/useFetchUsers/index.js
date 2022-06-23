import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	fetchBookings,
	selectAllBookings,
} from "store/features/bookings/bookingSlice"
import {
	fetchMariachis,
	selectAllMariachis,
	setStatus,
} from "store/features/mariachis/mariachiSlice"
import {
	fetchUsersNew,
	selectUserAdmin,
	setStatusUser,
} from "store/features/users/userSlice"

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
		dispatch(setStatus("idle"))

		dispatch(setStatusUser("idle"))
	}, [userAdmin, dispatch, session, mariachiData, reservaData])

	return userAdmin
}
