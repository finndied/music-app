import { FC, useEffect, useState } from 'react'
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar'
import styles from './Album.module.scss'
import background from '../../assets/images/background.gif'
import UserMenu from '../../components/UserMenu/UserMenu'
import SearchInput from '../../components/Search/SearchInput'
import Player from '../../components/Player/Player'
import { useParams } from 'react-router-dom'
import getAlbum from '../../api/Artist/getAlbum'
import getAccessToken from '../../api/apiSpotify'
import { formatMillisecondsToMinutesSeconds } from '../../utils/TimeFormater'
import { MdPlaylistAdd, MdFavoriteBorder } from 'react-icons/md'
import { AiFillPlayCircle, AiOutlineCalendar } from 'react-icons/ai'
import { GoIssueTracks } from 'react-icons/go'
import { AlbumInfo } from './types'
import getTrack from '../../api/getTrack'

const Album: FC = () => {
	const { id } = useParams<{ id: string }>()

	const [albumInfo, setAlbumInfo] = useState<AlbumInfo | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [audioUrl, setAudioUrl] = useState('')
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentTrack, setCurrentTrack] = useState<any>(null)
	const [currentImage, setCurrentImage] = useState<string>('')
	const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0)

	// Function for track playback
	const playTrack = async (trackIndex: number) => {
		try {
			const track = albumInfo?.tracks.items[trackIndex]
			if (!track) {
				console.error('Invalid track index')
				return
			}

			const youtubeVideo = await getTrack(track.artists[0].name, track.name)

			if (youtubeVideo) {
				const audioUrl = youtubeVideo.audio[0]?.url
				const currentImage = albumInfo?.images[0].url || ''
				if (audioUrl) {
					setAudioUrl(audioUrl)
					setIsPlaying(true)
					setCurrentTrack(track)
					setCurrentImage(currentImage)
					setCurrentTrackIndex(trackIndex)
				} else {
					console.error('Error playing track: Invalid audio URL')
				}
			} else {
				console.error('Error playing track: No youtubeVideo data')
			}
		} catch (error) {
			console.error('Error playing track:', error)
		}
	}

	// Effect for loading album information
	useEffect(() => {
		getAccessToken()
			.then(accessToken => {
				getAlbum(accessToken, id || '')
					.then(data => {
						setAlbumInfo(data)
						console.log(data)
						setIsLoading(false)
					})
					.catch(error => {
						console.error('Error fetching album info:', error)
						setIsLoading(false)
					})
			})
			.catch(error => {
				console.error('Error fetching access token:', error)
				setIsLoading(false)
			})
	}, [id])

	return (
		<div className={styles.wrapper}>
			<NavigationBar />
			<div
				className={styles.homeContainer}
				style={{ backgroundImage: `url(${currentImage || background})` }}
			></div>
			<div className={styles.homeContent}>
				<SearchInput className={styles.searchInput} />
				<UserMenu className={styles.user} />
				<div className={styles.albumWrapper}>
					{isLoading ? (
						<div>Loading...</div>
					) : (
						<div>
							<div className={styles.album}>
								<img
									className={styles.albumImage}
									src={albumInfo?.images[0].url}
									alt=''
								/>
								<div className={styles.albumName}>
									{albumInfo?.name}
									<div className={styles.albumArtist}>
										{albumInfo?.artists[0].name}
									</div>
									<div className={styles.albumInfo}>
										<div className={styles.albumRelease}>
											<AiOutlineCalendar />
											{albumInfo?.release_date}
										</div>
										<div className={styles.albumTotalTracks}>
											<GoIssueTracks />
											{albumInfo?.total_tracks} tracks
										</div>
									</div>
								</div>
								<div className={styles.buttons}>
									<div className={styles.play}>
										<AiFillPlayCircle />
									</div>
									<div className={styles.addToPlaylist}>
										<MdFavoriteBorder />
									</div>
								</div>
							</div>
							<div>
								<div className={styles.trackWrapper}>
									{albumInfo?.tracks.items.map((track, index) => (
										<div className={styles.albumTracks} key={index}>
											<div
												className={styles.play}
												onClick={() => playTrack(index)}
											>
												<AiFillPlayCircle />
											</div>
											<div className={styles.trackArtist}>
												{track.artists[0].name}
											</div>
											<div className={styles.trackInfo}>
												<div className={styles.trackName}>{track.name}</div>
												<div className={styles.addToPlaylist}>
													<MdPlaylistAdd />
												</div>
												<div className={styles.trackCount}>
													{formatMillisecondsToMinutesSeconds(
														track.duration_ms
													)}
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
			<div className={styles.playerWrapper}>
				<Player
					currentImage={currentImage}
					currentTrack={currentTrack}
					audioUrl={audioUrl}
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					currentTrackIndex={currentTrackIndex}
					albumInfo={albumInfo}
					playTrack={playTrack}
				/>
			</div>
		</div>
	)
}

export default Album
