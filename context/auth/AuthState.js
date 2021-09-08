import { useReducer } from 'react'
import clientAxios from '../../config/axios'
import {
	PROCESS_ERROR,
	REGISTER_SUCCESSFULLY,
	USER_AUTHENTICATED,
} from '../../types'
import authContext from './authContext'
import { authReducer } from './authReducer'

const AuthState = ({ children }) => {
	// state inicial
	const initialState = {
		token: '',
		authenticated: null,
		user: null,
		message: null,
	}

	// definir el reducer
	const [state, dispatch] = useReducer(authReducer, initialState)

	// registrar usuario
	const registerUser = async (info) => {
		try {
			await clientAxios.post('/user', info)
			dispatch({
				type: REGISTER_SUCCESSFULLY,
				payload: 'Usuario creado correctamente.',
			})
		} catch (error) {
			dispatch({
				type: PROCESS_ERROR,
				payload: error.response.data.message,
			})
		}
	}

	// usuario autenticado
	const userAuthenticated = (name) => {
		dispatch({ type: USER_AUTHENTICATED, payload: name })
	}

	return (
		<authContext.Provider
			value={{
				token: state.token,
				authenticated: state.authenticated,
				user: state.user,
				message: state.message,
				registerUser,
				userAuthenticated,
			}}
		>
			{children}
		</authContext.Provider>
	)
}

export default AuthState
