import { useEffect } from 'react'
import Layout from '../components/Layout'
import { useAuthState } from '../zustand/authStore'

export default function Home() {
	const { verifyUser } = useAuthState((state) => state)

	useEffect(() => {
		verifyUser()
	}, [])

	return (
		<Layout>
			<h1>Home here</h1>
		</Layout>
	)
}
