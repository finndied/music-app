import { FC } from 'react'
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'
import styles from './AlbumList.module.scss'
import { ArtistInfo } from '../../../pages/Artist/types'
import { VscDebugStart } from 'react-icons/vsc'

interface AlbumListProps {
	showAllAlbums: boolean
	toggleShowAllAlbums: () => void
	maxVisibleAlbums: number
	artistInfo: ArtistInfo | null
}

const AlbumList: FC<AlbumListProps> = ({
	showAllAlbums,
	toggleShowAllAlbums,
	maxVisibleAlbums,
	artistInfo
}) => {
	// Extract an album array from artist information or an empty array if there is no information
	const albums = artistInfo?.artist.discography.albums.items || []
	const numAlbums = albums.length
	// Determining whether to display arrows to collapse/expand albums
	const shouldShowArrows = numAlbums > maxVisibleAlbums
	return (
		<div>
			<div className={styles.albumALl}>
				<h1>Albums</h1>{' '}
				{shouldShowArrows && (
					<button onClick={toggleShowAllAlbums}>
						{showAllAlbums ? <BiDownArrowAlt /> : <BiUpArrowAlt />}
					</button>
				)}
			</div>
			<div className={styles.artistAlbums}>
				{artistInfo?.artist.discography.albums.items
					.slice(0, showAllAlbums ? undefined : maxVisibleAlbums)
					.map((track, index) => (
						<div key={index} className={styles.albumInfo}>
							<img
								src={track.releases.items[0].coverArt.sources[0].url}
								alt=''
								className={styles.albumImage}
							/>
							<div className={styles.albumName}>
								{track.releases.items[0].name}
								<p>{track.releases.items[0].date.year}</p>
							</div>
							<div className={styles.playButton}>
								<VscDebugStart />
							</div>
						</div>
					))}
			</div>
		</div>
	)
}

export default AlbumList
