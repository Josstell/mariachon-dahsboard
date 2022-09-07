import { useMemo, useState } from "react"

const useSearchByQuery = (data) => {
	const [query, setQuery] = useState("")

	const [filteredData, setFilteredData] = useState([])

	useMemo(() => {
		const result =
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
		setFilteredData(result)
	}, [query])

	return [setQuery, filteredData, setFilteredData]
}

export default useSearchByQuery
