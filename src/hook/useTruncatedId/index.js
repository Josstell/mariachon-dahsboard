import { useMemo } from "react"

const useTruncatedIdOrTel = (account1) => {
	const account = account1.toString()
	const truncated = useMemo(
		() => `${account?.substr(0, 2)}...${account?.substr(-1)}`,
		[account]
	)

	return truncated
}

export default useTruncatedIdOrTel
