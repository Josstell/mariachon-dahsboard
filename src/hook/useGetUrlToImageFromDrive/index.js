import { useEffect, useState } from "react"

export default function useGetUrlToImageFromDrive(urlFromDrive) {
	const urlDrive = "https://drive.google.com/uc?export=view&id="
	const [urlImgaeDrive, seturlImgaeDrive] = useState("")

	///https://drive.google.com/file/d/1clPxEJd6BLidvRqhRNj9xh5fICix5yFv/view?usp=sharing

	//https://drive.google.com/uc?export=view&id=1clPxEJd6BLidvRqhRNj9xh5fICix5yFv

	useEffect(() => {
		const getId = urlFromDrive.split("/", 6)[5]
		seturlImgaeDrive(urlDrive + getId)
	}, [])

	return urlImgaeDrive
}
