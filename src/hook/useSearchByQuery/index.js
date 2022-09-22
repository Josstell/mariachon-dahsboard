import { useMemo, useState } from "react"
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
	regionSelected,
	dataOriginal
) => {
	const [query, setQuery] = useState("")

	const [filteredData, setFilteredData] = useState([])

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

			console.log("por servicio:", porServicio, typeOfPrices)

			setFilteredData(filterMariachiCategory)
		}
	}, [
		query,
		porServicio,
		byEtapes,
		regionSelected,
		userByType,
		mariachiCategories,
		typeOfPrices,
	])

	return [setQuery, filteredData, setFilteredData]
}

export default useSearchByQuery
