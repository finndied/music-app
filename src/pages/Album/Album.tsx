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

const Album: FC = () => {
	const { id } = useParams<{ id: string }>()
	const [albumInfo, setAlbumInfo] = useState<AlbumInfo | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

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
				style={{ backgroundImage: `url(${background})` }}
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
											<div className={styles.play}>
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
				<Player />
			</div>
		</div>
	)
}

export default Album
