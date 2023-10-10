import React, { useState } from 'react'
import styles from './Player.module.scss'
import { FaVolumeUp } from 'react-icons/fa'

interface VolumeControlProps {
	audioRef: React.RefObject<HTMLAudioElement | null>
}

const VolumeControl: React.FC<VolumeControlProps> = ({ audioRef }) => {
	const [volume, setVolume] = useState(50)

   const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (audioRef.current) {
			const newVolume = parseInt(e.target.value)
			setVolume(newVolume)
			audioRef.current.volume = newVolume / 100
		}
	}

	return (
		<div className={styles.volumeControl}>
			<FaVolumeUp className={styles.volumeIcon} />
			<div className={styles.volumeIndicator}>
				<input
					type='range'
					value={volume}
					min='0'
					max='100'
					step='1'
					onChange={handleVolumeChange}
					className={styles.volumeInput}
				/>
				<div
					className={styles.volumeProgress}
					style={{ width: `${volume}%` }}
				></div>
			</div>
		</div>
	)
}

export default VolumeControl
