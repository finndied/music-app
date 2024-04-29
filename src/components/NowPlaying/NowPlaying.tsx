import { FC } from 'react'
import { BsSoundwave } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import image from '../../assets/images/background.gif'
import { RootState } from '../../store/store'
import styles from './NowPlaying.module.scss'

const NowPlaying: FC = () => {
	const currentTrack = useSelector(
		(state: RootState) => state.tracks.currentTrack
	)

	const currentImage = useSelector(
		(state: RootState) => state.player.currentImage
	)

	const TopTracks = useSelector((state: RootState) => state.tracks.topTracks)

	const albumTracks = useSelector(
		(state: RootState) => state.tracks.albumTracks
	)

	// Determining the index of the current track in TopTracks and albumTracks
	let currentIndex = -1
	if (currentTrack) {
		currentIndex = TopTracks.findIndex(track => track === currentTrack)
		if (currentIndex === -1) {
			currentIndex =
				albumTracks.findIndex(track => track === currentTrack) +
				TopTracks.length
		}
	}

	// A function for getting tracks in a queue
	const getQueueTracks = () => {
		const queueTracks: Array<any> = []
		for (let i = currentIndex + 1; i <= currentIndex + 3; i++) {
			if (i < TopTracks.length) {
				queueTracks.push(TopTracks[i])
			} else if (i - TopTracks.length < albumTracks.length) {
				queueTracks.push(albumTracks[i - TopTracks.length])
			}
		}
		return queueTracks
	}

	// Getting tracks in the queue
	const queueTracks = getQueueTracks()

	return (
		<div className={styles.wrapper}>
			<div className={styles.nowPlaying}>
				<BsSoundwave /> Now Playing
			</div>
			<img className={styles.image} src={currentImage || image} alt='' />
			<div className={styles.trackInfo}>
				{currentTrack && (
					<div className={styles.trackName}>
						{currentTrack?.track?.name || currentTrack?.name}
					</div>
				)}
				{currentTrack && (
					<div className={styles.trackArtist}>
						{currentTrack?.track?.artists?.items[0].profile?.name ||
							currentTrack?.artists[0]?.name}
					</div>
				)}
			</div>
			<div className={styles.border}></div>
			<div className={styles.queue}>Queue</div>

			{/* start queue  */}
			{queueTracks.map((track, index) => (
				<div key={index} className={styles.queueTrack}>
					<img
						className={styles.trackImage}
						src={
							track?.track?.album?.coverArt?.sources[0]?.url ||
							currentImage ||
							image
						}
						alt=''
					/>
					<div className={styles.trackInfo}>
						<div className={styles.nextTrackName}>
							{track?.track?.name || track?.name}
						</div>
						<div className={styles.trackArtist}>
							{track?.track?.artists?.items[0]?.profile?.name ||
								track?.artists[0]?.name}
						</div>
					</div>
				</div>
			))}
			{/* end queue */}
		</div>
	)
}

export default NowPlaying
