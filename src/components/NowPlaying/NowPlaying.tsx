import { FC } from 'react'
import styles from './NowPlaying.module.scss'
import { BsSoundwave } from 'react-icons/bs'
import { MdPlaylistAdd } from 'react-icons/md'
import { AiFillPlayCircle } from 'react-icons/ai'
import image from '../../assets/images/background.gif'

const NowPlaying: FC = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.nowPlaying}>
				<BsSoundwave /> Now Playing
			</div>
			<img className={styles.image} src={image} alt='' />
			<div className={styles.trackInfo}>
				<div className={styles.trackName}>
					Cry <MdPlaylistAdd />
				</div>
				<div className={styles.trackArtist}>Cigarettes After Sex</div>
			</div>
			<div className={styles.border}></div>
			<div className={styles.queue}>Queue</div>
			<div className={styles.queueTrack}>
				<img className={styles.trackImage} src={image} alt='' />
				<div className={styles.trackInfo}>
					<div className={styles.trackName}>Sweet</div>
					<div className={styles.trackArtist}>Cigarettes After Sex</div>
				</div>
				<div className={styles.play}>
					<AiFillPlayCircle />
				</div>
			</div>
			<div className={styles.queueTrack}>
				<img className={styles.trackImage} src={image} alt='' />
				<div className={styles.trackInfo}>
					<div className={styles.trackName}>Sweet</div>
					<div className={styles.trackArtist}>Cigarettes After Sex</div>
				</div>
				<div className={styles.play}>
					<AiFillPlayCircle />
				</div>
			</div>
			<div className={styles.queueTrack}>
				<img className={styles.trackImage} src={image} alt='' />
				<div className={styles.trackInfo}>
					<div className={styles.trackName}>Sweet</div>
					<div className={styles.trackArtist}>Cigarettes After Sex</div>
				</div>
				<div className={styles.play}>
					<AiFillPlayCircle />
				</div>
			</div>
		</div>
	)
}

export default NowPlaying
