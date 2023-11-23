import { FC, useEffect, useState } from 'react'
import styles from './Album.module.scss'
import background from '../../assets/images/background.gif'
import UserMenu from '../../components/UserMenu/UserMenu'
import { Link, useParams } from 'react-router-dom'
import getAlbum from '../../api/Artist/getAlbum'
import getAccessToken from '../../api/apiSpotify'
import { formatMillisecondsToMinutesSeconds } from '../../utils/TimeFormater'
import { MdPlaylistAdd, MdFavoriteBorder } from 'react-icons/md'
import { AiFillPlayCircle, AiOutlineCalendar } from 'react-icons/ai'
import { GoIssueTracks } from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux'
import {
	playTrackAsyncAlbum,
	setAlbumTracks,
	setCurrentTrackType
} from '../../store/playTracks/TopAndAlbumTracksSlice'
import { setAlbumInfo } from '../../store/albumInfoSlice'
import { RootState } from '../../store/store'
import { setIsPlaying } from '../../store/playerSlice'
import { setCurrentAlbumTrackIndex } from '../../store/playTracks/TopAndAlbumTracksSlice'
import AddTrackToPlaylistModal from '../../components/AddTrackToPlaylistModal/AddTrackToPlaylistModal'
import { Track } from '../../components/Artist/TopTracks/TopTracks'

const Album: FC = () => {
	const { id } = useParams<{ id: string }>()
	const albumInfo = useSelector((state: RootState) => state.albumInfo)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const dispatch = useDispatch()

	const playlists = useSelector((state: RootState) => state.playlist.playlists)

	const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)

	const openAddToPlaylistModal = (track: Track) => {
		setSelectedTrack(track)
	}

	const closeAddToPlaylistModal = () => {
		setSelectedTrack(null)
	}

	const currentImage = useSelector(
		(state: RootState) => state.player.currentImage
	)

	const currentAlbumTrackIndex =
		useSelector((state: RootState) => state.playlistTracks.playlistTracks) || 0

	// Function for track playback
	const playAlbumTrackByIndex = (trackIndex: number) => {
		try {
			dispatch(setIsPlaying(true))
			dispatch(setCurrentAlbumTrackIndex(trackIndex))
			dispatch(setAlbumTracks(albumInfo?.tracks.items || []))
			dispatch(setCurrentTrackType('albumTracks'))
			console.log(trackIndex)
			dispatch(playTrackAsyncAlbum(trackIndex) as any)
		} catch (error) {
			console.error('Error playing album track:', error)
			throw error
		}
	}
	// Effect for loading album information
	useEffect(() => {
		getAccessToken()
			.then(accessToken => {
				getAlbum(accessToken, id || '')
					.then(data => {
						dispatch(setAlbumInfo(data))
						setIsLoading(false)
					})
					.catch(error => {
						console.error('Error fetching album info:', error)
						setIsLoading(false)
					})
			})
			.catch(error => {
				console.error('Error fetching access token:', error)
				setIsLoading(false)
			})
	}, [id])

	return (
		<div className={styles.wrapper}>
			<div
				className={styles.homeContainer}
				style={{ backgroundImage: `url(${currentImage || background})` }}
			></div>
			<div className={styles.homeContent}>
				<UserMenu className={styles.user} />
				<div className={styles.albumWrapper}>
					{isLoading ? (
						<div>Loading...</div>
					) : (
						<div>
							<div className={styles.album}>
								<img
									className={styles.albumImage}
									src={albumInfo?.images[0].url}
									alt=''
								/>
								<div className={styles.albumName}>
									{albumInfo?.name}
									<Link to={`/artist/${albumInfo?.artists[0].id}`}>
										<div className={styles.albumArtist}>
											{albumInfo?.artists[0].name}
										</div>
									</Link>
									<div className={styles.albumInfo}>
										<div className={styles.albumRelease}>
											<AiOutlineCalendar />
											{albumInfo?.release_date}
										</div>
										<div className={styles.albumTotalTracks}>
											<GoIssueTracks />
											{albumInfo?.total_tracks} tracks
										</div>
									</div>
								</div>
								<div className={styles.buttons}>
									<div
										className={styles.play}
										onClick={() =>
											playAlbumTrackByIndex(currentAlbumTrackIndex)
										}
									>
										<AiFillPlayCircle />
									</div>
									<div className={styles.addToPlaylist}>
										<MdFavoriteBorder />
									</div>
								</div>
							</div>
							<div>
								<div className={styles.trackWrapper}>
									{albumInfo?.tracks.items.map((track, index) => (
										<div className={styles.albumTracks} key={index}>
											<div
												className={styles.play}
												onClick={() => playAlbumTrackByIndex(index)}
											>
												<AiFillPlayCircle />
											</div>
											<div className={styles.trackArtist}>
												{track.artists[0].name}
											</div>
											<div className={styles.trackInfo}>
												<div className={styles.trackName}>{track.name}</div>
												<div className={styles.addToPlaylist}>
													<MdPlaylistAdd
														onClick={() => openAddToPlaylistModal(track)}
													/>
												</div>
												<div className={styles.trackCount}>
													{formatMillisecondsToMinutesSeconds(
														track.duration_ms
													)}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					)}
				</div>
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

export default Album
