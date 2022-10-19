import Link from 'next/link'
import React, { FC } from 'react'
import Menu from '@/components/layout/sidebar/menu/Menu'
import { menu } from '@/components/layout/sidebar/menu/menu.data'
import styles from './Sidebar.module.scss'

const Sidebar: FC = () => {
	// TODO: getProfile

	return (
		<aside className={styles.sidebar}>
			<Link href='/'>
				<a className={styles.logo}>Youtube 2.0</a>
			</Link>
			<Menu title='Menu' items={menu}></Menu>
			<div className={styles.copy}>2022 Vlad Shumskyi</div>
		</aside>
	)
}

export default Sidebar
