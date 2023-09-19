import { FC } from 'react'
import { AiFillHome, AiOutlinePlus } from 'react-icons/ai'
import { PiMicrophoneStage, PiApplePodcastsLogo } from 'react-icons/pi'
import { BsDiscFill, BsLayers } from 'react-icons/bs'
import styles from './NavigationBar.module.scss'
import { Link, useLocation } from 'react-router-dom'

const NavigationBar: FC = () => {
	const location = useLocation()

	return (
		<div className={styles.menu}>
			<Link
				to='/'
				className={location.pathname === '/' ? styles.activeLink : ''}
			>
				<div>
					<AiFillHome />
					Home
				</div>
			</Link>
			<Link
				to='/artists'
				className={location.pathname === '/artists' ? styles.activeLink : ''}
			>
				<div>
					<PiMicrophoneStage /> Artists
				</div>
			</Link>
			<Link
				to='/albums'
				className={location.pathname === '/albums' ? styles.activeLink : ''}
			>
				<div>
					<BsDiscFill /> Albums
				</div>
			</Link>
			<Link
				to='/podcast'
				className={location.pathname === '/podcast' ? styles.activeLink : ''}
			>
				<div>
					<PiApplePodcastsLogo />
					Podcast
				</div>
			</Link>
			<div className={styles.collectionsMenu}>
				<div className={styles.collection}>
					<BsLayers /> Your Collections
				</div>
				<button>
					<AiOutlinePlus />
				</button>
			</div>
		</div>
	)
}

export default NavigationBar
