import { FC, useRef } from 'react'
import { useSelector } from 'react-redux'
import styles from './Player.module.scss'
import image from '../../assets/images/background.gif'
import { MdFavoriteBorder } from 'react-icons/md'
import { RootState } from '../../store/store'
import ProgressBar from './ProgressBar'
import PlayerControls from './PlayerControls'
import VolumeControl from './VolumeControl'
import { Link } from 'react-router-dom'
const Player: FC = () => {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const currentImage = useSelector(
		(state: RootState) => state.player.currentImage
	)
	const currentTrack = useSelector(
		(state: RootState) => state.tracks.currentTrack
	)

	return (
		<div className={styles.playerWrapper}>
			<div className={styles.track}>
				<img className={styles.trackImage} src={currentImage || image} alt='' />
				<div className={styles.trackInfo}>
					<div className={styles.trackTitle}>
						{currentTrack?.track
							? currentTrack.track.name
							: currentTrack?.name || 'No Track'}
					</div>
					<div className={styles.trackArtist}>
						{currentTrack?.track ? (
							<Link
								to={`/artist/${currentTrack?.track?.artists?.items[0]?.uri.replace(
									'spotify:artist:',
									''
								)}`} 
							>
								{currentTrack?.track?.artists?.items[0]?.profile?.name}
							</Link>
						) : (
							(currentTrack?.artists && currentTrack.artists[0]?.name) ||
							'No Artist'
						)}
					</div>
				</div>
			</div>
			<button className={styles.addToPlaylistButton}>
				<MdFavoriteBorder />
			</button>
			<div className={styles.controlsAndProgressBar}>
				<PlayerControls audioRef={audioRef} />
				<ProgressBar audioRef={audioRef} />
			</div>
			<VolumeControl audioRef={audioRef} />
			<audio ref={audioRef} />
		</div>
	)
}

export default Player
