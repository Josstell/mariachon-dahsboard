import axios from "axios"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const tokenWithWriteAccess = process.env.SANITY_API_TOKEN

export const getUsersApiAxios = axios.create({
	baseURL: `https://${projectId}.api.sanity.io/v2021-10-21/data`,
})
