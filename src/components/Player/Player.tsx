import { FC, useRef, useState } from 'react'
import { MdPlaylistAdd } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import image from '../../assets/images/background.gif'
import { RootState } from '../../store/store'
import LoaderName from '../../utils/LoaderName'
import AddTrackToPlaylistModal from '../AddTrackToPlaylistModal/AddTrackToPlaylistModal'
import { Track } from '../Artist/TopTracks/TopTracks'
import styles from './Player.module.scss'
import PlayerControls from './PlayerControls'
import ProgressBar from './ProgressBar'
import VolumeControl from './VolumeControl'

const Player: FC = () => {
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)

	const playlists = useSelector((state: RootState) => state.playlist.playlists)

	const openAddToPlaylistModal = (track: Track) => {
		setSelectedTrack(track)
	}

	const closeAddToPlaylistModal = () => {
		setSelectedTrack(null)
	}

	const currentImage = useSelector(
		(state: RootState) => state.player.currentImage
	)
	const currentTrack = useSelector((state: RootState) => {
		const tracksCurrentTrack = state.tracks.currentTrack
		const searchResultsTracksCurrentTrack =
			state.searchResultsTracks.currentTrack
		const playlistCurrentTrack = state.playlistTracks.currentTrack
		return (
			tracksCurrentTrack ||
			searchResultsTracksCurrentTrack ||
			playlistCurrentTrack
		)
	}) as Track | null

	return (
		<>
			<div>
				{selectedTrack !== null && (
					<AddTrackToPlaylistModal
						playlists={playlists}
						selectedTrack={selectedTrack}
						onClose={closeAddToPlaylistModal}
					/>
				)}
			</div>
			<div className={styles.playerWrapper}>
				<div className={styles.track}>
					<img
						className={styles.trackImage}
						src={currentImage || image}
						alt=''
					/>
					<div className={styles.trackInfo}>
						<div className={styles.trackTitle}>
							{currentTrack?.track
								? currentTrack.track.name
								: currentTrack?.name || <LoaderName />}
						</div>
						<div className={styles.trackArtist}>
							{currentTrack?.track ? (
								<Link
									to={`/artist/${currentTrack?.track?.artists?.items[0]?.uri.replace(
										'spotify:artist:',
										''
									)}`}
								>
									{currentTrack?.track?.artists?.items[0]?.profile?.name || (
										<LoaderName />
									)}
								</Link>
							) : currentTrack?.artists && currentTrack.artists.length > 0 ? (
								<Link to={`/artist/${currentTrack.artists[0]?.id}`}>
									{currentTrack.artists[0]?.name}
								</Link>
							) : (
								<LoaderName />
							)}
						</div>
					</div>
				</div>
				<button className={styles.addToPlaylistButton}>
					<MdPlaylistAdd onClick={() => openAddToPlaylistModal(currentTrack)} />
				</button>
				<div className={styles.controlsAndProgressBar}>
					<PlayerControls audioRef={audioRef} />
					<ProgressBar audioRef={audioRef} />
				</div>
				<VolumeControl audioRef={audioRef} />
				<audio ref={audioRef} />
			</div>
		</>
	)
}

export default Player
