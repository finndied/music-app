import { FC } from 'react'
import styles from './Playlist.module.scss'
import background from '../../assets/images/background.gif'
import UserMenu from '../../components/UserMenu/UserMenu'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../store/store'
import { AiFillPlayCircle } from 'react-icons/ai'
import { formatMillisecondsToMinutesSeconds } from '../../utils/TimeFormater'
import { removePlaylist, removeTrack } from '../../store/playlistSlice'
import { useNavigate } from 'react-router-dom'
import { MdPlaylistRemove } from 'react-icons/md'

const Playlist: FC = () => {
	const { playlistId } = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const playlists = useSelector((state: RootState) => state.playlist.playlists)
	const selectedPlaylist = playlists.find(
		playlist => playlist.id === Number(playlistId)
	)

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
				style={{ backgroundImage: `url(${background})` }}
			></div>
			<div className={styles.homeContent}>
				<UserMenu className={styles.user} />
				<div className={styles.playlistWrapper}>
					<div className={styles.playlist}>
						<div className={styles.playlistInfo}>
							<img src={selectedPlaylist.image} alt='' />
							<div className={styles.playlistName}>{selectedPlaylist.name}</div>
							<div className={styles.buttons}>
								<div className={styles.play}>
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
									<div className={styles.play}>
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
												removeFromPlaylist(selectedPlaylist.id, selectedTrack.id)
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
