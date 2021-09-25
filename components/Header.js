import React from 'react'
import Link from 'next/link'
import { useAuthState } from '../zustand/authStore'

const Header = () => {
	const { authenticated, user, clearSession } = useAuthState((state) => state)

	return (
		<header className='py-5 flex flex-col sm:flex-row items-center justify-between'>
			<Link href='/'>
				<h1 className='text-red-400 text-4xl font-bold'>
					Node<span className='text-purple-500'>Send</span>
				</h1>
			</Link>

			<ul className='mt-6 sm:mt-0 flex gap-4 items-center'>
				{!authenticated && !user ? (
					<>
						<Link href='/login'>
							<a className='px-5 py-2 rounded border border-purple-500'>
								Iniciar Sesión
							</a>
						</Link>

						<Link href='/register'>
							<a className='bg-red-500 px-5 py-2 rounded text-white'>
								Crear Cuenta
							</a>
						</Link>
					</>
				) : (
					<>
						<p className='text-purple-500 font-medium'>Hola, {user.name}</p>
						<button
							className='bg-red-500 px-5 py-2 rounded text-white ml-2 hover:bg-red-700'
							onClick={clearSession}
						>
							Salir
						</button>
					</>
				)}
			</ul>
		</header>
	)
}

export default Header
