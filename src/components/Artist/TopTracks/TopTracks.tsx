import { FC } from 'react'
import styles from './TopTracks.module.scss'
import { ArtistInfo } from '../../../pages/Artist/types'
import {
	formatMillisecondsToMinutesSeconds,
	formatNumberWithSpaces
} from '../../../utils/TimeFormater'
import { AiFillPlayCircle } from 'react-icons/ai'
import { MdPlaylistAdd } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import {
	setCurrentTrack,
	setCurrentTopTrackIndex,
	playTopTrackAsync,
	setTopTracks,
	setCurrentTrackType
} from '../../../store/playTracks/TopAndAlbumTracksSlice'
import { setIsPlaying } from '../../../store/playerSlice'

interface TopTracksProps {
	artistInfo: ArtistInfo | null
}

const TopTracks: FC<TopTracksProps> = ({ artistInfo }) => {
	const dispatch = useDispatch()

	// Function for playing a top track by index
	const playTopTrackByIndex = (trackIndex: number) => {
		try {
			dispatch(setIsPlaying(true))
			dispatch(setCurrentTrack(trackIndex))
			dispatch(
				setTopTracks(artistInfo?.artist.discography.topTracks.items || [])
			)
			dispatch(setCurrentTopTrackIndex(trackIndex))
			dispatch(setCurrentTrackType('topTracks'))
			console.log(trackIndex)
			dispatch(playTopTrackAsync(trackIndex))
		} catch (error) {
			console.error('Error playing top track:', error)
			throw error
		}
	}

	return (
		<div>
			<div className={styles.artistTopTracks}>
				{artistInfo?.artist.discography.topTracks.items.map((track, index) => (
					<div key={index} className={styles.trackInfo}>
						<div className={styles.trackArtist}>
							<div
								className={styles.play}
								onClick={() => playTopTrackByIndex(index)}
							>
								{' '}
								<AiFillPlayCircle />
							</div>
							<img
								className={styles.trackImage}
								src={track.track.album.coverArt.sources[0].url}
								alt=''
							/>
							<div className={styles.trackName}>{track.track.name}</div>
						</div>
						<div className={styles.trackCount}>
							{formatNumberWithSpaces(track.track.playcount)}
						</div>
						<div className={styles.addToPlaylist}>
							<MdPlaylistAdd />
						</div>
						<div className={styles.trackDuration}>
							{formatMillisecondsToMinutesSeconds(
								track.track.duration.totalMilliseconds
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default TopTracks
