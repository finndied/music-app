import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai'
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi'
import { IoRepeat } from 'react-icons/io5'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { setIsPlaying, setIsRandomMode } from '../../store/playerSlice'
import {
	playTopTrackAsync,
	playTrackAsyncAlbum,
	setCurrentAlbumTrackIndex,
	setCurrentTopTrackIndex
} from '../../store/playTracks/TopAndAlbumTracksSlice'
import { RootState } from '../../store/store'
import styles from './Player.module.scss'
import { ArtistInfo } from '../../pages/Artist/types'
import { AlbumInfo } from '../../pages/Album/types'
import {
	playTrackAsyncSearchResults,
	setCurrentSearchResultsTrackIndex
} from '../../store/playTracks/SearchResultsTracksSlice'

interface PlayerControlsProps {
	audioRef: React.RefObject<HTMLAudioElement | null>
}

const PlayerControls: React.FC<PlayerControlsProps> = ({ audioRef }) => {
	const dispatch = useDispatch()
	const [isRandomIconActive, setIsRandomIconActive] = useState<boolean>(false)
	const [isRepeatIconActive, setIsRepeatIconActive] = useState<boolean>(false)
	const [isRepeatMode, setIsRepeatMode] = useState<boolean>(false)
	const [progress, setProgress] = useState<number>(0)
	const [savedTime, setSavedTime] = useState<number>(0)
	const isPlaying = useSelector((state: RootState) => state.player.isPlaying)

	const artistInfo: ArtistInfo | null = useSelector(
		(state: RootState) => state.artistInfo
	)
	const albumInfo: AlbumInfo | null = useSelector(
		(state: RootState) => state.albumInfo
	)
	const isRandomMode = useSelector(
		(state: RootState) => state.player.isRandomMode
	)
	const currentTopTrackIndex = useSelector(
		(state: RootState) => state.tracks.currentTopTrackIndex
	)

	const currentAlbumTrackIndex = useSelector(
		(state: RootState) => state.tracks.currentAlbumTrackIndex
	)

	const currentSearchResultsTrackIndex = useSelector(
		(state: RootState) =>
			state.searchResultsTracks.currentSearchResultsTrackIndex
	)

	const currentTrackType: string = useSelector(
		(state: RootState) => state.tracks.currentTrackType
	)

	// Function for playing the next track
	const playNextTrack = () => {
		if (isRandomMode) {
			playRandomTrack(currentTrackType)
		} else {
			if (isRepeatMode) {
				if (audioRef.current) {
					audioRef.current.currentTime = 0
					audioRef.current.play()
				}
			} else {
				if (currentTrackType === 'topTracks') {
					dispatch(playTopTrackAsync(currentTopTrackIndex + 1))
					dispatch(setCurrentTopTrackIndex(currentTopTrackIndex + 1))
				} else if (currentTrackType === 'albumTracks') {
					dispatch(playTrackAsyncAlbum(currentAlbumTrackIndex + 1))
					dispatch(setCurrentAlbumTrackIndex(currentAlbumTrackIndex + 1))
				} else if (currentTrackType === 'searchTracks') {
					dispatch(
						playTrackAsyncSearchResults(currentSearchResultsTrackIndex + 1)
					)
					dispatch(
						setCurrentSearchResultsTrackIndex(
							currentSearchResultsTrackIndex + 1
						)
					)
				}
			}
		}
	}
	// Function for playing the previous track
	const playPreviousTrack = () => {
		if (currentTrackType === 'topTracks') {
			dispatch(playTopTrackAsync(currentTopTrackIndex - 1))
			dispatch(setCurrentTopTrackIndex(currentTopTrackIndex - 1))
		} else if (currentTrackType === 'albumTracks') {
			dispatch(playTrackAsyncAlbum(currentAlbumTrackIndex - 1))
			dispatch(setCurrentAlbumTrackIndex(currentAlbumTrackIndex - 1))
		} else if (currentTrackType === 'searchTracks') {
			dispatch(playTrackAsyncSearchResults(currentSearchResultsTrackIndex - 1))
			dispatch(
				setCurrentSearchResultsTrackIndex(currentSearchResultsTrackIndex - 1)
			)
		}
	}

	// Effect that starts the next track when the current one ends
	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.addEventListener('ended', playNextTrack)

			return () => {
				audioRef.current!.removeEventListener('ended', playNextTrack)
			}
		}
	}, [audioRef, playNextTrack])

	// Function for playing a random track
	const playRandomTrack = (trackType: string) => {
		let trackIndexes: number[] = []

		if (
			(trackType === 'topTracks' &&
				artistInfo &&
				artistInfo?.artist.discography.topTracks.items) ||
			(trackType === 'albumTracks' && albumInfo && albumInfo?.tracks.items)
		) {
			if (trackType === 'topTracks') {
				trackIndexes = [
					...Array(artistInfo?.artist.discography.topTracks.items.length).keys()
				]
				if (currentTopTrackIndex !== null && currentTopTrackIndex >= 0) {
					const currentIndex = trackIndexes.indexOf(currentTopTrackIndex)
					if (currentIndex !== -1) {
						trackIndexes.splice(currentIndex, 1)
					}
				}
			} else if (trackType === 'albumTracks') {
				trackIndexes = [...Array(albumInfo?.tracks.items.length).keys()]
				if (currentAlbumTrackIndex !== null && currentAlbumTrackIndex >= 0) {
					const currentIndex = trackIndexes.indexOf(currentAlbumTrackIndex)
					if (currentIndex !== -1) {
						trackIndexes.splice(currentIndex, 1)
					}
				}
			}

			if (trackIndexes.length > 0) {
				const randomIndex = Math.floor(Math.random() * trackIndexes.length)
				const randomTrackIndex = trackIndexes[randomIndex]

				if (trackType === 'topTracks') {
					dispatch(playTopTrackAsync(randomTrackIndex))
				} else if (trackType === 'albumTracks') {
					dispatch(playTrackAsyncAlbum(randomTrackIndex))
				}
			}
		}
	}

	const toggleRandomMode = () => {
		dispatch(setIsRandomMode(!isRandomMode))
		setIsRandomIconActive(!isRandomIconActive)
	}

	const toggleRepeatMode = () => {
		setIsRepeatMode(!isRepeatMode)
		setIsRepeatIconActive(!isRepeatIconActive)
	}

	// Effect to control playback and pause
	useEffect(() => {
		let timeout: NodeJS.Timeout | null = null

		if (audioRef.current) {
			if (isPlaying) {
				if (audioRef.current.paused) {
					timeout = setTimeout(() => {
						audioRef.current!.currentTime = savedTime
						audioRef.current!.play()
					}, 100)
				}
			} else {
				if (!audioRef.current.paused) {
					setSavedTime(audioRef.current.currentTime)
					audioRef.current.pause()
				}
			}
		}

		return () => {
			if (timeout) {
				clearTimeout(timeout)
			}
		}
	}, [isPlaying, savedTime, audioRef])

	// Effect for tracking audio progress
	useEffect(() => {
		if (audioRef.current) {
			const updateProgress = () => {
				const newProgress =
					(audioRef.current!.currentTime / audioRef.current!.duration) * 100
				setProgress(newProgress)
			}

			audioRef.current.addEventListener('timeupdate', updateProgress)

			return () => {
				audioRef.current!.removeEventListener('timeupdate', updateProgress)
			}
		}
	}, [audioRef])

	return (
		<div className={styles.playerControls}>
			<button
				className={`${styles.button} ${isRandomMode ? styles.active : ''}`}
				onClick={toggleRandomMode}
			>
				<GiPerspectiveDiceSixFacesRandom />
			</button>
			<button className={styles.button} onClick={playPreviousTrack}>
				<BiSkipPrevious />
			</button>
			<button className={styles.button}>
				{!isPlaying ? (
					<AiFillPlayCircle onClick={() => dispatch(setIsPlaying(true))} />
				) : (
					<AiFillPauseCircle onClick={() => dispatch(setIsPlaying(false))} />
				)}
			</button>
			<button className={styles.button} onClick={playNextTrack}>
				<BiSkipNext />
			</button>
			<button
				className={`${styles.button} ${isRepeatMode ? styles.active : ''}`}
				onClick={toggleRepeatMode}
			>
				<IoRepeat />
			</button>
		</div>
	)
}

export default PlayerControls
