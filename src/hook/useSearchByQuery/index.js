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
	regionSelected,
	dataOriginal
) => {
	const [query, setQuery] = useState("")

	const [filteredData, setFilteredData] = useState([])

	useMemo(() => {
		if (typeElement === "user") {
			console.log(
				"by service,",
				query,
				porServicio,
				data,
				filteredData,
				byEtapes
			)

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

			// 	if (query === "" && regionSelected === "All") {
			// 		console.log("entra")
			// 		setFilteredData(dataOriginal)
			// 		//setFilteredDataByRegion(dataOriginal)
			// 	} else if (query === "" && regionSelected !== "All") {
			// 		const result = dataOriginal.filter((dat) => {
			// 			return dat.region === regionSelected
			// 		})
			// 		setFilteredData(result)
			// 	} else {
			// 		console.log("jbvkjebv", query, regionSelected.toLowerCase())
			// 		const result = filteredData.filter((dat) => {
			// 			return (
			// 				`${dat.name}`.toLowerCase().includes(query.toLowerCase()) ||
			// 				`${dat.email}`.toLowerCase().includes(query.toLowerCase()) ||
			// 				`${dat.tel}`.toLowerCase().includes(query.toLowerCase())
			// 			)
			// 		})

			// 		if (regionSelected !== "All") {
			// 			const result2 = result.filter((dat) => {
			// 				return dat.region === regionSelected
			// 			})
			// 			console.log("query", result2)
			// 			setFilteredData(result2)
			// 		} else {
			// 			setFilteredData(result)
			// 		}
			// 	}
			// 	if (byEtapes !== "") {
			// 		const result3 = filteredData.filter((dat) => {
			// 			return dat.stage[0] === byEtapes
			// 		})
			// 		console.log("etapes", result3)
			// 		setFilteredData(result3)
			// 	}
		}

		// if (typeElement === "mariachi") {
		// 	result =
		// 		query === ""
		// 			? filteredDataByRegion
		// 			: data.filter((dat) => {
		// 					return (
		// 						`${dat.name}`
		// 							// ${dat.lastName}`
		// 							.toLowerCase()
		// 							.includes(query.toLowerCase()) ||
		// 						`${dat.coordinator.name}`
		// 							// ${dat.lastName}`
		// 							.toLowerCase()
		// 							.includes(query.toLowerCase()) ||
		// 						`${dat.categorySet[0]}`
		// 							// ${dat.lastName}`
		// 							.toLowerCase()
		// 							.includes(query.toLowerCase()) ||
		// 						`${dat.stage[0]}`
		// 							// ${dat.lastName}`
		// 							.toLowerCase()
		// 							.includes(query.toLowerCase()) ||
		// 						`${dat.members}`
		// 							// ${dat.lastName}`
		// 							.toLowerCase()
		// 							.includes(query.toLowerCase()) ||
		// 						(porServicio === "Serenata" &&
		// 							dat.service.serenata * 1 < query * 1) ||
		// 						(porServicio === "Hora" && dat.service.hora * 1 < query * 1) ||
		// 						(porServicio === "Contrato" && dat.service.hora * 1 < query * 1)
		// 					)
		// 			  })
		// } else if (typeElement === "booking") {
		// 	result =
		// 		query === ""
		// 			? filteredDataByRegion
		// 			: data.filter((dat) => {
		// 					return (
		// 						`${dat.name}`
		// 							// ${dat.lastName}`
		// 							.toLowerCase()
		// 							.includes(query.toLowerCase()) ||
		// 						`${dat.coordinator.name}`
		// 							// ${dat.lastName}`
		// 							.toLowerCase()
		// 							.includes(query.toLowerCase()) ||
		// 						`${dat.categorySet[0]}`
		// 							// ${dat.lastName}`
		// 							.toLowerCase()
		// 							.includes(query.toLowerCase()) ||
		// 						`${dat.stage[0]}`
		// 							// ${dat.lastName}`
		// 							.toLowerCase()
		// 							.includes(query.toLowerCase()) ||
		// 						`${dat.members}`
		// 							// ${dat.lastName}`
		// 							.toLowerCase()
		// 							.includes(query.toLowerCase()) ||
		// 						(porServicio === "Serenata" &&
		// 							dat.service.serenata * 1 < query * 1) ||
		// 						(porServicio === "Hora" && dat.service.hora * 1 < query * 1) ||
		// 						(porServicio === "Contrato" && dat.service.hora * 1 < query * 1)
		// 					)
		// 			  })
		// }
	}, [query, porServicio, byEtapes, regionSelected, userByType])

	return [setQuery, filteredData, setFilteredData]
}

export default useSearchByQuery
