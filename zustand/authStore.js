import create from 'zustand'
import { combine, devtools, persist } from 'zustand/middleware'
import clientAxios from '../config/axios'
import tokenAuth from '../config/tokenAuth'

const clearMessage = (set) => {
	setTimeout(() => {
		set((state) => ({
			...state,
			message: null,
		}))
	}, 4000)
}

const manageError = (set, message) => {
	set((state) => ({
		...state,
		message,
	}))
}

export const useAuthState = create(
	devtools(
		persist(
			combine(
				{
					token: '',
					authenticated: null,
					user: null,
					message: null,
				},
				(set) => ({
					registerUser: async (info) => {
						try {
							await clientAxios.post('/user', info)
							set((state) => ({
								...state,
								message: 'Usuario creado correctamente.',
							}))
						} catch (error) {
							console.log(error.response)
							manageError(set, error.response.data.message)
						}

						clearMessage(set)
					},
					loginUser: async (info) => {
						try {
							const response = await clientAxios.post('/auth', info)

							set((state) => ({
								...state,
								token: response.data.token,
							}))
						} catch (error) {
							console.log(error.response)
							manageError(set, error.response.data.message)
						}

						clearMessage(set)
					},
					verifyUser: async () => {
						const storage = JSON.parse(
							sessionStorage.getItem('firefoxsend-auth')
						)

						if (storage) {
							const { state } = storage
							if (state.token) tokenAuth(state.token)
						}

						try {
							const response = await clientAxios.get('/auth')

							set((state) => ({
								...state,
								user: response.data,
								authenticated: true,
							}))
						} catch (error) {
							console.log(error.response)
						}
					},
					clearSession: () => {
						set((state) => ({
							...state,
							token: '',
							authenticated: null,
							user: null,
							message: null,
						}))
					},
				})
			),
			{
				name: 'firefoxsend-auth',
				getStorage: () => sessionStorage,
			}
		)
	)
)

/* export const useAuthState = create((setState, getState) => {
	return {
		token: '',
		authenticated: null,
		user: null,
		message: null,
		registerUser: async (info) => {
			try {
				await clientAxios.post('/user', info)
				setState({ message: 'Usuario creado correctamente.' })
			} catch (error) {
				console.log(error)
				setState({ message: error.response.data.message })
			}
		},
	}
})
 */
