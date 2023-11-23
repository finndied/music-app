import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { AiFillPlayCircle } from 'react-icons/ai'
import { MdPlaylistRemove } from 'react-icons/md'

import styles from './Playlist.module.scss'
import background from '../../assets/images/background.gif'
import UserMenu from '../../components/UserMenu/UserMenu'

import { removePlaylist, removeTrack } from '../../store/playlistSlice'

import {
	playTrackAsyncPlaylist,
	setCurrentPlaylistTrackIndex,
	setCurrentTrackType,
	setPlaylistTracks
} from '../../store/playTracks/PlaylistTracksSlice'

import { setIsPlaying } from '../../store/playerSlice'

import { RootState } from '../../store/store'
import { formatMillisecondsToMinutesSeconds } from '../../utils/TimeFormater'

const Playlist: FC = () => {
	const { playlistId } = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const playlists = useSelector((state: RootState) => state.playlist.playlists)

	const currentImage = useSelector(
		(state: RootState) => state.player.currentImage
	)

	const selectedPlaylist = playlists.find(
		playlist => playlist.id === Number(playlistId)
	)

	const currentPlaylistTrackIndex =
		useSelector(
			(state: RootState) => state.playlistTracks.currentPlaylistTrackIndex
		) || 0

	const playPlaylistTrackByIndex = (trackIndex: number) => {
		try {
			dispatch(setIsPlaying(true))
			dispatch(setCurrentPlaylistTrackIndex(trackIndex))
			dispatch(setPlaylistTracks(selectedPlaylist?.tracks || []))
			dispatch(setCurrentTrackType('playlistTracks'))
			dispatch(playTrackAsyncPlaylist(trackIndex) as any)
		} catch (error) {
			console.error('Error playing playlist track:', error)
			throw error
		}
	}

	const handleRemovePlaylist = (playlistId: number) => {
		dispatch(removePlaylist(playlistId))
		navigate('/')
	}

	const removeFromPlaylist = (playlistId: number, trackId: number) => {
		dispatch(removeTrack({ playlistId, trackId }))
	}

	if (!selectedPlaylist) {
		return <div>Playlist not found</div>
	}

	return (
		<div className={styles.wrapper}>
			<div
				className={styles.homeContainer}
				style={{ backgroundImage: `url(${currentImage || background})` }}
			></div>
			<div className={styles.homeContent}>
				<UserMenu className={styles.user} />
				<div className={styles.playlistWrapper}>
					<div className={styles.playlist}>
						<div className={styles.playlistInfo}>
							<img src={selectedPlaylist.image} alt='' />
							<div className={styles.playlistName}>{selectedPlaylist.name}</div>
							<div className={styles.buttons}>
								<div
									className={styles.play}
									onClick={() =>
										playPlaylistTrackByIndex(currentPlaylistTrackIndex)
									}
								>
									<AiFillPlayCircle />
								</div>
								<div
									className={styles.remove}
									onClick={() => handleRemovePlaylist(selectedPlaylist.id)}
								>
									<MdPlaylistRemove />
								</div>
							</div>
						</div>
					</div>
					<div className={styles.tracksWrapper}>
						{selectedPlaylist && selectedPlaylist.tracks ? (
							selectedPlaylist.tracks.map(selectedTrack => (
								<div
									key={selectedTrack.track?.id || selectedTrack.id}
									className={styles.trackCard}
								>
									<div
										className={styles.play}
										onClick={() =>
											playPlaylistTrackByIndex(
												selectedPlaylist.tracks.indexOf(selectedTrack)
											)
										}
									>
										<AiFillPlayCircle />
									</div>
									<div className={styles.trackInfo}>
										<div className={styles.trackName}>
											{selectedTrack.track?.name || selectedTrack.name}
										</div>
										<div className={styles.artistName}>
											{selectedTrack.track?.artists?.items[0].profile.name ||
												selectedTrack.artists[0].name}
										</div>
									</div>
									<div className={styles.removeFromPlaylist}>
										<MdPlaylistRemove
											onClick={() =>
												removeFromPlaylist(
													selectedPlaylist.id,
													selectedTrack.id
												)
											}
										/>
									</div>
									<div className={styles.trackDuration}>
										{formatMillisecondsToMinutesSeconds(
											selectedTrack.track?.duration?.totalMilliseconds ||
												selectedTrack.duration_ms
										)}
									</div>
								</div>
							))
						) : (
							<h4>No Tracks in the Playlist</h4>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Playlist
