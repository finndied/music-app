import { FC, useState } from 'react'
import styles from './TopTracks.module.scss'
import { ArtistInfo } from '../../../pages/Artist/types'
import {
	formatMillisecondsToMinutesSeconds,
	formatNumberWithSpaces
} from '../../../utils/TimeFormater'
import { AiFillPlayCircle } from 'react-icons/ai'
import { MdPlaylistAdd } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import {
	setCurrentTrack,
	setCurrentTopTrackIndex,
	playTopTrackAsync,
	setTopTracks,
	setCurrentTrackType
} from '../../../store/playTracks/TopAndAlbumTracksSlice'
import { setIsPlaying } from '../../../store/playerSlice'
import { RootState } from '../../../store/store'
import AddTrackToPlaylistModal from '../../AddTrackToPlaylistModal/AddTrackToPlaylistModal'

interface TopTracksProps {
	artistInfo: ArtistInfo | null
}

export interface Track {
	duration_ms: number
	name: string
	artists: {
		id: string
		name: string
	}[]
	id: number
	track: {
		id: number
		album: {
			coverArt: {
				sources: { url: string }[]
			}
		}
		name: string
		artists: {
			items: {
				uri: string
				profile: {
					name: string
				}
			}[]
		}
		duration: {
			totalMilliseconds: number
		}
	}
}

const TopTracks: FC<TopTracksProps> = ({ artistInfo }) => {
	const dispatch = useDispatch()
	const playlists = useSelector((state: RootState) => state.playlist.playlists)

	const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)

	const openAddToPlaylistModal = (track: Track) => {
		setSelectedTrack(track)
	}

	const closeAddToPlaylistModal = () => {
		setSelectedTrack(null)
	}

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
			dispatch(playTopTrackAsync(trackIndex) as any)
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
							<MdPlaylistAdd onClick={() => openAddToPlaylistModal(track)} />
						</div>
						<div className={styles.trackDuration}>
							{formatMillisecondsToMinutesSeconds(
								track.track.duration.totalMilliseconds
							)}
						</div>
					</div>
				))}
			</div>
			{selectedTrack !== null && (
				<AddTrackToPlaylistModal
					playlists={playlists}
					selectedTrack={selectedTrack}
					onClose={closeAddToPlaylistModal}
				/>
			)}
		</div>
	)
}

export default TopTracks
