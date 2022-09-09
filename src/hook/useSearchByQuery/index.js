import { useMemo, useState } from "react"

const useSearchByQuery = (data, typeElement, porServicio) => {
	const [query, setQuery] = useState("")

	const [filteredData, setFilteredData] = useState([])

	useMemo(() => {
		let result
		if (typeElement === "user") {
			result =
				query === ""
					? []
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
									.includes(query.toLowerCase())
							)
					  })
		} else if (typeElement === "mariachi") {
			result =
				query === ""
					? []
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
	}, [query, porServicio])

	return [setQuery, filteredData, setFilteredData]
}

export default useSearchByQuery
