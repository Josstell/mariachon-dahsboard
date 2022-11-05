import { useRef, useCallback } from "react"
import Image from "next/image"
import { useDropzone } from "react-dropzone"
import toast, { Toaster } from "react-hot-toast"
import { PhotographIcon, PlusIcon, TrashIcon } from "@heroicons/react/solid"
import { nanoid } from "@reduxjs/toolkit"

const url = process.env.NEXT_PUBLIC_SERVER_OWN

const UploadImageVideo = ({ file, methods, arrayImages, setArrayImages }) => {
	const descriptionRef = useRef(null)

	const { getValues } = methods

	let toastId
	const notifyError = (error) => toast.error(error, { id: toastId })
	const notifySuccess = (mess) =>
		toast.success(`Imagen ${mess} correctamente`, { id: toastId })

	const onDrop = useCallback((acceptedFiles) => {
		toastId = toast.loading("Guardando...")

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

					console.log("response: ", data)

					const des = descriptionRef.current.value

					//setUploadedFiles((old) => [...old, { ...data, description: des }])

					setArrayImages((oldArray) => [
						...oldArray,
						{
							_key: nanoid(),
							public_id: data.public_id,
							url: data.secure_url,
							metadata: { alt: des },
						},
					])

					descriptionRef.current.value = ""
					toast.dismiss(toastId)

					notifySuccess("guardada")
				}
			} catch (error) {
				console.log(error)
				toast.dismiss(toastId)
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
		toastId = toast.loading("Borrando...")

		try {
			const response = await fetch(url + file + `?id=${id}`, {
				method: "delete",
			})

			if (response) {
				setArrayImages(arrayImages.filter((file) => file.public_id !== id))
				notifySuccess("borrada")
			}
		} catch (error) {
			toast.dismiss(toastId)
			notifyError(error)
		}
	}

	return (
		<div className="m-2">
			<div className=" items-center border-b border-teal-500 py-2 mb-4">
				<input
					ref={descriptionRef}
					className="appearance-none bg-transparent border-none w-full text-slate-800 dark:text-gray-100 mr-3 py-1 px-2 leading-tight focus:outline-none m-2"
					type="text"
					placeholder="Breve descripción"
				/>
			</div>
			<div
				{...getRootProps()}
				className={`h-10 m-1 p-1 border-2 flex justify-around items-center cursor-pointer ${
					isDragActive ? "" : null
				}`}
			>
				<input {...getInputProps()} />
				<div>Agregar</div>
				<div className="inline-flex cursor-pointer">
					<PhotographIcon className="w-5 h-5 " />
					<PlusIcon className="font-extrabold w-3 h-3 mx-1" />
				</div>
			</div>

			{arrayImages.length > 0 &&
				arrayImages.map((image) => {
					return (
						<div className="my-5 mt-5" key={image._key}>
							<div className="flex justify-between items-center">
								{file === "image" ? (
									<div className="w-10 h-10 border-2 border-white rounded-full relative flex">
										<Image
											className="rounded-full "
											src={image.url}
											alt={image.metadata.alt}
											layout="fill"
											objectFit="cover"
										/>
									</div>
								) : (
									<video width="160" height="120" controls>
										<source src={image.secure_url} type="video/mp4" />
									</video>
								)}
								<div className="inline-flex	">
									<TrashIcon
										className="w-5 h-5 cursor-pointer"
										onClick={() => handleDeleteFile(image.public_id)}
									/>
								</div>
							</div>
						</div>
					)
				})}
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

export default UploadImageVideo
