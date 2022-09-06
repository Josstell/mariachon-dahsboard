import React, { useEffect, useState } from "react"

import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import MariachiCard from "src/components/Cards/MariachiCard"
import MariachiForm from "src/components/Forms/MariachiForm"
import Layout from "src/components/Layout"
import MariachiForbiden from "src/components/SVG/Icons/MariachiForbiden"
import MariachiTab from "src/components/Tabs/MariachiTab"
import {
	selectStatusUser,
	selectUserAdmin,
} from "store/features/users/userSlice"
import SpinnerLogo from "src/components/Spinners/SpinnerLogo"
import {
	addMariachi,
	selectError,
	selectStatus,
	selectStatusGS,
	setStatus,
	setStatusGS,
} from "store/features/mariachis/mariachiSlice"
import SpinnerLoadign from "src/components/Spinners/SpinnerLoading"
import toast, { Toaster } from "react-hot-toast"
import { dateGral, optionsDate } from "src/helpers/utils"
import { nanoid } from "@reduxjs/toolkit"

const addNewMariachi = () => {
	const router = useRouter()

	const [arrayImages, setArrayImages] = useState([])
	const [arrayVideos, setArrayVideos] = useState([])
	const [crewElements, setCrewElements] = useState([])

	const userAdmin = useSelector(selectUserAdmin)
	const status = useSelector(selectStatus)
	const statusGS = useSelector(selectStatusGS)

	const statusUser = useSelector(selectStatusUser)
	const error = useSelector(selectError)
	const dispatch = useDispatch()

	//Activar Tab
	const activeFormTab = useSelector(
		(state) => state.mariachis.mariachiTabActive
	)

	const methods = useForm()

	const { watch, setValue } = methods

	///https://drive.google.com/file/d/1clPxEJd6BLidvRqhRNj9xh5fICix5yFv/view?usp=sharing

	//https://drive.google.com/uc?export=view&id=1clPxEJd6BLidvRqhRNj9xh5fICix5yFv

	useEffect(() => {
		if (!userAdmin.exist) {
			router.push("/")
		}
		setValue("name", "")
		setValue("tel", "")
		setValue("description", "")
		setValue("address", "")
		setValue("region", "")
		setValue("members", 0)
		setValue("hora", 0)
		setValue("serenata", 0)
		setValue("contrato", 0)
		setValue("category_mariachi", "")
		setValue("coordinator", "")
		setValue("elements", "")
		setValue("stage", "PROSPECTO")

		//
	}, [])

	useEffect(() => {
		if (statusUser === "succeeded") {
			setValue("coordinator", "")
			setValue("elements", "")
		}
	}, [statusUser])

	const dataMariachiToCard = {
		name: watch("name"),
		categorySet: watch("category_mariachi"),
		tel: watch("tel"),
		description: watch("description"),
		address: watch("address"),
		region: watch("region"),
		city: watch("city"),
		cp: watch("cp"),
		members: watch("members"),
		service: {
			hora: watch("hora"),
			serenata: watch("serenata"),
			contrato: watch("contrato"),
		},
		coordinator: watch("coordinator"),
		stage: watch("stage"),
	}

	// const handleAddElement = () => {
	// 	const dataElements = watch("coordinator")
	// 	setCrewElements((elem) => [...elem, dataElements])
	// }

	useEffect(() => {
		if (watch("elements") !== "") {
			const dataElements = {
				_key: nanoid(),
				_ref: watch("elements"),
			}
			setCrewElements((elem) => [...elem, dataElements])
			setValue("elements", "")
		}
	}, [watch("elements")])

	useEffect(() => {
		setValue("members", crewElements.length + 1)
	}, [crewElements])

	console.log("Elementos: ", crewElements)

	const onSubmit = (dataForm) => {
		///setLoading(true)

		let dataElements = []
		crewElements.forEach((element) => {
			dataElements.push(element)
		})

		const coorSelected = { _key: nanoid(), _ref: dataForm.coordinator }

		dataElements.unshift(coorSelected)

		const dataMariachiToCard = {
			name: dataForm.name,
			createdBy: { _ref: userAdmin._id, _type: "reference" },
			dateCreated: dateGral.toLocaleDateString("es-MX", optionsDate),
			categorySet: [dataForm.category_mariachi],
			tel: dataForm.tel * 1,
			description: dataForm.description,
			address: dataForm.address,
			region: dataForm.region,
			city: dataForm.city,
			cp: dataForm.cp,
			members: dataForm.members * 1,
			service: {
				hora: dataForm.hora * 1,
				serenata: dataForm.serenata * 1,
				contrato: dataForm.contrato * 1,
			},
			coordinator: { _ref: dataForm.coordinator },
			stage: [dataForm.stage],
			crew: dataElements,
			images: arrayImages,
			videos: arrayVideos,
		}

		dispatch(
			addMariachi({
				...dataMariachiToCard,
			})
		)
		//	dispatch(addMariachiToGoogleSheet(dataMariachiToCard))
	}

	const notifyError = () => toast.error(error)
	const notifySuccess = () => toast.success("Mariachi creado correctamente")

	useEffect(() => {
		if (status === "failed") {
			notifyError()
			dispatch(setStatus("idle"))
		}
		if (status === "succeeded" && statusGS === "succeeded") {
			dispatch(setStatus("idle"))
			dispatch(setStatusGS("idle"))

			notifySuccess()

			//dispatch(setStatus("idle"))
			router.push("/mariachis")
		}
	}, [status, statusGS, error])

	if (!userAdmin.exist || router.isFallback) {
		return <SpinnerLogo />
	}
	return (
		<Layout>
			{userAdmin.isAdmin ? (
				<div className={`no-scrollbar overflow-auto w-full h-full  `}>
					<div
						className={`no-scrollbar overflow-auto   h-full md:h-full flex flex-col md:flex-row md:justify-around 
							 items-center `}
					>
						<div
							className={`w-4/12 h-3/5 min-w-[370px] min-h-[890px] md:min-h-full ${
								status !== "idle" || statusGS !== "idle"
									? "flex justify-center items-center mt-20"
									: null
							}`}
						>
							<MariachiTab>
								{status !== "idle" || statusGS !== "idle" ? (
									<SpinnerLoadign />
								) : (
									<MariachiForm
										methods={methods}
										onSubmit={onSubmit}
										activeFormTab={activeFormTab}
										arrayImages={arrayImages}
										setArrayImages={setArrayImages}
										arrayVideos={arrayVideos}
										setArrayVideos={setArrayVideos}
										crewElements={crewElements}
										setCrewElements={setCrewElements}
										isSaving
									/>
								)}
								<Toaster />
							</MariachiTab>
						</div>
						<div className={"w-full h-full md:w-4/12 md:h-5/6	 "}>
							<MariachiCard
								mariachiUp={dataMariachiToCard}
								arrayImages={arrayImages}
								arrayVideos={arrayVideos}
							/>
						</div>
					</div>
				</div>
			) : (
				<>
					<MariachiForbiden className="w-80 fill-slate-900 dark:fill-slate-50" />
					<p className="">
						Usted no esta autorizado para usar esta app (users).
					</p>
				</>
			)}
		</Layout>
	)
}

export default addNewMariachi
