/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from "react"

import {
	ChevronLeftIcon,
	ChevronRightIcon,
	VideoCameraIcon,
	PhotographIcon,
} from "@heroicons/react/outline"
import Image from "next/image"

const ImageSlider = ({ slidesS, videos }) => {
	const [current, setCurrent] = useState(0)
	const [switchImageVideos, setSwitchImageVideos] = useState(false)

	const [slides, setSlides] = useState(
		slidesS.length === 0
			? [{ url: "/images/mariachiTexcalco.png", metadata: { alt: "test" } }]
			: slidesS
	)
	useEffect(() => {
		setSlides(
			slidesS.length === 0
				? [{ url: "/images/mariachiTexcalco.png", metadata: { alt: "test" } }]
				: slidesS
		)
	}, [slidesS])

	const length = slides.length
	const lengthV = videos.length

	const nextSlide = () => {
		if (!switchImageVideos) {
			setCurrent(current === length - 1 ? 0 : current + 1)
		} else {
			setCurrent(current === lengthV - 1 ? 0 : current + 1)
		}
	}

	const prevSlide = () => {
		if (!switchImageVideos) {
			setCurrent(current === 0 ? length - 1 : current - 1)
		} else {
			setCurrent(current === 0 ? lengthV - 1 : current - 1)
		}
	}

	if (!Array.isArray(slides) || slides.length <= 0) {
		return null
	}

	///https://drive.google.com/file/d/1PhqBpejDTZ98e66pItr4rXQnQxCGBqzT/view?usp=sharing
	//https://drive.google.com/drive/u/0/folders/1OH6AMGBEldl0gZjUX8ls9PjdeS0I8iOl

	//drive.google.com/file/d/0B1kkjk0qkVKOTnlFWTdKV2J1ckk/view?usp=sharing&resourcekey=0-2Co8STTjgdnOLypaJTLXcQ

	//https://drive.google.com/file/d/0B1kkjk0qkVKOTUZVRmIwNjNlZ3c/view?usp=sharing&resourcekey=0-Jt6EuG5635k73Z5n7x6pww
	//https://drive.google.com/file/d/0B1kkjk0qkVKOTUZVRmIwNjNlZ3c/preview?resourcekey=0-Jt6EuG5635k73Z5n7x6pww

	return (
		<section className="relative w-full flex justify-center items-center pt-4">
			<ChevronLeftIcon
				className="absolute h-6 w-6  top-1/2 left-9 text-[3rem] dark:text-blue-900 z-10 cursor-pointer select-none	"
				onClick={prevSlide}
			/>

			<ChevronRightIcon
				className="absolute h-6 w-6  top-1/2 right-9 text-[3rem] text-blue-900 z-10 cursor-pointer select-none"
				onClick={nextSlide}
			/>
			<button
				onClick={() => setSwitchImageVideos(!switchImageVideos)}
				className=" absolute z-10 right-0 top-0 bg-black m-1 text-xs px-1 py-[1px] rounded-md cursor-pointer"
			>
				{!switchImageVideos ? (
					<VideoCameraIcon className="h-6 w-6  top-1/2" />
				) : (
					<PhotographIcon className="h-6 w-6  top-1/2" />
				)}
			</button>

			{!switchImageVideos
				? slides.map((slide, index) => {
						return (
							<div
								className={
									index === current
										? "opacity-1 transition duration-1000 scale-110 "
										: "opacity-0 transition ease-linear duration-1000 "
								}
								key={index}
								//	onClick={() => filePicherRef.current.click()}
							>
								{index === current && (
									<div className={`relative w-64 h-32 `}>
										<Image
											src={slide.url}
											alt={slide.metadata.alt}
											layout="fill"
											objectFit="contain"
										/>
									</div>
								)}
							</div>
						)
				  })
				: videos.map((video, index) => {
						return (
							<div
								className={
									index === current
										? "opacity-1 transition duration-1000 scale-110 "
										: "opacity-0 transition ease-linear duration-1000 "
								}
								key={index}
								//	onClick={() => filePicherRef.current.click()}
							>
								{index === current && (
									<div className={`relative w-64 h-32 `}>
										<iframe
											src={video.url}
											width="250"
											height="120"
											allow="autoplay"
										></iframe>
									</div>
								)}
							</div>
						)
				  })}
		</section>
	)
}

export default ImageSlider
