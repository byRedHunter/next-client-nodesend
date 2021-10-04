import create from 'zustand'
import { combine, devtools } from 'zustand/middleware'
import clientAxios from '../config/axios'
import { clearMessage, manageError } from '../utils/actionZustand'

export const useApp = create(
	devtools(
		combine(
			{
				message: null,
				name: '',
				originalName: '',
				loading: false,
				downloads: 1,
				password: '',
				author: null,
				url: '',
			},
			(set, get) => ({
				showAlert: (message) => {
					set((state) => ({ ...state, message }))

					clearMessage(set)
				},

				uploadFile: async (formData, originalName) => {
					set((state) => ({ ...state, loading: true }))

					try {
						const response = await clientAxios.post('/file', formData)

						set((state) => ({
							...state,
							name: response.data.file,
							originalName,
						}))
					} catch (error) {
						console.log(error.response)
						manageError(set, 'Hubo un problema al subir el archivo.')
						clearMessage(set)
					}

					set((state) => ({ ...state, loading: false }))
				},

				createLink: async () => {
					const { name, originalName, downloads, password, author } = get()

					const data = {
						name,
						originalName,
						downloads,
						password,
						author,
					}

					try {
						const response = await clientAxios.post('/link', data)

						set((state) => ({ ...state, url: response.data.url }))
					} catch (error) {
						console.log(error.response)
						manageError(set, error.response.data.message)
						clearMessage(set)
					}
				},

				clearState: () => {
					set((state) => ({
						...state,
						message: null,
						name: '',
						originalName: '',
						loading: false,
						downloads: 1,
						password: '',
						author: null,
						url: '',
					}))
				},

				addPassword: (password) => {
					set((state) => ({ ...state, password }))
				},

				addDownloads: (downloads) => {
					set((state) => ({ ...state, downloads }))
				},
			})
		)
	)
)
