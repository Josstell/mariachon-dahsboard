import React from "react"

import { useState } from "react"
import { SearchIcon } from "@heroicons/react/solid"

const Search = () => {
	const [openInput, setOpenInput] = useState(false)
	return (
		<div className="flex items-center justify-center">
			<div
				className={`flex border-0 md:border-2 rounded-2xl px-1 md:px-4 py-2 ${
					openInput && "border-2"
				}`}
			>
				<input
					type="text"
					className={`px-1 md:px-4 py-2 w-40 md:w-80 ${
						!openInput ? "hidden" : "block"
					}`}
					placeholder="Buscar..."
				/>
				<button
					onClick={() => setOpenInput(!openInput)}
					className="flex items-center justify-center px-1 md:px-2 border-0 md:border-l "
				>
					<SearchIcon className="w-7" />
				</button>
			</div>
		</div>
	)
}

export default Search
