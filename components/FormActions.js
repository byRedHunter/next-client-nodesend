import React, { useState } from 'react'
import { useApp } from '../zustand/useApp'

const FormActions = () => {
	const [hasPassword, setHasPassword] = useState(false)

	const { addPassword, addDownloads } = useApp((state) => state)

	return (
		<div className='w-full'>
			<div className='mt-5'>
				<label htmlFor='' className='text-lg text-gary-800'>
					Eliminar tras:
				</label>
				<select
					className='appearance-none w-full mt-2 bg-white border border-gary-400 text-black py-3 px-4 rounded leading-none focus:outline-none focus:border-gray-500'
					onChange={({ target }) => addDownloads(Number(target.value))}
				>
					<option value='1'>1 Descarga</option>
					<option value='5'>5 Descargas</option>
					<option value='10'>10 Descargas</option>
					<option value='20'>20 Descargas</option>
				</select>
			</div>

			<div className='mt-5'>
				<div className='flex items-center'>
					<label htmlFor='' className='text-lg text-gary-800'>
						Proteger con contraseña
					</label>
					<input
						className='ml-5 mt-1 cursor-pointer border border-gray-400'
						type='checkbox'
						onChange={() => setHasPassword(!hasPassword)}
					/>
				</div>

				{hasPassword && (
					<input
						type='password'
						className='appearance-none w-full mt-2 bg-white border border-gray-400 text-black py-3 px-4 rounded leading-none focus:outline-none focus:border-gray-500'
						onChange={({ target }) => addPassword(target.value)}
					/>
				)}
			</div>
		</div>
	)
}

export default FormActions
