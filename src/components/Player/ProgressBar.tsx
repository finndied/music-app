import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProgressAsync } from '../../store/playerSlice'
import { RootState } from '../../store/store'
import styles from './Player.module.scss'

interface ProgressBarProps {
	audioRef: React.RefObject<HTMLAudioElement | null>
}

const ProgressBar: React.FC<ProgressBarProps> = ({ audioRef }) => {
	const dispatch = useDispatch()
	const [progress, setProgress] = useState(0)
	const [currentTime, setCurrentTime] = useState(0)
	const audioUrl = useSelector((state: RootState) => state.player.audioUrl)
	const isPlaying = useSelector((state: RootState) => state.player.isPlaying)

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.addEventListener('timeupdate', () => {
				if (audioRef.current) {
					const newProgress =
						(audioRef.current.currentTime / audioRef.current.duration) * 100
					setProgress(newProgress)
					dispatch(updateProgressAsync(newProgress))
				}
			})
		}
	}, [audioRef, dispatch])

	// Effect for updating the audio URL and playing the track
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.src = audioUrl
			audioRef.current.load()
			setCurrentTime(0)
			if (isPlaying) {
				audioRef.current.play()
			}
		}
	}, [audioUrl, isPlaying])

	// Handler for track progress changes
	const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (audioRef.current) {
			const newProgress = parseInt(e.target.value)
			const newTime = (audioRef.current.duration * newProgress) / 100

			if (!isNaN(newTime) && isFinite(newTime)) {
				audioRef.current.currentTime = newTime
				setCurrentTime(newTime)
				setProgress(newProgress)
			}
		}
	}

	return (
		<div className={styles.progressBar}>
			<input
				type='range'
				value={isNaN(progress) ? 0 : progress}
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
	)
}

export default ProgressBar
