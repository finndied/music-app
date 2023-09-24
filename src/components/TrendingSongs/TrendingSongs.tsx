import React, { useState, useEffect } from 'react'
import styles from './TrendingSongs.module.scss'
import getTopSongs, { TopSong } from '../../api/getTopSongs'
import { VscDebugStart, VscDebugPause } from 'react-icons/vsc'

const TrendingSongs: React.FC = () => {
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
			{topSongs.slice(0, 3).map((song: TopSong) => (
				<div
					className={styles.targetTrack}
					key={song.chartEntryData.currentRank}
					onClick={() => togglePlayback(song.chartEntryData.currentRank)}
				>
					<img
						className={styles.image}
						src={song.trackMetadata.displayImageUri}
						width={250}
						alt=''
					/>
					<div className={styles.trackInfo}>
						<div className={styles.trackName}>
							{song.trackMetadata.trackName}
						</div>
						<div className={styles.overlay}>
							{isPlayingMap[song.chartEntryData.currentRank] ? (
								<VscDebugPause className={styles.icon} />
							) : (
								<VscDebugStart className={styles.icon} />
							)}
						</div>
						<div className={styles.artistName}>
							{song.trackMetadata.artists[0].name}
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default TrendingSongs
