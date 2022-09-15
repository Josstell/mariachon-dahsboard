import { useState } from "react"
import LupaSearchIcon from "src/components/SVG/Icons/LupaSearchIcon"
import { etapesData, statusData } from "src/helpers/utils"
import useSearchByQuery from "src/hook/useSearchByQuery"
import { RadioButtonSimple } from "../Inputs"

const SearchWithModalMariachis = ({
	dataOriginal,
	mariachiDataSearch,
	setMariachisDataSearch,
	setHideIconShowSearch,
	regionSelected,
	typeData,
}) => {
	const [porPrecio, setPorPrecio] = useState(false)
	const [porServicio, setPorServicio] = useState("")

	const [byEtapes, setByEtapes] = useState("")

	const [setQuery, filtereDdata] = useSearchByQuery(
		mariachiDataSearch,
		typeData,
		porServicio,
		byEtapes,
		regionSelected,
		dataOriginal
	)

	const handleModalSearch = (e) => {
		const keyWordSearch = e.target.value
		setQuery(keyWordSearch)
	}

	const handlePorPrecio = (e) => {
		console.log("por preioco", e.target.checked)
		setPorPrecio(e.target.checked)
	}

	const handleServices = (e) => {
		console.log("servicios", e.target.value)
		setPorServicio(e.target.value)
	}

	const handleEtapes = (e) => {
		console.log("Etapas", e.target.value)
		setByEtapes(e.target.value)
	}
	const handleStatus = (e) => {
		console.log("Status", e.target.value)
	}

	setMariachisDataSearch(filtereDdata)

	// if (hideIconShowSearch) {
	// 	setMariachisDataSearch(filtereDdata)
	// } else {
	// 	setMariachisDataSearch(mariachiDataSearch)
	// }
	return (
		<div className="w-full max-w-screen-xl mx-auto px-4">
			<div className="flex justify-center p-0 px-3 py-2">
				<div className="w-full max-w-md">
					<div className="shadow-md  rounded-lg px-3 py-2 mb-0 flex justify-between">
						<div className="flex w-4/5 items-center bg-slate-500 rounded-md">
							<div className="pl-2">
								<LupaSearchIcon
									className="fill-slate-300 w-7 h-7"
									onClick={() => setHideIconShowSearch(false)}
								/>
							</div>
							<input
								className="w-full rounded-md bg-slate-500 text-slate-100 text-xs leading-tight focus:outline-none py-2 px-2"
								id="search"
								type="text"
								placeholder="Nombre, coordinador, elementos, etc"
								checked={porPrecio}
								onChange={handleModalSearch}
							/>
						</div>
						<div
							className={`w-1/5 ml-3 flex flex-col items-center justify-center `}
						>
							<label className="text-[9px] flex flex-row justify-center items-center">
								<input
									type="checkbox"
									name="porPrecio"
									className="accent-slate-200 mr-2"
									onChange={handlePorPrecio}
								/>{" "}
								otros
							</label>
						</div>
					</div>
					<RadioButtonSimple
						name="searchByPrice"
						label={["Serenata", "Hora", "Contrato"]}
						hidden={
							porPrecio && (typeData === "mariachi" || typeData === "booking")
						}
						handleServices={handleServices}
					/>
					<RadioButtonSimple
						name="searchByEtape"
						label={etapesData}
						hidden={
							porPrecio && (typeData === "mariachi" || typeData === "user")
						}
						handleServices={handleEtapes}
					/>

					<RadioButtonSimple
						name="searchByStatus"
						label={statusData}
						hidden={porPrecio && typeData === "booking"}
						handleServices={handleStatus}
					/>
				</div>
			</div>
		</div>
	)
}

export default SearchWithModalMariachis
