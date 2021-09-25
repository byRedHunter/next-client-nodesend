import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Layout from '../components/Layout'
import { useAuthState } from '../zustand/authStore'
import Alert from '../components/Alert'

const Login = () => {
	const { message, token, loginUser } = useAuthState((state) => state)
	const router = useRouter()

	useEffect(() => {
		if (token) router.push('/')
	}, [token])

	// formulario y validacion con formik y yup
	const formik = useFormik({
		initialValues: {
			email: 'test@gmail.com',
			password: 'testtest',
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email('El correo no es válido.')
				.required('El email es obligatorio'),
			password: Yup.string().required('La contraseña es obligatorio'),
		}),
		onSubmit: (values) => {
			loginUser(values)
		},
	})
	const { email, password } = formik.values

	return (
		<Layout>
			<div className='md:w-4/5 xl:w-3/5 mx-auto'>
				<h2 className='text-4xl font-sans font-bold text-red-400 text-center my-4'>
					Iniciar Sesión
				</h2>

				{message && <Alert />}

				<div className='flex justify-center mt-10'>
					<div className='max-w-lg w-full'>
						<form
							className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
							autoComplete='off'
							onSubmit={formik.handleSubmit}
						>
							<div className='mb-4'>
								<label
									htmlFor='email'
									className='block text-purple-500 text-sm font-bold md-2'
								>
									Correo Electrónico
								</label>
								<input
									type='email'
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2'
									id='email'
									placeholder='Email de usuario'
									name='email'
									value={email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.email && formik.errors.email && (
									<p className='text-red-500 mt-1'>{formik.errors.email}</p>
								)}
							</div>

							<div className='mb-4'>
								<label
									htmlFor='password'
									className='block text-purple-500 text-sm font-bold md-2'
								>
									Contraseña
								</label>
								<input
									type='password'
									className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2'
									autoComplete='current-value'
									id='password'
									placeholder='Contraseña de usuario'
									name='password'
									value={password}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.password && formik.errors.password && (
									<p className='text-red-500 mt-1'>{formik.errors.password}</p>
								)}
							</div>

							<input
								type='submit'
								value='Ingresar'
								className='bg-red-500 hover:bg-purple-500 w-full p-2 mt-8 text-white uppercase font-bold rounded cursor-pointer'
							/>
						</form>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Login
