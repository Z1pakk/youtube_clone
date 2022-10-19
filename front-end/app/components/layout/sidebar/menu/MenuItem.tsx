import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { useAuth } from '@/hooks/useAuth'
import styles from './Menu.module.scss'
import { IMenuItem } from './menu.interface'

const MyComponent: FC<{ item: IMenuItem }> = ({ item }) => {
	const { user } = useAuth()

	// Returns /c/1 not like pathName /c/:id
	const { asPath } = useRouter()

	if (item.link === '/my-channel')
		if (user === null) return null
		else item.link = `/c/${user?.id}`

	return (
		<li>
			<Link href={item.link}>
				<a className={asPath === item.link ? styles.active : ''}>
					<span className={item.image ? styles.image : ''}>
						{item.icon && <item.icon />}
						{item.image && (
							<Image src={item.image} width={40} height={40} alt={item.title} />
						)}
					</span>
					<b>{item.title}</b>
				</a>
			</Link>
		</li>
	)
}

export default MyComponent
