import { PROCESS_ERROR, REGISTER_SUCCESSFULLY } from '../../types'

export const authReducer = (state, action) => {
	switch (action.type) {
		case REGISTER_SUCCESSFULLY:
		case PROCESS_ERROR:
			return {
				...state,
				message: action.payload,
			}

		default:
			return state
	}
}
