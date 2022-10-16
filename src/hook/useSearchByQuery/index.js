import { useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { optionsDate } from "src/helpers/utils"
import { setBookingsSearch } from "store/features/bookings/bookingSlice"
import { setMariachisSearch } from "store/features/mariachis/mariachiSlice"
import { setUsersSearch } from "store/features/users/userSlice"
// import { useSelector } from "react-redux"
// import { selectAllMariachis } from "store/features/mariachis/mariachiSlice"
// import { selectAllUsers } from "store/features/users/userSlice"

const useSearchByQuery = (
	data,
	typeElement,
	porServicio,
	byEtapes,
	userByType,
	mariachiCategories,
	typeOfPrices,
	statusReserva,
	byDateBooking,
	regionSelected,
	dataOriginal
) => {
	const [query, setQuery] = useState("")

	const [filteredData, setFilteredData] = useState([])

	const dispatch = useDispatch()

	useMemo(() => {
		// regionSelected, byEtapes,userByType, query
		if (typeElement === "user") {
			let filterRegionSelected
			let filerQuerySelected
			let filterStageSelected
			let filterTypeUserSelected = []
			if (regionSelected === "All") {
				filterRegionSelected = dataOriginal
			} else {
				filterRegionSelected = dataOriginal.filter(
					(data) => data.region === regionSelected
				)
			}

			if (query === "") {
				filerQuerySelected = filterRegionSelected
			} else {
				filerQuerySelected = filterRegionSelected.filter((dat) => {
					return (
						`${dat.name}`.toLowerCase().includes(query.toLowerCase()) ||
						`${dat.email}`.toLowerCase().includes(query.toLowerCase()) ||
						`${dat.tel}`.toLowerCase().includes(query.toLowerCase())
					)
				})
			}

			if (byEtapes === "") {
				filterStageSelected = filerQuerySelected
			} else {
				filterStageSelected = filerQuerySelected.filter((dat) => {
					return dat.stage[0] === byEtapes
				})
			}

			if (userByType === "") {
				filterTypeUserSelected = filterStageSelected
			} else {
				filterStageSelected.forEach((dataFilter) => {
					const typefiltered = dataFilter.categorySet.find((cat) =>
						cat ? cat.toLowerCase() === userByType.toLowerCase() : false
					)

					if (typefiltered !== undefined) {
						filterTypeUserSelected.push(dataFilter)
					}
				})
			}

			setFilteredData(filterTypeUserSelected)
			dispatch(setUsersSearch(filterTypeUserSelected))
		}

		// regionSelected, byEtapes, query,	typeOfPrice, mariachiCategory,

		if (typeElement === "mariachi") {
			let filterRegionSelected
			let filerQuerySelected
			let filterStageSelected

			let filterMariachiCategory = []

			if (regionSelected === "All") {
				filterRegionSelected = dataOriginal
			} else {
				filterRegionSelected = dataOriginal.filter(
					(data) => data.region === regionSelected
				)
			}

			if (query === "") {
				filerQuerySelected = filterRegionSelected
			} else {
				if (porServicio === "" || porServicio === "Inactivo") {
					filerQuerySelected = filterRegionSelected.filter((dat) => {
						return (
							`${dat.name}`.toLowerCase().includes(query.toLowerCase()) ||
							`${dat.coordinator.name}`
								.toLowerCase()
								.includes(query.toLowerCase()) ||
							`${dat.tel}`.toLowerCase().includes(query.toLowerCase())
						)
					})
				} else {
					const queyNum = query * 1
					if (!isNaN(queyNum)) {
						filerQuerySelected = filterRegionSelected.filter((dat) => {
							return dat.service[porServicio][typeOfPrices] * 1 <= queyNum * 1
						})
					} else {
						filerQuerySelected = filterRegionSelected
					}
				}
			}

			if (byEtapes === "") {
				filterStageSelected = filerQuerySelected
			} else {
				filterStageSelected = filerQuerySelected.filter((dat) => {
					return dat.stage[0] === byEtapes
				})
			}

			if (mariachiCategories === "") {
				filterMariachiCategory = filterStageSelected
			} else {
				filterStageSelected.forEach((dataFilter) => {
					const typefiltered = dataFilter.categorySet.find((cat) =>
						cat ? cat.toLowerCase() === mariachiCategories.toLowerCase() : false
					)

					if (typefiltered !== undefined) {
						filterMariachiCategory.push(dataFilter)
					}
				})
			}

			setFilteredData(filterMariachiCategory)
			dispatch(setMariachisSearch(filterMariachiCategory))
		}

		if (typeElement === "booking") {
			let filterRegionSelected
			let filerQuerySelected
			let filterStatusReserva

			let filterByDateReserva

			if (regionSelected === "All") {
				filterRegionSelected = dataOriginal
			} else {
				filterRegionSelected = dataOriginal.filter(
					(data) => data.shippingAddress.region === regionSelected
				)
			}

			if (query === "") {
				filerQuerySelected = filterRegionSelected
			} else {
				filerQuerySelected = filterRegionSelected.filter((dat) => {
					return (
						`${dat.client?.name}`.toLowerCase().includes(query.toLowerCase()) ||
						`${dat.host?.name}`.toLowerCase().includes(query.toLowerCase()) ||
						`${dat.reserva}`.toLowerCase().includes(query.toLowerCase()) ||
						`${dat.orderItems?.mariachi.name}`
							.toLowerCase()
							.includes(query.toLowerCase())
					)
				})
			}

			// if (byEtapes === "") {
			// 	filterStageSelected = filerQuerySelected
			// } else {
			// 	filterStageSelected = filerQuerySelected.filter((dat) => {
			// 		return dat.stage[0] === byEtapes
			// 	})
			// }

			if (statusReserva === "" || statusReserva === "Todos") {
				filterStatusReserva = filerQuerySelected
			} else {
				filterStatusReserva = filerQuerySelected.filter((dat) => {
					return dat.status[0] === statusReserva
				})
			}

			if (byDateBooking === "") {
				filterByDateReserva = filterStatusReserva
			} else {
				filterByDateReserva = filterStatusReserva.filter((dat) => {
					const reservaDate = new Date(dat.dateAndTime)
					const datePicked = new Date(byDateBooking)

					return (
						reservaDate.toLocaleDateString("es-MX", optionsDate) ===
						datePicked.toLocaleDateString("es-MX", optionsDate)
					)
				})
			}

			setFilteredData(filterByDateReserva)
			dispatch(setBookingsSearch(filterByDateReserva))

			// if (mariachiCategories === "") {
			// 	filterMariachiCategory = filterStageSelected
			// } else {
			// 	filterStageSelected.forEach((dataFilter) => {
			// 		const typefiltered = dataFilter.categorySet.find((cat) =>
			// 			cat ? cat.toLowerCase() === mariachiCategories.toLowerCase() : false
			// 		)

			// 		if (typefiltered !== undefined) {
			// 			filterMariachiCategory.push(dataFilter)
			// 		}
			// 	})
			// }
		}
	}, [
		query,
		porServicio,
		byEtapes,
		regionSelected,
		userByType,
		mariachiCategories,
		typeOfPrices,
		statusReserva,
		byDateBooking,
		dataOriginal,
	])

	return [setQuery, filteredData, setFilteredData]
}

export default useSearchByQuery
