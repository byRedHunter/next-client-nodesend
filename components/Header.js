import React from 'react'
import Link from 'next/link'

const Header = () => {
	return (
		<header className='py-5 flex flex-col md:flex-row items-center justify-between'>
			<Link href='/'>
				<h1 className='text-red-400 text-4xl font-bold'>
					Node<span className='text-purple-500'>Send</span>
				</h1>
			</Link>

			<ul className='mt-6 md:mt-0 flex gap-4'>
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
			</ul>
		</header>
	)
}

export default Header
