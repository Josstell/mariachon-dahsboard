import { useSelector } from "react-redux"
import LupaSearchIcon from "src/components/SVG/Icons/LupaSearchIcon"
import useSearchByQuery from "src/hook/useSearchByQuery"
import { selectAllUsers } from "store/features/users/userSlice"

const SearchWithModal = ({
	setUsersDataSearch,
	hideIconShowSearch,
	setHideIconShowSearch,
}) => {
	const usersDataSearch = useSelector(selectAllUsers)
	const [setQuery, filtereDdata] = useSearchByQuery(usersDataSearch, "user")

	const handleModalSearch = (e) => {
		const keyWordSearch = e.target.value
		setQuery(keyWordSearch)
	}
	if (hideIconShowSearch) {
		setUsersDataSearch(filtereDdata)
	} else {
		setUsersDataSearch(usersDataSearch)
	}
	return (
		<div className="w-full max-w-screen-xl mx-auto px-6">
			<div className="flex justify-center p-0 px-3 py-2">
				<div className="w-full max-w-md">
					<div className="shadow-md rounded-lg px-3 py-2 mb-0">
						<div className="flex items-center bg-slate-500 rounded-md">
							<div className="pl-2">
								<LupaSearchIcon
									className="fill-slate-300 w-7 h-7"
									onClick={() => setHideIconShowSearch(false)}
								/>
							</div>
							<input
								className="w-full rounded-md bg-slate-500 text-slate-100 leading-tight focus:outline-none py-2 px-2"
								id="search"
								type="text"
								placeholder="Nombre, email o telefono"
								onChange={handleModalSearch}
							/>
						</div>
						{/* <div className={`py-0 text-sm ${hideModal && "hidden"}`}>
							{filtereDdata.map((data) => (
								<div
									key={data._id}
									className="flex justify-start cursor-pointer text-slate-300 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2 "
									onClick={() => router.push(`/usuarios/${data.slug.current}`)}
								>
									<span className="bg-gray-400 h-2 w-2 m-2 rounded-full"></span>
									<div className="flex-grow font-medium px-2">
										<a>{data.name}</a>
									</div>
									<div className="text-sm font-normal text-slate-300 tracking-wide">
										{data.categorySet[0]}
									</div>
								</div>
							))}
						</div> */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SearchWithModal
