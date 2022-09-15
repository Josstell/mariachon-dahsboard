import { useMemo, useState } from "react"
// import { useSelector } from "react-redux"
// import { selectAllMariachis } from "store/features/mariachis/mariachiSlice"
// import { selectAllUsers } from "store/features/users/userSlice"

const useSearchByQuery = (
	data,
	typeElement,
	porServicio,
	byEtapes,
	regionSelected,
	dataOriginal
) => {
	const [query, setQuery] = useState("")

	const [filteredData, setFilteredData] = useState([])

	const [filteredDataByRegion, setFilteredDataByRegion] = useState(dataOriginal)

	//let datOriginal

	// if (typeElement==="user"){
	// 	datOriginal = useSelector(selectAllUsers)
	// } else if(typeElement==="mariachi"){
	// 			datOriginal = useSelector(selectAllMariachis)

	// }

	useMemo(() => {
		let result
		if (regionSelected === "All") {
			setFilteredData(dataOriginal)
			setFilteredDataByRegion(dataOriginal)
		} else {
			result = dataOriginal.filter((dat) => {
				return `${dat.region}`
					.toLowerCase()
					.includes(regionSelected?.toLowerCase())
			})
			setFilteredData(result)
			setFilteredDataByRegion(result)
		}
	}, [regionSelected])

	useMemo(() => {
		let result
		if (typeElement === "user") {
			console.log("by service,", query, porServicio, data, filteredData)

			result =
				query === ""
					? filteredDataByRegion
					: data.filter((dat) => {
							return (
								`${dat.name}`
									// ${dat.lastName}`
									.toLowerCase()
									.includes(query.toLowerCase()) ||
								`${dat.email}`
									// ${dat.lastName}`
									.toLowerCase()
									.includes(query.toLowerCase()) ||
								`${dat.tel}`
									// ${dat.lastName}`
									.toLowerCase()
									.includes(query.toLowerCase()) ||
								dat.stage[0].includes(byEtapes)
							)
					  })
		} else if (typeElement === "mariachi") {
			result =
				query === ""
					? filteredDataByRegion
					: data.filter((dat) => {
							return (
								`${dat.name}`
									// ${dat.lastName}`
									.toLowerCase()
									.includes(query.toLowerCase()) ||
								`${dat.coordinator.name}`
									// ${dat.lastName}`
									.toLowerCase()
									.includes(query.toLowerCase()) ||
								`${dat.categorySet[0]}`
									// ${dat.lastName}`
									.toLowerCase()
									.includes(query.toLowerCase()) ||
								`${dat.stage[0]}`
									// ${dat.lastName}`
									.toLowerCase()
									.includes(query.toLowerCase()) ||
								`${dat.members}`
									// ${dat.lastName}`
									.toLowerCase()
									.includes(query.toLowerCase()) ||
								(porServicio === "Serenata" &&
									dat.service.serenata * 1 < query * 1) ||
								(porServicio === "Hora" && dat.service.hora * 1 < query * 1) ||
								(porServicio === "Contrato" && dat.service.hora * 1 < query * 1)
							)
					  })
		} else if (typeElement === "booking") {
			result =
				query === ""
					? filteredDataByRegion
					: data.filter((dat) => {
							return (
								`${dat.name}`
									// ${dat.lastName}`
									.toLowerCase()
									.includes(query.toLowerCase()) ||
								`${dat.coordinator.name}`
									// ${dat.lastName}`
									.toLowerCase()
									.includes(query.toLowerCase()) ||
								`${dat.categorySet[0]}`
									// ${dat.lastName}`
									.toLowerCase()
									.includes(query.toLowerCase()) ||
								`${dat.stage[0]}`
									// ${dat.lastName}`
									.toLowerCase()
									.includes(query.toLowerCase()) ||
								`${dat.members}`
									// ${dat.lastName}`
									.toLowerCase()
									.includes(query.toLowerCase()) ||
								(porServicio === "Serenata" &&
									dat.service.serenata * 1 < query * 1) ||
								(porServicio === "Hora" && dat.service.hora * 1 < query * 1) ||
								(porServicio === "Contrato" && dat.service.hora * 1 < query * 1)
							)
					  })
		}

		setFilteredData(result)
	}, [query, porServicio, byEtapes])

	return [setQuery, filteredData, setFilteredData]
}

export default useSearchByQuery
