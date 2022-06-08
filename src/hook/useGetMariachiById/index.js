import { useEffect, useState } from "react"

export default function useGetMaraichiById(mariachis, _id) {
	const [marachiBy_Id, setMarachiBy_Id] = useState({})
	useEffect(() => {
		const mariachi = mariachis.find((mariachi) => mariachi._id === _id)
		setMarachiBy_Id(mariachi)
	}, [])
	return marachiBy_Id
}
