import React from 'react'
import Layout from '../../components/Layout'
import clientAxios from '../../config/axios'

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
	return (
		<Layout>
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
		</Layout>
	)
}
