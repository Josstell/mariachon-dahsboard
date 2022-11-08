import { useCallback } from "react"
import Image from "next/image"
import { useDropzone } from "react-dropzone"
import toast, { Toaster } from "react-hot-toast"
import { TrashIcon, PencilIcon } from "@heroicons/react/solid"

const url = process.env.NEXT_PUBLIC_SERVER_OWN

const UploadLogo = ({ file, methods, logo, setLogo }) => {
	const { getValues } = methods

	let idToastNoty
	const notifyError = (error) => toast.error(error, { id: idToastNoty })
	const notifySuccess = (mess) =>
		toast.success(`${mess} correctamente`, { id: idToastNoty })

	const onDrop = useCallback((acceptedFiles) => {
		idToastNoty = toast.loading("Guardando...")

		acceptedFiles.forEach(async (acceptedFile) => {
			let formData = new FormData()

			formData.append(`${file}`, acceptedFile)

			//		formData.append("video", acceptedFile)çç
			const folderMariachi = getValues("name")

			formData.append("folder", folderMariachi)

			try {
				const response = await fetch(url + file, {
					method: "post",
					body: formData,
				})

				// toast.promise(response, {
				// 	loading: "Guardando",
				// 	success: "Archivo guardada",
				// 	error: "Hubo un error",
				// })
				if (response) {
					const data = await response.json()

					//setUploadedFiles((old) => [...old, { ...data, description: des }])

					setLogo((oldArray) => [
						...oldArray,
						{
							public_id: data.public_id,
							url: data.secure_url,
							metadata: { alt: `Logo - ${folderMariachi}` },
						},
					])

					console.log("casi guardado!!!!!!!!!!", logo)

					toast.dismiss(idToastNoty)
					console.log("logo guardado!!!!!!!!!!", logo)

					notifySuccess("Logo guardado")
				}
			} catch (error) {
				console.log(error)
				toast.dismiss(idToastNoty)
				notifyError(error)
			}
		})
	}, [])

	// const saveFile = (file,) => {
	// 	return new Promise((resolve, reject) => {
	// 		fetch(url + file, {
	// 			method: "post",
	// 			body: formData,
	// 		})
	// 			.then((res) => resolve(res.json()))
	// 			.catch((err) => reject(err))
	// 	})
	// }

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accepts: "image/*",
		multiple: false,
	})

	const handleDeleteFile = async (id) => {
		idToastNoty = toast.loading("Borrando...")

		try {
			const response = await fetch(url + file + `?id=${id}`, {
				method: "delete",
			})

			if (response) {
				setLogo([])
				notifySuccess("borrada")
			}
		} catch (error) {
			toast.dismiss(idToastNoty)
			notifyError(error)
		}
	}

	console.log("logo guardado", logo)

	return (
		<div className="m-2">
			{logo.length === 0 ? (
				<div className="relative w-64 h-40 ">
					<Image
						className="rounded-sm"
						src="https://res.cloudinary.com/djh8swesy/image/upload/v1667933183/Mariachon/Logo/logomariachon_ep2cdc.png"
						layout="fill"
						objectFit="contain"
						alt=""
					/>
					<div
						{...getRootProps()}
						className={`w-64 h-40   rounded-full  flex-1 relative m-1 p-1 justify-around items-center cursor-pointer ${
							isDragActive ? "" : null
						}`}
					>
						<input {...getInputProps()} />

						<PencilIcon className="w-5 h-5 absolute right-0 bottom-0" />
					</div>
				</div>
			) : (
				logo.map((log) => (
					<div className="relative w-64 h-40 " key={log.public_id}>
						<Image
							className="rounded-sm"
							src={log.url}
							layout="fill"
							objectFit="contain"
							alt={log.metadata.alt}
						/>
						<TrashIcon
							className="w-5 h-5 absolute right-0 bottom-2"
							onClick={() => handleDeleteFile(log.public_id)}
						/>
					</div>
				))
			)}
			<Toaster />
		</div>
	)
}

// async function getSignature() {
// 	const response = await fetch("/api/sign")
// 	const data = await response.json()
// 	const { signature, timestamp } = data
// 	return { signature, timestamp }
// }

export default UploadLogo
