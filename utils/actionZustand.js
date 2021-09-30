export const clearMessage = (set) => {
	setTimeout(() => {
		set((state) => ({
			...state,
			message: null,
		}))
	}, 4000)
}

export const manageError = (set, message) => {
	set((state) => ({
		...state,
		message,
	}))
}
