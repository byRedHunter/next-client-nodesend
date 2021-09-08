import React, { useContext } from 'react'
import authContext from '../context/auth/authContext'

const Alert = () => {
	const stateAuth = useContext(authContext)
	const { message } = stateAuth

	return (
		<div className='bg-purple-500 py-2 px-3 w-full my-3 max-w-lg text-center text-white mx-auto'>
			{message}
		</div>
	)
}

export default Alert
