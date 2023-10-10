import { FC } from 'react'
import styles from './NowPlaying.module.scss'
import { BsSoundwave } from 'react-icons/bs'
import { MdPlaylistAdd } from 'react-icons/md'
import { AiFillPlayCircle } from 'react-icons/ai'
import image from '../../assets/images/background.gif'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'

const NowPlaying: FC = () => {
	const currentTrack = useSelector(
		(state: RootState) => state.tracks.currentTrack
	)
	const currentImage = useSelector(
		(state: RootState) => state.player.currentImage
	)
	// const nextTracks = useSelector((state: RootState) => state.tracks.topTracks)

	return (
		<div className={styles.wrapper}>
			<div className={styles.nowPlaying}>
				<BsSoundwave /> Now Playing
			</div>
			<img className={styles.image} src={currentImage || image} alt='' />
			<div className={styles.trackInfo}>
				{currentTrack && (
					<div className={styles.trackName}>
						{currentTrack?.track?.name || currentTrack?.name} <MdPlaylistAdd />
					</div>
				)}
				{currentTrack && (
					<div className={styles.trackArtist}>
						{currentTrack?.track?.artists?.items[0].profile?.name || currentTrack?.artists[0]?.name}
					</div>
				)}
			</div>
			<div className={styles.border}></div>
			<div className={styles.queue}>Queue</div>
			{/* start queue  */}
			{/* {nextTracks.slice(1, 4).map((nextTrack, index) => (
				<div className={styles.queueTrack} key={index}>
					<div className={styles.play}>
						<AiFillPlayCircle />
					</div>
					<img
						className={styles.trackImage}
						src={nextTrack.track.album.coverArt.sources[0]?.url || image}
						alt=''
					/>
					<div className={styles.trackInfo}>
						<div className={styles.nextTrackName}>{nextTrack.track?.name}</div>
						<div className={styles.trackArtist}>
							{nextTrack.track?.artists?.items[0].profile?.name}
						</div>
					</div>
				</div>
			))} */}

			<div className={styles.queueTrack}>
				<div className={styles.play}>
					<AiFillPlayCircle />
				</div>
				<img className={styles.trackImage} src={currentImage || image} alt='' />
				<div className={styles.trackInfo}>
					<div className={styles.nextTrackName}>
						{currentTrack?.track?.name || currentTrack?.name}
					</div>
					<div className={styles.trackArtist}>
						{currentTrack?.track?.artists?.items[0]?.profile?.name || currentTrack?.artists[0]?.name}
					</div>
				</div>
			</div>

			<div className={styles.queueTrack}>
				<div className={styles.play}>
					<AiFillPlayCircle />
				</div>
				<img className={styles.trackImage} src={currentImage || image} alt='' />
				<div className={styles.trackInfo}>
					<div className={styles.nextTrackName}>
						{currentTrack?.track?.name || currentTrack?.name}
					</div>
					<div className={styles.trackArtist}>
						{currentTrack?.track?.artists?.items[0]?.profile?.name || currentTrack?.artists[0]?.name}
					</div>
				</div>
			</div>
			{/* end queue */}
		</div>
	)
}

export default NowPlaying
