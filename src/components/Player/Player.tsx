import React, { FC, useState, useEffect, useRef } from 'react'
import styles from './Player.module.scss'
import image from '../../assets/images/background.gif'
import { MdFavoriteBorder } from 'react-icons/md'
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi'
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai'
import { FaVolumeUp } from 'react-icons/fa'
import { IoRepeat } from 'react-icons/io5'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { AlbumInfo } from '../../pages/Album/types'

interface PlayerProps {
	audioUrl: string
	isPlaying: boolean
	currentImage: string
	currentTrack: any
	currentTrackIndex: number
	setIsPlaying: (isPlaying: boolean) => void
	albumInfo: AlbumInfo | null
	playTrack: (trackIndex: number) => void
}

const Player: FC<PlayerProps> = ({
	audioUrl,
	isPlaying,
	currentImage,
	currentTrack,
	setIsPlaying,
	currentTrackIndex,
	albumInfo,
	playTrack
}) => {
	const [progress, setProgress] = useState(0)
	const [volume, setVolume] = useState(50)
	const [currentTime, setCurrentTime] = useState(0)
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const [isRandomMode, setIsRandomMode] = useState(false)
	const [isRepeatMode, setIsRepeatMode] = useState(false)
	const [trackEnded, setTrackEnded] = useState(false)
	const [isRandomIconActive, setIsRandomIconActive] = useState(false)
	const [isRepeatIconActive, setIsRepeatIconActive] = useState(false)

	// Function for playing the next track
	const playNextTrack = () => {
		if (isRandomMode) {
			playRandomTrack()
		} else if (
			albumInfo &&
			albumInfo.tracks &&
			currentTrackIndex < albumInfo.tracks.items.length - 1
		) {
			playTrack(currentTrackIndex + 1)
		}
	}
	// Track completion handler
	const handleTrackEnded = () => {
		if (audioRef.current) {
			audioRef.current.removeEventListener('ended', handleTrackEnded)
		}
		setTrackEnded(true)
	}

	// Effect that starts the next track when the current one ends
	useEffect(() => {
		if (trackEnded && isPlaying) {
			playNextTrack()
			setTrackEnded(false)
		}
	}, [trackEnded, isPlaying, playNextTrack])

	// Effect that adds a track completion handler
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.addEventListener('ended', handleTrackEnded)
		}
	}, [audioRef])

	// Effect to control playback and pause
	useEffect(() => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.play()
				audioRef.current.currentTime = currentTime
			} else {
				audioRef.current.pause()
				setCurrentTime(audioRef.current.currentTime)
			}
		}
	}, [isPlaying])

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

	// Effect for tracking audio progress
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.addEventListener('timeupdate', () => {
				if (audioRef.current) {
					const newProgress =
						(audioRef.current.currentTime / audioRef.current.duration) * 100
					setProgress(newProgress)
				}
			})
		}
	}, [])

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

	const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (audioRef.current) {
			const newVolume = parseInt(e.target.value)
			setVolume(newVolume)
			audioRef.current.volume = newVolume / 100
		}
	}

	// Function for playing the previous track
	const playPreviousTrack = () => {
		if (currentTrackIndex > 0) {
			playTrack(currentTrackIndex - 1)
		}
	}

	const toggleRandomMode = () => {
		setIsRandomMode(!isRandomMode)
		setIsRandomIconActive(!isRandomIconActive)
	}

	const toggleRepeatMode = () => {
		setIsRepeatMode(!isRepeatMode)
		setIsRepeatIconActive(!isRepeatIconActive)
	}

	// Function for playing a random track
	const playRandomTrack = () => {
		if (albumInfo && albumInfo.tracks && albumInfo.tracks.items) {
			const trackIndexes = [...Array(albumInfo.tracks.items.length).keys()]
			if (currentTrackIndex >= 0) {
				const currentIndex = trackIndexes.indexOf(currentTrackIndex)
				if (currentIndex !== -1) {
					trackIndexes.splice(currentIndex, 1)
				}
			}
			const randomIndex = Math.floor(Math.random() * trackIndexes.length)
			const randomTrackIndex = trackIndexes[randomIndex]
			playTrack(randomTrackIndex)
		}
	}

	return (
		<div className={styles.playerWrapper}>
			<div className={styles.track}>
				<img className={styles.trackImage} src={currentImage || image} alt='' />
				<div className={styles.trackInfo}>
					<div className={styles.trackTitle}>{currentTrack?.name}</div>
					<div className={styles.trackArtist}>
						{currentTrack?.artists[0]?.name}
					</div>
				</div>
			</div>
			<button className={styles.addToPlaylistButton}>
				<MdFavoriteBorder />
			</button>
			<div className={styles.controlsAndProgressBar}>
				<div className={styles.playerControls}>
					<button
						className={`${styles.button} ${
							isRandomIconActive ? styles.active : ''
						}`}
						onClick={toggleRandomMode}
					>
						<GiPerspectiveDiceSixFacesRandom />
					</button>
					<button className={styles.button} onClick={playPreviousTrack}>
						<BiSkipPrevious />
					</button>
					<button className={styles.button}>
						{!isPlaying ? (
							<AiFillPlayCircle onClick={() => setIsPlaying(true)} />
						) : (
							<AiFillPauseCircle onClick={() => setIsPlaying(false)} />
						)}
					</button>
					<button className={styles.button} onClick={playNextTrack}>
						<BiSkipNext />
					</button>
					<button
						className={`${styles.button} ${
							isRepeatIconActive ? styles.active : ''
						}`}
						onClick={toggleRepeatMode}
					>
						<IoRepeat />
					</button>
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
			<audio ref={audioRef} />
		</div>
	)
}

export default Player
