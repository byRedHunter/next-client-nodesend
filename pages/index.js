import { useEffect } from 'react'
import Link from 'next/link'

import Layout from '../components/Layout'
import Dropzone from '../components/Dropzone'
import { useAuthState } from '../zustand/authStore'
import { useApp } from '../zustand/useApp'
import Alert from '../components/Alert'

export default function Home() {
	const { verifyUser, token } = useAuthState((state) => state)
	const { message, url } = useApp((state) => state)

	useEffect(() => {
		if (token) verifyUser()
	}, [])

	return (
		<Layout>
			<div className='md:w-4/5 xl:w-3/5 mx-auto lg:mt-16'>
				{url ? (
					<div className='flex flex-col bg-purple-700 rounded mx-10 p-5 items-center lg:py-10'>
						<span className='font-bold text-red-300 text-2xl uppercase'>
							Tu URL es:
						</span>{' '}
						<p className='text-white mt-5'>
							{`${process.env.appUrl}/link/${url}`}
						</p>
						<button
							type='button'
							className='bg-red-500 hover:bg-red-600 mt-10 rounded shadow-lg py-3 px-5 uppercase font-bold text-gray-200'
							onClick={() =>
								navigator.clipboard.writeText(
									`${process.env.appUrl}/link/${url}`
								)
							}
						>
							Copiar Enlace
						</button>
					</div>
				) : (
					<>
						{message && <Alert />}

						<div className='lg:flex md:shasow-lg p-5 pb-10 bg-purple-800 rounded-lg text-white'>
							<Dropzone />

							<div className='md:flex-1 mb-3 mx-2 mt-10 lg:mt-0 lg:ml-5'>
								<h2 className='text-3xl font-sans font-bold'>
									Comparte archivos de forma sencilla y privada
								</h2>

								<p className='text-lg mt-5'>
									<span className='text-red-300 font-bold'>NodeSend</span> te
									permite compartir archivos con cifrado de extremo a extremo.
								</p>

								<Link href='/register'>
									<a className='block mt-3 text-green-400'>
										Crea una cuenta para mayores beneficios.
									</a>
								</Link>
							</div>
						</div>
					</>
				)}
			</div>
		</Layout>
	)
}
