import React from 'react'
import Layout from '@/components/layout/Layout'
import Catalog from '@/components/pages/catalog/Catalog'
import Discover from '@/components/pages/discover/Discover'

const Home = () => {
	return (
		<Layout title='Youtube 2.0 | VideoSharing'>
			<Discover />
			<Catalog />
		</Layout>
	)
}

export default Home
