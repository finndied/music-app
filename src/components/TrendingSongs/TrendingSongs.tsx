import React, { useState, useEffect } from 'react'
import styles from './TrendingSongs.module.scss'
import getTopSongs, { TopSong } from '../../api/getTopSongs'
import { VscDebugStart, VscDebugPause } from 'react-icons/vsc'

interface TrendingSongsProps {
	tracksToDisplay: number
}

const TrendingSongs: React.FC<TrendingSongsProps> = ({ tracksToDisplay }) => {
	const [topSongs, setTopSongs] = useState<TopSong[]>([])
	const [isPlayingMap, setIsPlayingMap] = useState<Record<string, boolean>>({})

	const togglePlayback = (trackId: string) => {
		setIsPlayingMap(prevState => ({
			...prevState,
			[trackId]: !prevState[trackId]
		}))
	}

	useEffect(() => {
		getTopSongs()
			.then((data: TopSong[]) => {
				setTopSongs(data)
			})
			.catch(error => {
				console.error('Error fetching top songs:', error)
			})
	}, [])

	return (
		<div className={styles.tracks}>
			{topSongs.slice(0, tracksToDisplay).map((song: TopSong) => (
				<div
					className={styles.targetTrack}
					key={song.chartEntryData.currentRank}
					onClick={() => togglePlayback(song.chartEntryData.currentRank)}
				>
					<img
						className={styles.image}
						src={song.trackMetadata.displayImageUri}
						alt=''
					/>
					<div className={styles.trackInfo}>
						<div className={styles.trackName}>
							{song.trackMetadata.trackName}
						</div>
						<div className={styles.artistName}>
							{song.trackMetadata.artists[0].name}
						</div>
					</div>
						<div className={styles.playButton}>
							<VscDebugStart />
						</div>
				</div>
			))}
		</div>
	)
}

export default TrendingSongs
