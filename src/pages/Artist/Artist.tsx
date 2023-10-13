import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getArtistInfo from '../../api/Artist/getArtistInfo'
import styles from './Artist.module.scss'
import UserMenu from '../../components/UserMenu/UserMenu'
import background from '../../assets/images/background.gif'
import AlbumList from '../../components/Artist/AlbumList/AlbumList'
import SingleList from '../../components/Artist/SingleList/SingleList'
import { setArtistInfo } from '../../store/artistInfoSlice'
import TopTracks from '../../components/Artist/TopTracks/TopTracks'
import { formatNumberWithSpaces } from '../../utils/TimeFormater'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'

const Artist: FC = () => {
	// Getting the "id" parameter from the URL
	const { id } = useParams<{ id: string }>()
	const artistInfo = useSelector((state: RootState) => state.artistInfo)
	const dispatch = useDispatch()
	const [isLoading, setIsLoading] = useState<boolean>(true)
	// State for displaying the full biography of the artist
	const [showAll, setShowAll] = useState<boolean>(false)

	const [showAllAlbums, setShowAllAlbums] = useState<boolean>(false)
	const maxVisibleAlbums: number = 3

	const [showAllSingles, setShowAllSingles] = useState<boolean>(false)
	const maxVisibleSingles: number = 3

	useEffect(() => {
		const fetchArtistInfo = async () => {
			try {
				const response = await getArtistInfo(id || '')
				dispatch(setArtistInfo(response.data)) 
				setIsLoading(false)
			} catch (error) {
				console.error('Error fetching artist info:', error)
				setIsLoading(false)
			}
		}

		fetchArtistInfo()
	}, [id])

	// Handler for switching the display of the full biography of the artist
	const toggleShowAll = () => {
		setShowAll(!showAll)
	}

	return (
		<div className={styles.wrapper}>
			<div
				className={styles.homeContainer}
				style={{
					backgroundImage: `url(${
						artistInfo?.artist?.visuals?.headerImage?.sources[0]?.url ||
						background
					})`
				}}
			></div>
			<div className={styles.homeContent}>
				<UserMenu className={styles.user} />
				<div className={styles.artistsWrapper}>
					{isLoading ? (
						<div>Loading...</div>
					) : (
						<div className={styles.artistInfo}>
							<img
								src={artistInfo?.artist.visuals.avatarImage.sources[0].url}
								alt=''
								className={styles.artistImage}
							/>
							<div className={styles.artistName}>
								{artistInfo?.artist.profile.name}
								<div className={styles.artistStats}>
									<span>
										Followers:{' '}
										{artistInfo?.artist.stats.followers
											? formatNumberWithSpaces(
													artistInfo.artist.stats.followers
											  )
											: ''}
									</span>
									<span>
										Monthly Listeners:{' '}
										{artistInfo?.artist.stats.monthlyListeners
											? formatNumberWithSpaces(
													artistInfo.artist.stats.monthlyListeners
											  )
											: ''}
									</span>
								</div>

								<div className={styles.artistLeftSide}>
									<AlbumList
										artistInfo={artistInfo}
										showAllAlbums={showAllAlbums}
										toggleShowAllAlbums={() => setShowAllAlbums(!showAllAlbums)}
										maxVisibleAlbums={maxVisibleAlbums}
									/>
									<SingleList
										artistInfo={artistInfo}
										showAllSingles={showAllSingles}
										toggleShowAllSingles={() =>
											setShowAllSingles(!showAllSingles)
										}
										maxVisibleSingles={maxVisibleSingles}
									/>
								</div>
							</div>
							<div className={styles.artistRightSide}>
								<div className={styles.artistBio}>
									<div
										dangerouslySetInnerHTML={{
											__html: showAll
												? artistInfo?.artist?.profile?.biography?.text || ''
												: (artistInfo?.artist?.profile?.biography?.text || '').slice(0, 700)
										}}
									/>
									<button onClick={toggleShowAll}>
										{showAll ? 'Hide' : 'Show All'}
									</button>
								</div>
								<TopTracks artistInfo={artistInfo} />
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Artist
