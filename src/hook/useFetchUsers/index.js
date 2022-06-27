import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
	fetchBookings,
	selectAllBookings,
	selectStatusBook,
	setStatusBooking,
} from "store/features/bookings/bookingSlice"
import {
	fetchMariachis,
	selectAllMariachis,
	setStatus,
	selectStatus,
} from "store/features/mariachis/mariachiSlice"
import {
	fetchUsersNew,
	selectStatusUser,
	selectUserAdmin,
	setStatusUser,
} from "store/features/users/userSlice"

export default function useFetchUsers(session) {
	const userAdmin = useSelector(selectUserAdmin)
	const mariachiData = useSelector(selectAllMariachis)
	const reservaData = useSelector(selectAllBookings)
	const statusUser = useSelector(selectStatusUser)
	const status = useSelector(selectStatus)
	const statusBook = useSelector(selectStatusBook)
	const dispatch = useDispatch()

	useEffect(() => {
		if (!userAdmin.exist) {
			dispatch(fetchUsersNew(session))
		}
		//	router.push("/")
		if (!(mariachiData.length > 0) && status === "idle") {
			dispatch(fetchMariachis(true))
		}
		if (!(reservaData.length > 0)) {
			dispatch(fetchBookings(true))
		}
	}, [])

	useEffect(() => {
		console.log("entra", status, statusBook, statusUser)
		if (
			!(status === "idle") ||
			!(statusUser === "idle") ||
			!(statusBook === "idle")
		) {
			dispatch(setStatus("idle"))

			dispatch(setStatusUser("idle"))
			dispatch(setStatusBooking("idle"))
		}
	}, [statusUser, status, statusBook])

	return userAdmin
}
