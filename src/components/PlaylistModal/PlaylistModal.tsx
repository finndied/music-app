import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPlaylist } from '../../store/playlistSlice'
import styles from './PlaylistModal.module.scss'
import backgroundImage from '../../assets/images/background.gif'
const PlaylistModal: React.FC<{ closeModal: () => void }> = ({
	closeModal
}) => {
	const dispatch = useDispatch()
	const [playlistName, setPlaylistName] = useState('')
	const [playlistImage, setPlaylistImage] = useState('')
	const [imageFile, setImageFile] = useState<File | null>(null);

	const createPlaylist = () => {
		if (playlistName.trim() === '') {
			alert('Please enter a playlist name.')
			return
		}

		const newPlaylist = {
			id: Date.now(),
			name: playlistName,
			image: playlistImage || backgroundImage,
			file: imageFile,
			trackIds: [],
		}

		dispatch(addPlaylist(newPlaylist))
		closeModal()
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0]
		const reader = new FileReader()

		reader.onload = event => {
			setPlaylistImage(event.target!.result as string)
		}

		if (file) {
			reader.readAsDataURL(file)
			setImageFile(file)
		}
	}

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				<h2>Create Playlist</h2>
				<input
					type='text'
					placeholder='Playlist Name'
					value={playlistName}
					onChange={e => {
						if (e.target.value.length <= 13) {
							setPlaylistName(e.target.value)
						}
					}}
				/>
				<input
					type='text'
					placeholder='Playlist Image URL or choose image'
					value={playlistImage}
					onChange={e => setPlaylistImage(e.target.value)}
				/>
				<input type='file' accept='image/*' onChange={handleImageChange} />
				<button onClick={createPlaylist}>Create</button>
				<button onClick={closeModal}>Cancel</button>
			</div>
		</div>
	)
}

export default PlaylistModal
