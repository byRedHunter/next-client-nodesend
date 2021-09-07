import React from 'react'
import Head from 'next/head'

import Header from './Header'

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<title>NodeSend</title>
				<link
					href='https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css'
					rel='stylesheet'
				/>
			</Head>

			<section className='bg-gray-100 min-h-screen'>
				<div className='container mx-auto'>
					<Header />
					<main className='py-6 px-5 md:px-0'>{children}</main>
				</div>
			</section>
		</>
	)
}

export default Layout
