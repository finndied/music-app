import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { addTrackToPlaylist } from '../../store/playlistSlice' // Замените на путь к вашему экшену для добавления трека в плейлист
import styles from './AddTrackToPlaylistModal.module.scss'

interface Track {
	duration_ms: number
	name: string
	artists: {
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

interface Playlist {
	id: number
	name: string
	image: string
}

interface AddTrackToPlaylistModalProps {
	playlists: Playlist[]
	selectedTrack: Track
	onClose: () => void
}

const AddTrackToPlaylistModal: FC<AddTrackToPlaylistModalProps> = ({
	playlists,
	selectedTrack,
	onClose
}) => {
	const dispatch = useDispatch()

	const addToPlaylist = (playlistId: number) => {
		const playlist = playlists.find(pl => pl.id === playlistId)
		if (playlist) {
			console.log(selectedTrack)

			dispatch(addTrackToPlaylist({ playlistId, track: selectedTrack }))
			onClose()
		}
	}
	return (
		<div className={styles.playlistWrapper}>
			<div className={styles.playlist}>
				<h3>Select a playlist to add a track</h3>
				{playlists.map(playlist => (
					<div className={styles.playlistInfo} key={playlist.id}>
						<img src={playlist.image} width={50} alt='' />
						<div className={styles.playlistName}>{playlist.name}</div>
						<button
							className={styles.playlistAdd}
							onClick={() => addToPlaylist(playlist.id)}
						>
							Add to Playlist
						</button>
					</div>
				))}
				<button className={styles.close} onClick={onClose}>
					Close
				</button>
			</div>
		</div>
	)
}

export default AddTrackToPlaylistModal
