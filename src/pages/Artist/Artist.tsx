import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import getArtistInfo from '../../api/getArtistInfo'
import styles from './Artist.module.scss'
import SearchInput from '../../components/Search/SearchInput'
import UserMenu from '../../components/UserMenu/UserMenu'
import Player from '../../components/Player/Player'
import NavigationBar from '../../components/layout/NavigationBar/NavigationBar'
import background from '../../assets/images/background.gif'
interface ArtistInfo {
	name: string
	artists: Artist[]
}

interface Artist {
	name: string
	images: ArtistImage[]
	followers: {
		total: number
	}
	genres: string[]
}

interface ArtistImage {
	url: string
}

const Artist: FC = () => {
	const { id } = useParams<{ id: string }>()
	const [artistInfo, setArtistInfo] = useState<ArtistInfo | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		getArtistInfo(id || '')
			.then((response: ArtistInfo) => {
				setArtistInfo(response)
				setIsLoading(false)
				{
					console.log('artist', response)
				}
			})
			.catch(error => {
				console.error('Error fetching artist info:', error)
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
				<div className={styles.artistsWrapper}>
					{isLoading ? (
						<div>Loading...</div>
					) : (
						<div className={styles.artistInfo}>
							<img
								src={artistInfo?.artists[0].images[0].url}
								alt=''
								className={styles.artistImage}
							/>
							<div className={styles.artistName}>
								{artistInfo?.artists[0].name}
								<div className={styles.artistFollowers}>
									Followers: {artistInfo?.artists[0].followers.total}
								</div>
							</div>
							<div className={styles.artistGenres}>
								Genres:
								{artistInfo?.artists[0].genres.map(
									(genre: string, index: number) => (
										<span key={index} className={styles.genre}>
											{genre}
										</span>
									)
								)}
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

export default Artist
