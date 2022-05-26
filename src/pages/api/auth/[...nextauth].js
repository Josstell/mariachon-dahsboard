import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	// jwt: {
	// 	encryption: true,
	// },
	// secret: process.env.SECRET,
	pages: {
		signIn: "/singin",
	},
	callbacks: {
		// async jwt(token, account) {
		// 	if (account?.accessToken) {
		// 		token.accessToken = account.accessToken
		// 	}
		// 	return token
		// },
		async session({ session, token }) {
			session.user.username = session.user.name
				.split(" ")
				.join("")
				.toLocaleLowerCase()

			session.user.uid = token.sub
			return session
		},
		// redirect: async (url, _baseUrl) => {
		// 	if (url === "/profile") {
		// 		return Promise.resolve("/")
		// 	}
		// 	return Promise.resolve("/")
		// },
	},
})
