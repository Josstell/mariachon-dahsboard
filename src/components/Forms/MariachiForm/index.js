import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import SpinnerLoadign from "src/components/Spinners/SpinnerLoading"
import useSearchUserByCategory from "src/hook/useSearchUserByCategory"
import { updateMariachi } from "store/features/mariachis/mariachiSlice"
import { selectAllUsers, selectUserAdmin } from "store/features/users/userSlice"
import Form from "../Smart/Form"
import { Button, Input, Select, TextArea, RadioButton } from "../Smart/Inputs"

export default function MariachiForm({ methods, activeFormTab, mariachiData }) {
	const [loading, setloading] = useState(false)

	const router = useRouter()

	const userAdmin = useSelector(selectUserAdmin)
	const users = useSelector(selectAllUsers)
	const dispatch = useDispatch()

	const usersByCoordinator = useSearchUserByCategory(users, "Coordinador")

	const { setValue } = methods

	useEffect(() => {
		if (!userAdmin.exist) {
			router.push("/")
		}
		setValue("name", mariachiData.name)
		setValue("tel", mariachiData.tel)
		setValue("description", mariachiData.description)
		setValue("address", mariachiData.address)
		setValue("region", mariachiData?.region || "")
		setValue("members", mariachiData?.members || "No definido")
		setValue("hora", mariachiData.service.hora)
		setValue("serenata", mariachiData.service.serenata)
		setValue("contract", mariachiData.service.contract)
		setValue("category_mariachi", mariachiData.categorySet[0])
		setValue("coordinator", mariachiData.coordinator._id)
		//
	}, [])

	//const [images, setImages] = useState({ url: "", metadata: {} })
	//const [videos, setVideos] = useState({ url: "", metadata: {} })

	const imageRef = useRef("")
	const imageAlt = useRef("")

	const videoRef = useRef("")
	const videoAlt = useRef("")

	const [arrayImages, setArrayImages] = useState([])
	const [arrayVideos, setArrayVideos] = useState([])

	const handleArrayImage = () => {
		console.log("valor: ", imageRef.current.value)
		if (!(imageRef.current.value === "")) {
			setArrayImages((oldArray) => [
				...oldArray,
				{
					url: imageRef.current.value,
					metadata: { alt: imageAlt.current.value },
				},
			])

			imageRef.current.value = ""
			imageAlt.current.value = ""
		}
	}

	const handleArrayVideo = () => {
		console.log("valor: ", videoRef.current.value)
		if (!(videoRef.current.value === "")) {
			setArrayVideos((oldArray) => [
				...oldArray,
				{
					url: videoRef.current.value,
					metadata: { alt: videoAlt.current.value },
				},
			])

			videoRef.current.value = ""
			videoAlt.current.value = ""
		}
	}

	const onSubmit = (data) => {
		console.log("form data", data)
		setloading(!loading)
		dispatch(
			updateMariachi({
				...data,
				_id: mariachiData._id,
				coordinator: { _ref: data.coordinator, _type: "reference" },
			})
		)
		setloading(!loading)

		router.push("/mariachis")
	}
	console.log(arrayImages)
	console.log(arrayVideos)
	return (
		<>
			<Form onSubmit={onSubmit} methods={methods}>
				{/**Entradas primer tab */}
				<Input
					hidden={activeFormTab.data && true}
					name="name"
					label="Nombre del mariachi"
				/>
				<Input
					hidden={activeFormTab.data && true}
					name="address"
					label="Dirección"
				/>
				<Input
					hidden={activeFormTab.data && true}
					name="region"
					label="Estado"
				/>
				<Input
					hidden={activeFormTab.data && true}
					name="tel"
					label="Télefono"
				/>
				<TextArea
					hidden={activeFormTab.data && true}
					name="description"
					label="Descripción"
				/>
				{/**Entradas segundo tab */}
				<Select
					hidden={activeFormTab.mariachi && true}
					name="coordinator"
					options={usersByCoordinator}
					label="Coordinador"
				/>
				{/* <Select
				hidden={activeFormTab.mariachi && true}
				name="crew"
				options={usersByCoordinator}
				label="Elementos"
			/> */}
				<Input
					hidden={activeFormTab.mariachi && true}
					name="members"
					label="# Elementos"
					type="number"
				/>
				<RadioButton
					hidden={activeFormTab.mariachi && true}
					name="category_mariachi"
					label={["Basico", "Normal", "Premium"]}
					type="radio"
				/>
				{/**Entradas tercer tab */}
				<div
					className={`border-dashed border-t-2 border-t-slate-100   n my-6 relative ${
						!activeFormTab.gral && "hidden"
					}`}
				>
					<h3 className="absolute px-2 left-0 bg-slate-900 -top-3">Precios</h3>
				</div>
				<Input
					hidden={activeFormTab.gral && true}
					name="hora"
					label="hora"
					type="text"
				/>
				<Input
					hidden={activeFormTab.gral && true}
					name="serenata"
					label="serenata"
					type="text"
				/>
				<Input
					hidden={activeFormTab.gral && true}
					name="contract"
					label="contrato"
					type="text"
				/>
				<div className={`${!activeFormTab.gral && "hidden"}`}>
					<div
						className={`border-dashed border-t-2 border-t-slate-100   n my-6 relative ${
							!activeFormTab.gral && "hidden"
						}`}
					>
						<h3 className="absolute px-2 left-0 bg-slate-900 -top-3">
							Fotos y videos
						</h3>
					</div>

					<div className="flex justify-between items-center ">
						<div className="flex flex-col">
							<div className=" items-center border-b border-teal-500 py-2">
								<input
									ref={imageRef}
									className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
									type="text"
									placeholder="Agregar url de imagen"
								/>
							</div>

							<div className=" items-center border-b border-teal-500 py-2">
								<input
									ref={imageAlt}
									className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
									type="text"
									placeholder="Breve descripción"
								/>
							</div>
						</div>

						<button
							className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
							type="button"
							onClick={() => handleArrayImage()}
						>
							Agregar
						</button>
					</div>

					{/** videos */}

					<div className="flex justify-between items-center ">
						<div className="flex flex-col">
							<div className=" items-center border-b border-teal-500 py-2">
								<input
									ref={videoRef}
									className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
									type="text"
									placeholder="Agregar url del video"
								/>
							</div>

							<div className=" items-center border-b border-teal-500 py-2">
								<input
									ref={videoAlt}
									className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
									type="text"
									placeholder="Breve descripción"
								/>
							</div>
						</div>

						<button
							className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
							type="button"
							onClick={() => handleArrayVideo()}
						>
							Agregar
						</button>
					</div>
				</div>
				<Button message="Actualizar" />
			</Form>
			{loading && <SpinnerLoadign />}
		</>
	)
}
