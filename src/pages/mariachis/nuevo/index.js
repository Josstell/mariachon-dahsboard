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
	addMariachiToGoogleSheet,
	selectError,
	selectStatus,
	selectStatusGS,
	setStatus,
	setStatusGS,
} from "store/features/mariachis/mariachiSlice"
import toast, { Toaster } from "react-hot-toast"
import {
	dateGral,
	mariachiExist,
	optionsDate,
	transformDataMariachiToAdd,
} from "src/helpers/utils"
import { nanoid } from "@reduxjs/toolkit"
import { useAddUpdateNewMariachiMutation } from "store/features/mariachisAPI"

const addNewMariachi = () => {
	const router = useRouter()

	const [createMariachi, { error: errorAdd, isSuccess: isSuccessAdd }] =
		useAddUpdateNewMariachiMutation()

	const [arrayImages, setArrayImages] = useState([])
	const [arrayVideos, setArrayVideos] = useState([])
	const [logo, setLogo] = useState([])
	const [crewElements, setCrewElements] = useState([])
	const [loading, setLoading] = useState(false)

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

	const { watch, setValue, getValues } = methods

	///https://drive.google.com/file/d/1clPxEJd6BLidvRqhRNj9xh5fICix5yFv/view?usp=sharing

	//https://drive.google.com/uc?export=view&id=1clPxEJd6BLidvRqhRNj9xh5fICix5yFv

	useEffect(() => {
		if (!userAdmin.exist) {
			router.push("/mariachis")
		}
		setValue("name", "")
		setValue("tel", "")
		setValue("description", "")
		setValue("address", "")
		setValue("region", "PUE")
		setValue("members", 0)
		setValue("hora", 0)
		setValue("serenata", 0)
		setValue("contrato", 0)
		setValue("category_mariachi", "")
		//setValue("coordinator", "")
		setValue("elements", "")
		setValue("stage", "PROSPECTO")
		// setValue("horaMinimo", 0)
		// setValue("horaRegular", 0)
		// setValue("horaFestivo", 0)
		// setValue("serenataMinimo", 0)
		// setValue("serenataRegular", 0)
		// setValue("serenataFestivo", 0)
		// setValue("contratoMinimo", 0)
		// setValue("contratoRegular", 0)
		// setValue("contratoFestivo", 0)

		//
	}, [])

	useEffect(() => {
		if (statusUser === "succeeded") {
			setValue("elements", "")
		}
	}, [statusUser])

	let dataMariachiToCard = {
		name: watch("name"),
		categorySet: watch("category_mariachi"),
		tel: watch("tel"),
		description: watch("description"),
		address: watch("address"),
		region: watch("region"),
		city: watch("city"),
		cp: watch("cp"),
		coordinator: watch("coordinator"),

		members: watch("members"),
		service: {
			hora: {
				minimo: 0,
				regular: 0,
				festivo: 0,
			},
			serenata: {
				minimo: 0,
				regular: 0,
				festivo: 0,
			},
			contrato: {
				minimo: 0,
				regular: 0,
				festivo: 0,
			},
		},
		stage: watch("stage"),
	}

	// const handleAddElement = () => {
	// 	const dataElements = watch("coordinator")
	// 	setCrewElements((elem) => [...elem, dataElements])
	// }

	useEffect(() => {
		if (getValues("elements") !== "") {
			const dataElements = {
				_key: nanoid(),
				_ref: getValues("elements"),
			}
			setCrewElements((elem) => [...elem, dataElements])
			setValue("elements", "")
		}
	}, [watch("elements")])

	useEffect(() => {
		setValue("members", crewElements.length + 1)
	}, [crewElements])

	const onSubmit = async (dataForm) => {
		setLoading(true)
		toastId = toast.loading("Cargando...")

		if (dataForm.name == "") {
			toast.error("¡Asignar nombre al grupo!")
			return
		}
		if (dataForm.coordinator == "") {
			toast.error("¡Falta elegir coordinator!")
			return
		}
		const existAlready = await mariachiExist(
			dataForm.name,
			dataForm?.tel || null,
			dataForm?.region
		)

		if (existAlready) {
			toast.dismiss(toastId)
			setLoading(false)
			toast.error(existAlready.message)
			return
		}

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
				hora: {
					minimo: dataForm?.services[0]?.minimo * 1 || 0,
					regular: dataForm?.services[0]?.regular * 1 || 0,
					festivo: dataForm?.services[0]?.festivo * 1 || 0,
				},
				serenata: {
					minimo: dataForm?.services[1]?.minimo * 1 || 0,
					regular: dataForm?.services[1]?.regular * 1 || 0,
					festivo: dataForm?.services[1]?.festivo * 1 || 0,
				},
				contrato: {
					minimo: dataForm?.services[2]?.minimo * 1 || 0,
					regular: dataForm?.services[2]?.regular * 1 || 0,
					festivo: dataForm?.services[2]?.festivo * 1 || 0,
				},
			},
			coordinator: { _ref: dataForm.coordinator },
			stage: [dataForm.stage],
			crew: dataElements,
			images: arrayImages,
			videos: arrayVideos,
			logo: logo.length > 0 ? logo[0] : null,
		}

		const createMutations = [
			{
				createOrReplace: transformDataMariachiToAdd(dataMariachiToCard),
			},
		]

		Promise.all([createMariachi(createMutations)])
			.then((addPromise) => {
				dispatch(
					addMariachiToGoogleSheet(addPromise[0].data.results[0].document)
				)
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setLogo([])
				setArrayImages([])
				setArrayVideos([])
			})
	}

	let toastId
	const notifyError = () => toast.error(error, { id: toastId })
	const notifySuccess = () =>
		toast.success("Mariachi creado correctamente", { id: toastId })

	useEffect(() => {
		if (status === "failed" || statusGS === "failed" || errorAdd) {
			toast.dismiss(toastId)
			notifyError()
			setLoading(false)

			dispatch(setStatus("idle"))
		}
		if (
			//status === "succeeded" &&
			statusGS === "succeeded" &&
			isSuccessAdd
		) {
			dispatch(setStatus("idle"))
			dispatch(setStatusGS("idle"))
			toast.dismiss(toastId)
			notifySuccess()
			setLoading(false)

			router.push("/mariachis")
		}
	}, [status, statusGS, isSuccessAdd, errorAdd, error])

	if (!userAdmin.exist || router.isFallback) {
		return <SpinnerLogo />
	}
	return (
		<Layout>
			{userAdmin.isAdmin ? (
				<div className={`no-scrollbar overflow-auto w-full h-full  `}>
					<div
						className={`no-scrollbar overflow-auto   h-full  flex flex-col items-center md:flex-row   md:justify-center md:items-center
							 `}
					>
						<div
							className={`m-auto md:mx-12  ${
								status !== "idle" || statusGS !== "idle"
									? "mt-20 flex justify-center items-center"
									: null
							}`}
						>
							<MariachiTab>
								<MariachiForm
									methods={methods}
									onSubmit={onSubmit}
									activeFormTab={activeFormTab}
									arrayImages={arrayImages}
									setArrayImages={setArrayImages}
									arrayVideos={arrayVideos}
									setArrayVideos={setArrayVideos}
									logo={logo}
									setLogo={setLogo}
									crewElements={crewElements}
									setCrewElements={setCrewElements}
									loading={loading}
									isSaving
								/>
								{/* )} */}
								<Toaster />
							</MariachiTab>
						</div>
						<div
							className={
								"w-full h-full md:w-4/12 md:h-5/6 m-auto mb-24 md:mb-10	 "
							}
						>
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
