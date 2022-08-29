/** @type {import('next').NextConfig} */

const STUDIO_REWRITE = {
	source: "/studio/:path*",
	destination:
		process.env.NODE_ENV === "development"
			? "http://localhost:3333/studio/:path*"
			: "/studio/index.html",
}

const nextConfig = {
	rewrites: () => [STUDIO_REWRITE],

	reactStrictMode: true,
	images: {
		domains: ["localhost", "lh3.googleusercontent.com", "drive.google.com"],
	},

	// async headers() {
	// 	return [
	// 		{
	// 			// matching all API routes
	// 			source: "/api/:path*",
	// 			headers: [
	// 				{ key: "Access-Control-Allow-Credentials", value: "true" },
	// 				{ key: "Access-Control-Allow-Origin", value: "*" },
	// 				{
	// 					key: "Access-Control-Allow-Methods",
	// 					value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
	// 				},
	// 				{
	// 					key: "Access-Control-Allow-Headers",
	// 					value:
	// 						"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
	// 				},
	// 			],
	// 		},
	// 	]
	// },
}

module.exports = nextConfig
