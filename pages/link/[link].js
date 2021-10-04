import React, { useState } from 'react'
import Alert from '../../components/Alert'
import Layout from '../../components/Layout'
import clientAxios from '../../config/axios'
import { useApp } from '../../zustand/useApp'

// va a acargar los datos
export async function getServerSideProps({ params }) {
	const { link } = params

	const response = await clientAxios.get(`/link/${link}`)

	return {
		props: {
			link: response.data,
		},
	}
}

// nos sirve para acceder a getStaticProps
// va a generar diferentes url de todo el contenido dinamico
export async function getServerSidePaths() {
	const response = await clientAxios.get('/link')

	return {
		paths: response.data.map((link) => ({ params: { link: link.url } })),
		fallback: false, // muestra pag 404, true -> muestra algo
	}
}

export default ({ link }) => {
	const { showAlert, message } = useApp((state) => state)

	const [hasPassword, setHasPassword] = useState(link.password)
	const [password, setPassword] = useState('')

	const verifyPassword = async (e) => {
		e.preventDefault()

		try {
			const response = await clientAxios.post(`/link/${link.link}`, {
				password,
			})
			setHasPassword(response.data.password)
		} catch (error) {
			showAlert(error.response.data.message)
		}
	}

	return (
		<Layout>
			{hasPassword ? (
				<>
					<p className='text-center font-bold text-gray-500'>
						Este enlace esta protegido con una contraseña, ingresalo a
						continuación.
					</p>

					{message && <Alert />}

					<div className='flex justify-center mt-5'>
						<div className='w-full max-w-lg'>
							<form
								className='bg-white rounded shadow-md px-8 py-6 mb-4'
								onSubmit={verifyPassword}
							>
								<div className='mb-2'>
									<label
										htmlFor='password'
										className='block text-black text-sm font-bold mb-2'
									>
										Contraseña
									</label>
									<input
										type='password'
										className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight outline-none'
										id='password'
										placeholder='Ingrese la contraseña'
										value={password}
										onChange={({ target }) => setPassword(target.value)}
									/>
								</div>

								<input
									type='submit'
									value='Validar Password'
									className='bg-red-500 hover:bg-red-600 w-full p-2 mt-8 text-white uppercase font-bold rounded cursor-pointer'
								/>
							</form>
						</div>
					</div>
				</>
			) : (
				<>
					<h1 className='text-4xl text-center text-red-400'>
						Descarga tu archivo:
					</h1>

					<div className='flex items-center justify-center mt-10'>
						<a
							href={`${process.env.apiUrl}/file/${link.file}`}
							className='bg-purple-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer hover:bg-purple-600'
							download
						>
							Aquí
						</a>
					</div>
				</>
			)}
		</Layout>
	)
}
