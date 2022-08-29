import { useTheme } from "next-themes"
import { MoonIcon, SunIcon } from "@heroicons/react/solid"

const ButtonDM = () => {
	const { theme, setTheme } = useTheme()

	const handleDarkMode = (e) => {
		e.preventDefault()
		setTheme(theme === "dark" ? "light" : "dark")
	}

	console.log("el tema", theme)
	return (
		<div className="mr-5" onClick={handleDarkMode}>
			{theme === "dark" ? (
				<SunIcon className="w-5" />
			) : (
				<MoonIcon className="w-5" />
			)}
		</div>
	)
}

export default ButtonDM
