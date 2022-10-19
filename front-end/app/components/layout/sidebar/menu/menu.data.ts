import { HiChartBar, HiCollection, HiHome, HiStar } from 'react-icons/hi'
import { IMenuItem } from '@/components/layout/sidebar/menu/menu.interface'

export const menu: IMenuItem[] = [
	{
		title: 'Main page',
		icon: HiHome,
		link: '/'
	},
	{
		title: 'Trends',
		icon: HiChartBar,
		link: '/trending'
	},
	{
		title: 'My channel',
		icon: HiStar,
		link: '/my-channel'
	},
	{
		title: 'My subscriptions',
		icon: HiCollection,
		link: '/subscriptions'
	}
]
