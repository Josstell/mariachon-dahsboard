import SpinnerLoadign from "src/components/Spinners/SpinnerLoading"
import { regions } from "src/helpers/dataset"
import Form from "../Smart/Form"
import { Button, Checkbox, Input, Select } from "../Smart/Inputs"

const UserForm = ({ methods, onSubmit, loading, data }) => {
	const regionData = regions.response.estado
	//const router = useRouter()

	//const dispatch = useDispatch()

	// const onSubmit = (dataForm) => {
	// 	setLoading(true)

	// 	console.log(dataForm)

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

	// 	router.push("/usuarios")
	// }

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
	return (
		<>
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
				<Button
					hidden={true}
					message={data?.button ? data?.button : "Actualizar"}
				/>
			</Form>
			{loading && <SpinnerLoadign />}
		</>
	)
}

export default UserForm
