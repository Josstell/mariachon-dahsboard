import { getProviders, signIn } from "next-auth/react"
import LogoMariachon from "../../components/SVG/Icons/LogoMariachon"

function index({ providers }) {
	return (
		<>
			<div className="flex flex-col items-center justify-center min-h-screen py-2  px-14 text-center">
				<LogoMariachon className="w-120 h-60 fill-slate-900 dark:fill-slate-50 relative cursor-pointer" />

				<div className="mt-5">
					{Object.values(providers).map((provider) => (
						<div key={provider.name}>
							<button
								className="p-3 bg-blue-500 rounded-lg text-white"
								onClick={() => signIn(provider.id, { callbackUrl: "/" })}
							>
								Entrar con {provider.name}
							</button>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps(ctx) {
	const providers = await getProviders()
	return {
		props: {
			providers,
		},
	}
}
export default index
