import React, { FC } from 'react'
import Line from '@/components/ui/Line'
import styles from './Menu.module.scss'
import MenuItem from './MenuItem'
import { IMenuItem } from './menu.interface'

interface IMenu {
	title: string
	items: IMenuItem[]
}

const MyComponent: FC<IMenu> = ({ items, title }) => {
	return (
		<nav className={styles.menu_sidebar}>
			<h3>{title}</h3>
			<ul>
				{items.map((item, index) => (
					<MenuItem key={index} item={item} />
				))}
			</ul>
			<Line />
		</nav>
	)
}

export default MyComponent
