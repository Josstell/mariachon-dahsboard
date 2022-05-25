import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"

import "../../styles/globals.css"
import { wrapper } from "../../store"

function MyApp({ Component, pageProps }) {
	return (
		<SessionProvider session={pageProps.session}>
			<ThemeProvider attribute="class">
				<Component {...pageProps} />
			</ThemeProvider>
		</SessionProvider>
	)
}

export default wrapper.withRedux(MyApp)
