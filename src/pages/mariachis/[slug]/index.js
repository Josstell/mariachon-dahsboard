import React, { useEffect, useState } from "react"
import { getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import MariachiCard from "src/components/Cards/MariachiCard"
import MariachiForm from "src/components/Forms/MariachiForm"
import Layout from "src/components/Layout"
import MariachiForbiden from "src/components/SVG/Icons/MariachiForbiden"
import MariachiTab from "src/components/Tabs/MariachiTab"
import { wrapper } from "store"
import { selectUserAdmin } from "store/features/users/userSlice"
import SpinnerLogo from "src/components/Spinners/SpinnerLogo"
import {
	addMariachiToGoogleSheet,
	selectError,
	selectStatus,
	selectStatusGS,
	setStatus,
	setStatusGS,
	updateMariachi,
} from "store/features/mariachis/mariachiSlice"
import toast, { Toaster } from "react-hot-toast"
import { dateGral, optionsDate } from "src/helpers/utils"
import { nanoid } from "@reduxjs/toolkit"

const mariachiById = ({ slug }) => {
	const data = useSelector((state) =>
		state.mariachis.mariachis.find((mar) => mar.slug.current === slug)
	)

	const router = useRouter()

	const userAdmin = useSelector(selectUserAdmin)
	const status = useSelector(selectStatus)
	const statusGS = useSelector(selectStatusGS)
	const error = useSelector(selectError)
	const dispatch = useDispatch()

	const [arrayImages, setArrayImages] = useState(data?.images || [])
	const [arrayVideos, setArrayVideos] = useState(data?.videos || [])
	const [crewElements, setCrewElements] = useState(
		data?.crew?.filter((_, index) => index > 0) || []
	)
	const [loading, setLoading] = useState(false)

	//Activar Tab
	const activeFormTab = useSelector(
		(state) => state.mariachis.mariachiTabActive
	)

	const methods = useForm({
		defaultValues: {
			services: [
				{
					minimo: data?.service?.hora?.minimo || 0,
					regular: data?.service?.hora?.regular || 0,
					festivo: data?.service?.hora?.festivo || 0,
				},
				{
					minimo: data?.service?.serenata?.minimo || 0,
					regular: data?.service?.serenata?.regular || 0,
					festivo: data?.service?.serenata?.festivo || 0,
				},
				{
					minimo: data?.service?.contrato?.minimo || 0,
					regular: data?.service?.contrato?.regular || 0,
					festivo: data?.service?.contrato?.festivo || 0,
				},
			],
		},
	})

	const { watch, setValue } = methods

	useEffect(() => {
		if (data === undefined) {
			router.push("/mariachis")
		}
	}, [])

	if (data === undefined) {
		return <SpinnerLogo />
	}

	useEffect(() => {
		if (!userAdmin.exist) {
			router.push("/")
		}

		setValue("name", data?.name)
		setValue("tel", data?.tel)
		setValue("description", data?.description)
		setValue("address", data?.address)
		setValue("region", data?.region || "")
		setValue("city", data?.city || "")
		setValue("cp", data?.cp || "")

		setValue("members", data?.members || "No definido")
		setValue("hora", data?.service?.hora)
		setValue("serenata", data?.service?.serenata)
		setValue("contrato", data?.service?.contrato)
		setValue("category_mariachi", data?.categorySet[0])
		setValue("coordinator", data?.coordinator._id)
		setValue("elements", "")
		setValue("stage", data?.stage[0] || "PROSPECTO")

		//
	}, [data])

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

	useEffect(() => {
		if (watch("elements") !== "") {
			const dataElements = {
				_key: nanoid(),
				_ref: watch("elements"),
			}
			setCrewElements((elem) => [...elem, dataElements])
		}
	}, [watch("elements")])

	useEffect(() => {
		if (watch("elements") !== "") {
			setValue("members", crewElements.length + 1)
			setValue("elements", "")
		}
	}, [crewElements])

	const onSubmit = (dataForm) => {
		setLoading(true)
		toastId = toast.loading("Cargando...")
		let dataElements = []
		crewElements.forEach((element) => {
			dataElements.push(element)
		})

		const coorSelected = { _key: nanoid(), _ref: dataForm.coordinator }

		dataElements.unshift(coorSelected)

		const dataMariachiToSend = {
			...dataForm,
			_id: data._id,
			modifiedBy: { _ref: userAdmin._id, _type: "reference" },
			dateModified: dateGral.toLocaleDateString("es-MX", optionsDate),
			coordinator: { _ref: dataForm.coordinator, _type: "reference" },
			categorySet: [dataForm.category_mariachi],
			city: dataForm.city,
			cp: dataForm.cp,
			images: arrayImages,
			videos: arrayVideos,
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
			crew: dataElements,
			stage: [dataForm?.stage],
		}
		console.log("Elementos", dataMariachiToSend)

		dispatch(updateMariachi(dataMariachiToSend))
		dispatch(addMariachiToGoogleSheet(dataMariachiToSend))
	}

	let toastId
	const notifyError = () => toast.error(error, { id: toastId })
	const notifySuccess = () =>
		toast.success("Mariachi actualizado correctamente", { id: toastId })

	useEffect(() => {
		if (status === "failed") {
			toast.dismiss(toastId)

			notifyError()
			dispatch(setStatus("idle"))
		}
		if (status === "succeeded" && statusGS === "succeeded") {
			dispatch(setStatus("idle"))
			dispatch(setStatusGS("idle"))
			toast.dismiss(toastId)

			notifySuccess()

			//dispatch(setStatus("idle"))
			router.push("/mariachis")
		}
	}, [status, error, statusGS])

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
							// className={`w-4/12 h-3/5 min-w-[370px] min-h-[890px] md:min-h-full ${
							className={`m-auto md:mx-12 ${
								status !== "idle" || statusGS !== "idle"
									? "flex justify-center items-center"
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
									crewElements={crewElements}
									setCrewElements={setCrewElements}
									loading={loading}
								/>
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

export default mariachiById

// export async function getStaticPaths() {
// 	const query = groq`
// *[_type == "mariachi"]{
//   _id,
//   slug
// }
// `
// 	const mariachis = await client.fetch(query)

// 	const paths = mariachis.map((path) => ({
// 		params: { slug: path.slug.current.toString() },
// 	}))

// 	console.log("links: ", paths)

// 	return { paths: paths, fallback: true }
// }

export const getServerSideProps = wrapper.getServerSideProps(
	() => async (ctx) => {
		// 	const query = groq`*[_type == "mariachi" && slug.current == $slug][0]{
		//   _id,
		//   slug{
		//   current
		// },
		// name,
		// description,
		// address,
		// city,
		// region,
		// cp,
		// tel,
		// coordinator->{
		//   _id,
		//   name,
		//   tel
		// },
		// crew,
		// members,
		// service,
		// categorySet,
		// logo,
		// images,
		// videos,
		// createdBy,
		// modifiedBy,
		// }`

		// 		const mariachi = await client.fetch(query, {
		// 			slug: ctx.params.slug,
		// 		})

		const session = await getSession(ctx)

		// const data = users.filter((est) => est._id.toString() === ctx.params.slug)

		// const data = await store
		// 	.dispatch(selectAllUsers())
		// 	.filter((est) => est.slug.toString() === params.slug)

		return {
			props: {
				slug: ctx.params.slug,
				session: session,
			},

			//	props: { data: data[0] }, // will be passed to the page component as props
		}
	}
)
