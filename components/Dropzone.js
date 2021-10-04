import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useAuthState } from '../zustand/authStore'
import { useApp } from '../zustand/useApp'
import FormActions from './FormActions'

const Dropzone = () => {
	const { showAlert, uploadFile, loading, createLink } = useApp(
		(state) => state
	)
	const { authenticated } = useAuthState((state) => state)

	const onDropRejected = () => {
		showAlert('Archivo muy pesado, creen una cuenta para mayor beneficio.')
	}

	const onDropAccepted = useCallback(async (acceptedFiles) => {
		// crear formData
		const formData = new FormData()
		formData.append('file', acceptedFiles[0])

		// pasamos imagen y el nombre
		uploadFile(formData, acceptedFiles[0].path)
	}, [])

	// extraer contenido de dropzone
	const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
		useDropzone({
			onDropAccepted,
			onDropRejected,
			maxSize: authenticated ? 1000000 * 10 : 1000000,
		})

	const fileList = acceptedFiles.map((file) => (
		<li
			key={file.lastModified.toString()}
			className='bg-gray-500 p-3 shadow-lg rounded flex items-center justify-center'
		>
			<p className='font-bold text-lg'> {file.path} </p>
			<p className='text-gray-100 ml-3 mt-1'>
				{(file.size / Math.pow(1024, 2)).toFixed(2)} MB
			</p>
		</li>
	))

	const generateLink = async () => {
		await createLink()
	}

	return (
		<div className='md:flex-1 mb-3 mx-2 mt-10 lg:mt-0 border-dashed border-green-400 border-2 rounded'>
			{acceptedFiles.length > 0 ? (
				<div className='w-full p-5'>
					<h4 className='text-2xl font-bold text-center mb-4'>Archivos</h4>

					<ul>{fileList}</ul>

					{authenticated && <FormActions />}

					{loading ? (
						<p className='text-center text-2xl'>Subiendo Archivo...</p>
					) : (
						<button
							className='bg-red-500 py-2 px-5 rounded-lg text-light mt-10 hover:bg-red-600 w-full shadow-lg'
							type='button'
							onClick={generateLink}
						>
							Crear Enlace
						</button>
					)}
				</div>
			) : (
				<div
					{...getRootProps({
						className:
							'dropzone w-full flex flex-col items-center justify-center',
						style: { minHeight: '300px' },
					})}
				>
					<input {...getInputProps()} />

					<div className='text-center'>
						{isDragActive ? (
							<p className='text-2xl text-center text-gray-300'>
								Suelte su archivo
							</p>
						) : (
							<>
								<p className='text-2xl text-center text-gray-300'>
									Seleccione un archivo y arrastralo aquí.
								</p>
								<button
									className='bg-red-500 py-2 px-5 rounded-lg text-white mt-10 hover:bg-red-600'
									type='button'
								>
									Seleccionar Archivo
								</button>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	)
}

export default Dropzone
