import React, { FC, useState } from 'react'
import styles from './Player.module.scss'
import image from '../../assets/images/background.gif'
import { MdFavoriteBorder } from 'react-icons/md'
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi'
import { AiFillPlayCircle } from 'react-icons/ai'
import { FaVolumeUp } from 'react-icons/fa'
import { IoRepeat } from 'react-icons/io5'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'


const Player: FC = () => {
	const [progress, setProgress] = useState(0)
	const [volume, setVolume] = useState(50)

	const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newProgress = parseInt(e.target.value)
		setProgress(newProgress)
	}

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newVolume = parseInt(e.target.value)
		setVolume(newVolume)
	}

	return (
		<div className={styles.playerWrapper}>
			<div className={styles.track}>
				<img className={styles.trackImage} src={image} alt='' />
				<div className={styles.trackInfo}>
					<div className={styles.trackTitle}>Cry</div>
					<div className={styles.trackArtist}>Cigarettes After Sex</div>
				</div>
			</div>
			<button className={styles.addToPlaylistButton}>
				<MdFavoriteBorder />
			</button>
			<div className={styles.controlsAndProgressBar}>
				<div className={styles.playerControls}>
					<button className={styles.button}>
						<GiPerspectiveDiceSixFacesRandom />
					</button>
					<button className={styles.button}>
						<BiSkipPrevious />
					</button>
					<button className={styles.button}>
						<AiFillPlayCircle />
					</button>
					<button className={styles.button}>
						<BiSkipNext />
					</button>
					<button className={styles.button}>
						<IoRepeat />
					</button>
					<div className={styles.progressBar}>
						<input
							type='range'
							value={progress}
							min='0'
							max='100'
							step='1'
							onChange={handleProgressChange}
							className={styles.progressInput}
						/>
						<div
							className={styles.progressIndicator}
							style={{ width: `${progress}%` }}
						></div>
					</div>
				</div>
			</div>
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
		</div>
	)
}

export default Player
