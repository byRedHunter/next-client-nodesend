import React from 'react'
import { useAuthState } from '../zustand/authStore'
import { useApp } from '../zustand/useApp'

const Alert = () => {
	const { message } = useAuthState((state) => state)
	const msgArchivo = useApp((state) => state.message)

	return (
		<div className='bg-purple-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto'>
			{message || msgArchivo}
		</div>
	)
}

export default Alert
