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
	setStatus,
} from "store/features/mariachis/mariachiSlice"
import SpinnerLoadign from "src/components/Spinners/SpinnerLoading"
import toast, { Toaster } from "react-hot-toast"

const addNewMariachi = () => {
	const [arrayImages, setArrayImages] = useState([])
	const [arrayVideos, setArrayVideos] = useState([])
	const router = useRouter()

	const userAdmin = useSelector(selectUserAdmin)
	const status = useSelector(selectStatus)
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
		//
	}, [])

	useEffect(() => {
		if (statusUser === "succeeded") {
			setValue("coordinator", "")
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
	}

	const onSubmit = (dataForm) => {
		//setLoading(true)

		const dataMariachiToCard = {
			name: dataForm.name,
			createdBy: { _ref: userAdmin._id, _type: "reference" },

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
			images: arrayImages,
			videos: arrayVideos,
		}

		dispatch(
			addMariachi({
				...dataMariachiToCard,
			})
		)
	}

	const notifyError = () => toast.error(error)
	const notifySuccess = () => toast.success("Mariachi creado correctamente")

	useEffect(() => {
		if (status === "failed") {
			notifyError()
			dispatch(setStatus("idle"))
		}
		if (status === "succeeded") {
			notifySuccess()
			dispatch(setStatus("idle"))

			//dispatch(setStatus("idle"))
			router.push("/mariachis")
		}
	}, [status, error])

	if (!userAdmin.exist || router.isFallback) {
		return <SpinnerLogo />
	}
	return (
		<Layout>
			{userAdmin.isAdmin ? (
				<div className={`no-scrollbar overflow-auto w-full h-full  `}>
					<div
						className={`no-scrollbar overflow-auto   h-full md:h-full flex flex-col md:flex-row md:justify-around
							 items-center`}
					>
						<div className={"w-4/12 h-3/5 "}>
							<MariachiTab>
								<MariachiForm
									methods={methods}
									onSubmit={onSubmit}
									activeFormTab={activeFormTab}
									arrayImages={arrayImages}
									setArrayImages={setArrayImages}
									arrayVideos={arrayVideos}
									setArrayVideos={setArrayVideos}
								/>
								<Toaster />
							</MariachiTab>
							{!(status === "idle") && <SpinnerLoadign />}
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
