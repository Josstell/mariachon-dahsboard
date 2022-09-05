import Image from "next/image"
import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { regions } from "src/helpers/dataset"
import useSearchUserByCategory from "src/hook/useSearchUserByCategory"
import { selectAllUsers } from "store/features/users/userSlice"
import Form from "../Smart/Form"
import { Button, Input, Select, TextArea, RadioButton } from "../Smart/Inputs"
import {
	TrashIcon,
	PlusIcon,
	PhotographIcon,
	VideoCameraIcon,
} from "@heroicons/react/outline"

import { nanoid } from "@reduxjs/toolkit"
import AddNewUserComponent from "../UserForm/AddNewUser"

export default function MariachiForm({
	methods,
	activeFormTab,
	onSubmit,
	arrayImages,
	setArrayImages,
	arrayVideos,
	setArrayVideos,
	isSaving,
	crewElements,
	setCrewElements,
}) {
	const regionData = regions.response.estado

	const users = useSelector(selectAllUsers)

	const usersByCoordinator = useSearchUserByCategory(users, "Coordinador")
	const usersByMariachi = useSearchUserByCategory(users, "Mariachi")

	//const [showEdit, setShowEdit] = useState(false)
	//const [keyImage, setKeyImage] = useState("")
	const [showAdd, setShowAdd] = useState(false)
	const [showAddV, setShowAddV] = useState(false)

	// const { setValue } = methods

	// useEffect(() => {
	// 	if (!userAdmin.exist) {
	// 		router.push("/")
	// 	}
	// 	setValue("name", mariachiData.name)
	// 	setValue("tel", mariachiData.tel)
	// 	setValue("description", mariachiData.description)
	// 	setValue("address", mariachiData.address)
	// 	setValue("region", mariachiData?.region || "")
	// 	setValue("members", mariachiData?.members || "No definido")
	// 	setValue("hora", mariachiData.service.hora)
	// 	setValue("serenata", mariachiData.service.serenata)
	// 	setValue("contrato", mariachiData.service.contrato)
	// 	setValue("category_mariachi", mariachiData.categorySet[0])
	// 	setValue("coordinator", mariachiData.coordinator._id)
	// 	//
	// }, [])

	//const [images, setImages] = useState({ url: "", metadata: {} })
	//const [videos, setVideos] = useState({ url: "", metadata: {} })

	const [addUser, setAddUser] = useState(true)
	const [role, setRole] = useState("Coordinador")

	const imageRef = useRef("")
	const imageAlt = useRef("")

	const videoRef = useRef("")
	const videoAlt = useRef("")

	//https://drive.google.com/file/d/1ycckhNleCKvSI3qsng2ikhEDKB_2174Y/view?usp=sharing
	//https://drive.google.com/uc?export=view&id=1ycckhNleCKvSI3qsng2ikhEDKB_2174Y

	const handleArrayImage = () => {
		const urlSharedFromDrive = imageRef.current.value
		const altDes = imageAlt.current.value
		const urlDrive = "https://drive.google.com/uc?export=view&id="
		const getId = urlSharedFromDrive.split("/", 6)[5]

		if (!(imageRef.current.value === "")) {
			setArrayImages((oldArray) => [
				...oldArray,
				{
					_key: nanoid(),

					url: urlDrive + getId,
					metadata: { alt: altDes },
				},
			])

			imageRef.current.value = ""
			imageAlt.current.value = ""

			setShowAdd(false)
		}
	}

	const handleArrayVideo = () => {
		const urlSharedFromDrive = videoRef.current.value
		const altDes = videoAlt.current.value
		const urlDrive = "https://drive.google.com/file/d/"
		const getId = urlSharedFromDrive.split("/", 6)[5]

		if (!(videoRef.current.value === "")) {
			setArrayVideos((oldArray) => [
				...oldArray,
				{
					_key: nanoid(),

					url: urlDrive + getId + "/preview",
					metadata: { alt: altDes },
				},
			])

			videoRef.current.value = ""
			videoAlt.current.value = ""

			setShowAddV(false)
		}
	}

	const handleDeletePhoto = (image) => {
		const key = image?._key ? image?._key : image.key

		if (image?._key) {
			setArrayImages(arrayImages.filter((img) => img._key !== key))
		} else {
			setArrayImages(arrayImages.filter((img) => img.key !== key))
		}
	}

	const handleDeleteVideo = (video) => {
		const key = video?._key ? video?._key : video.key

		if (video?._key) {
			setArrayVideos(arrayVideos.filter((vid) => vid._key !== key))
		} else {
			setArrayVideos(arrayVideos.filter((vid) => vid.key !== key))
		}
	}

	const handleShowAdd = () => {
		setShowAdd(!showAdd)
	}

	const handleShowAddV = () => {
		setShowAddV(!showAddV)
	}

	console.log("CREW: ", crewElements)

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
					name="city"
					label="Ciudad o municipio"
				/>
				<Input
					hidden={activeFormTab.data && true}
					name="cp"
					label="Codigo Postal"
				/>
				{/* <Input
					hidden={activeFormTab.data && true}
					name="region"
					label="Estado"
				/> */}
				<Select
					hidden={activeFormTab.data && true}
					name="region"
					options={regionData}
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
					addUser={addUser}
					setAddUser={setAddUser}
					setRole={setRole}
				/>

				<Select
					hidden={activeFormTab.mariachi && true}
					name="elements"
					options={usersByMariachi}
					label="Mariachi"
					addUser={addUser}
					setAddUser={setAddUser}
					setRole={setRole}
					//handleAddElement={handleAddElement}
				/>
				{crewElements !== [] &&
					crewElements.map((crew) => {
						const element = users.find((user) => user._id === crew._ref)
						return (
							<div
								className={`my-2 ${
									!activeFormTab.mariachi ? "hidden" : "block"
								}`}
								key={crew._key}
							>
								<div className="flex justify-between items-center px-7">
									<p className="text-sm   ">{element?.name}</p>
									<div className="inline-flex	">
										<TrashIcon
											className="w-5 h-5"
											onClick={() =>
												setCrewElements(
													crewElements.filter((cre) => cre._key !== crew._key)
												)
											}
										/>
									</div>
								</div>
							</div>
						)
					})}

				<Input
					hidden={activeFormTab.mariachi && addUser}
					name="members"
					label="# Elementos"
					type="number"
				/>

				<div
					className={`border-dashed border-t-2 border-t-slate-100   n my-6 relative ${
						!activeFormTab.gral ? "hidden" : "block"
					}`}
				>
					<h3 className="absolute px-2 left-0 bg-slate-900 -top-3">
						Etapa del Proveedor
					</h3>
				</div>

				<RadioButton
					hidden={activeFormTab.gral}
					name="stage"
					label={["PROSPECTO", "PROVEEDOR"]}
					type="radio"
				/>

				<div
					className={`border-dashed border-t-2 border-t-slate-100   n my-6 relative ${
						!activeFormTab.gral ? "hidden" : "block"
					}`}
				>
					<h3 className="absolute px-2 left-0 bg-slate-900 -top-3">
						Categoria
					</h3>
				</div>

				<RadioButton
					hidden={activeFormTab.gral}
					name="category_mariachi"
					label={["Basico", "Normal", "Premium"]}
					type="radio"
				/>
				{/**Entradas tercer tab */}
				<div
					className={`border-dashed border-t-2 border-t-slate-100   n my-6 relative ${
						!activeFormTab.gral ? "hidden" : "block"
					}`}
				>
					<h3 className="absolute px-2 left-0 bg-slate-900 -top-3">Precios</h3>
				</div>
				<Input
					hidden={activeFormTab.gral}
					name="hora"
					label="hora"
					type="text"
				/>
				<Input
					hidden={activeFormTab.gral}
					name="serenata"
					label="serenata"
					type="text"
				/>
				<Input
					hidden={activeFormTab.gral}
					name="contrato"
					label="contrato"
					type="text"
				/>
				<div className={`${!activeFormTab.gral && "hidden"}`}>
					<div
						className={`flex justify-between items-center   my-6 relative ${
							!activeFormTab.gral && "hidden"
						}`}
					>
						<h3 className=" ml-5 bg-slate-900 ">Fotos </h3>
						<div className="inline-flex cursor-pointer">
							<PhotographIcon className="w-5 h-5 " />
							<PlusIcon
								onClick={handleShowAdd}
								className="font-extrabold w-3 h-3 mx-1"
							/>
						</div>
					</div>

					{arrayImages.length === 0 || showAdd ? (
						<div className={`flex justify-between items-center `}>
							<div className="flex flex-col">
								<div className=" items-center border-b border-teal-500 py-2">
									<input
										ref={imageRef}
										className="appearance-none bg-transparent border-none w-full text-slate-800 dark:text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none"
										type="text"
										placeholder="Agregar url de imagen"
									/>
								</div>

								<div className=" items-center border-b border-teal-500 py-2">
									<input
										ref={imageAlt}
										className="appearance-none bg-transparent border-none w-full text-slate-800 dark:text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none"
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
					) : null}

					{arrayImages.length > 0 &&
						arrayImages.map((image) => {
							return (
								<div className="my-2" key={image._key || image.key}>
									<div className="flex justify-between items-center">
										<div className="w-10 h-10 border-2 border-white rounded-full relative flex">
											<Image
												className="rounded-full "
												src={image.url}
												alt={image.metadata.alt}
												layout="fill"
												objectFit="cover"
											/>
										</div>
										<div className="inline-flex	">
											<TrashIcon
												className="w-5 h-5"
												onClick={() => handleDeletePhoto(image)}
											/>
										</div>
									</div>
								</div>
							)
						})}

					{/** videos */}
					<div className={`${!activeFormTab.gral && "hidden"}`}>
						<div
							className={`flex justify-between items-center   my-6 relative ${
								!activeFormTab.gral && "hidden"
							}`}
						>
							<h3 className=" ml-5 bg-slate-900 ">Videos </h3>
							<div className="inline-flex cursor-pointer">
								<VideoCameraIcon className="w-5 h-5 " />
								<PlusIcon
									onClick={() => handleShowAddV()}
									className="font-extrabold w-3 h-3 mx-1"
								/>
							</div>
						</div>

						{arrayVideos.length == 0 || showAddV ? (
							<div className={`flex justify-between items-center  `}>
								<div className="flex flex-col">
									<div className=" items-center border-b border-teal-500 py-2">
										<input
											ref={videoRef}
											className="appearance-none bg-transparent border-none w-full text-slate-800 dark:text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none"
											type="text"
											placeholder="Agregar url del video"
										/>
									</div>

									<div className=" items-center border-b border-teal-500 py-2">
										<input
											ref={videoAlt}
											className="appearance-none bg-transparent border-none w-full text-slate-800 dark:text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none"
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
						) : null}

						{arrayVideos.length > 0 &&
							arrayVideos.map((video, index) => {
								return (
									<div className="my-2" key={video._key || video.key}>
										<div className="flex justify-between items-center">
											<h3 className="text-slate-800 dark:text-slate-50">
												{index + 1}. {video.metadata.alt}
											</h3>
											<div className="inline-flex	">
												<TrashIcon
													className="w-5 h-5"
													onClick={() => handleDeleteVideo(video)}
												/>
											</div>
										</div>
									</div>
								)
							})}
					</div>
				</div>

				<Button
					hidden={addUser}
					message={isSaving ? "Guardar" : "Actualizar"}
					disabledBtn={!activeFormTab.gral}
				/>
			</Form>

			{!addUser && activeFormTab.mariachi ? (
				<AddNewUserComponent
					setAddUser={setAddUser}
					addUser={addUser}
					role={[role]}
				/>
			) : (
				<div className=""></div>
			)}
		</>
	)
}
