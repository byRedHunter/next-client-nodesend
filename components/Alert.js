import React from 'react'
import { useAuthState } from '../zustand/authStore'

const Alert = () => {
	const { message } = useAuthState((state) => state)

	return (
		<div className='bg-purple-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto'>
			{message}
		</div>
	)
}

export default Alert
