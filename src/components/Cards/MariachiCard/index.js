import Image from "next/image"
import React from "react"

const MariachiCard = () => {
	return (
		<div className="w-full h-full shadow-[0_0_100px_rgba(0,0,0,0.3)] dark:shadow-[0_0_100px_rgba(50,50,50,0.3)] bg-slate-100 dark:bg-slate-800  rounded-t-lg rounded-b-lg flex flex-col text-slate-300">
			<div className="relative w-full h-2/5	 ">
				<Image
					className="rounded-t-lg"
					src="/images/mariachiTexcalco.png"
					alt=""
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<h3></h3>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem optio
				eaque obcaecati magnam incidunt ipsam est eius, saepe architecto rem,
				soluta beatae? Sequi, non facere doloremque alias mollitia quibusdam
				rem.
			</p>
			<h5>
				<span>Dirección</span> Chescalco
			</h5>
			<h5>
				<span>Coordinador</span> Richard
			</h5>

			<h4>Precios</h4>
			<h5>
				<span>Serenata</span> $3000
			</h5>
			<h5>
				<span>Hora</span> $3000
			</h5>
			<h5>
				<span>Contrato</span> $3000
			</h5>
			<h6>
				<span>Categoria</span> basico
			</h6>
			<h6>
				<span>Elementos</span> 7
			</h6>
		</div>
	)
}

export default MariachiCard
