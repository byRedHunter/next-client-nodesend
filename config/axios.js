import axios from 'axios'

const clientAxios = axios.create({
	baseURL: process.env.apiUrl,
})

export default clientAxios
