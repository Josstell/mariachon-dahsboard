import { nanoid } from "@reduxjs/toolkit"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast, { Toaster } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
//import SpinnerLoadign from "src/components/Spinners/SpinnerLoading"
import { regions } from "src/helpers/dataset"
import { dateGral, optionsDate } from "src/helpers/utils"
import {
	addNewUser,
	selectError,
	selectStatusUser,
	selectUserAdmin,
	setStatusUser,
} from "store/features/users/userSlice"
import Form from "../Smart/Form"
import { Button, Checkbox, Input, Select } from "../Smart/Inputs"

const AddNewUserComponent = ({ setAddUser, addUser, role }) => {
	const regionData = regions.response.estado
	//const router = useRouter()
	const userAdmin = useSelector(selectUserAdmin)

	const status = useSelector(selectStatusUser)
	const error = useSelector(selectError)

	const dispatch = useDispatch()

	const methods = useForm()

	const [loading, setLoading] = useState(false)

	const { setValue } = methods

	useEffect(() => {
		dispatch(setStatusUser("idle"))
		setValue("region", "PUE")
		setValue(
			"Cliente",
			role.find((rol) => rol === "Cliente")
		)
		setValue(
			"Mariachi",
			role.find((rol) => rol === "Mariachi")
		)
		setValue(
			"Coordinador",
			role.find((rol) => rol === "Coordinador")
		)
		setValue(
			"Admin",
			role.find((rol) => rol === "Admin")
		)
	}, [])

	let toastIdUs
	const notifyError = () => toast.error(error, { id: toastIdUs })
	const notifySuccess = () =>
		toast.success("Usuario creado correctamente", { id: toastIdUs })

	useEffect(() => {
		if (status === "failed") {
			setAddUser(!addUser)

			dispatch(setStatusUser("idle"))
			toast.dismiss(toastIdUs)
			notifyError()
			setLoading(false)
		}
		if (status === "succeeded") {
			setAddUser(!addUser)
			dispatch(setStatusUser("idle"))
			toast.dismiss(toastIdUs)
			notifySuccess()
			setLoading(false)
		}
	}, [status])

	const onSubmit = (dataFormUser) => {
		setLoading(true)
		toastIdUs = toast.loading("Cargando...")

		const data = {
			...dataFormUser,
			categorySet: [
				dataFormUser.Cliente,
				dataFormUser.Mariachi,
				dataFormUser.Coordinador,
				dataFormUser.Admin,
			],
			createdBy: { _ref: userAdmin?._id, _type: "reference" },
			dateCreated: dateGral?.toLocaleDateString("es-MX", optionsDate),
		}

		const dataUpdate = {
			...data,
			stage: ["AFILIADO"],
			email:
				data.email === "" ? `noemail${nanoid()}@mariachon.com.mx` : data.email,
			categorySet:
				data?.categorySet === undefined
					? []
					: data?.categorySet?.filter((cat) => cat !== false),
		}

		dispatch(addNewUser(dataUpdate))

		// 	//Creando variable session para recargar datos

		// 	dispatch(
		// 		setUserUpdate({
		// 			...dataForm,
		// 			_id: data._id,
		// 			categorySet: data?.categorySet || "",
		// 		})
		// 	)
		// 	dispatch(
		// 		updateUser({
		// 			...dataForm,
		// 			_id: data._id,
		// 			categorySet: data?.categorySet || "",
		// 		})
		// 	)
		// 	setLoading(false)
	}

	const params = { required: true }
	const paramsTel = {
		required: true,
		pattern: /^[0-9\b]+$/i,
		minLength: 10,
		maxLength: 10,
	}

	const paramsEmail = {
		pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
	}

	// if (!(status === "idle")) {
	// 	return <SpinnerLoadign />
	// }
	return (
		<div className="flex flex-col -mt-10">
			<Form onSubmit={onSubmit} methods={methods}>
				<Input
					hidden={true}
					name="name"
					label="Nombre completo"
					params={params}
				/>
				<Input hidden={true} name="username" label="Nombre de usuario" />

				<Input hidden={true} name="tel" label="Teléfono" params={paramsTel} />

				<Input
					hidden={true}
					name="email"
					label="Correo electrónico"
					params={paramsEmail}
				/>
				<Checkbox
					hidden={true}
					name={["Cliente", "Mariachi", "Coordinador", "Admin"]}
				/>
				{/* <Checkbox hidden={true} name="mariachi" label="Mariachi" />
				<Checkbox hidden={true} name="coordinator" label="Coordinador" />
				<Checkbox hidden={true} name="Admin" label="Admin" /> */}

				<Select
					hidden={true}
					name="region"
					options={regionData}
					label="Estado"
				/>
				<Button hidden={true} message="Agregar" disabledBtn={loading} />
			</Form>
			<Toaster />
		</div>
	)
}

export default AddNewUserComponent
