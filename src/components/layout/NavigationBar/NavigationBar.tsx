import { FC, useState } from 'react'
import { AiFillHome, AiOutlinePlus } from 'react-icons/ai'
import { PiMicrophoneStage, PiApplePodcastsLogo } from 'react-icons/pi'
import { BsDiscFill, BsLayers } from 'react-icons/bs'
import styles from './NavigationBar.module.scss'
import { Link, useLocation } from 'react-router-dom'
import PlaylistModal from '../../PlaylistModal/PlaylistModal'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
const NavigationBar: FC = () => {
	const location = useLocation()
	const playlists = useSelector((state: RootState) => state.playlist.playlists)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const openModal = () => {
		setIsModalOpen(true)
	}

	const closeModal = () => {
		setIsModalOpen(false)
	}

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
				to='/trending'
				className={location.pathname === '/trending' ? styles.activeLink : ''}
			>
				<div>
					<BsDiscFill /> Trending
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
				<button onClick={openModal}>
					<AiOutlinePlus />
				</button>
			</div>
			{isModalOpen && <PlaylistModal closeModal={closeModal} />}
			<div className={styles.yourCollections}>
					{playlists.map(playlist => (
						<div className={styles.playlist} key={playlist.id}>
						<img src={playlist.image} alt=""/>
						<div>{playlist.name}</div>
						</div>
					))}
			</div>
		</div>
	)
}

export default NavigationBar
