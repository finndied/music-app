import { FC } from 'react'
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'
import styles from './SingleList.module.scss'
import { ArtistInfo } from '../../../pages/Artist/types'
import { VscDebugStart } from 'react-icons/vsc'

interface SingleListProps {
	artistInfo: ArtistInfo | null
	showAllSingles: boolean
	toggleShowAllSingles: () => void
	maxVisibleSingles: number
}

const SingleList: FC<SingleListProps> = ({
	artistInfo, 
	showAllSingles,
	toggleShowAllSingles,
	maxVisibleSingles
}) => {
	// Extract an single array from artist information or an empty array if there is no information
	const singles = artistInfo?.artist.discography.singles.items || []
	const numAlbums = singles.length
	// Determining whether to display arrows to collapse/expand singles
	const shouldShowArrows = numAlbums > maxVisibleSingles
	return (
		<div>
			<div className={styles.singleALl}>
				<h1>Singles</h1>{' '}
				{shouldShowArrows && (
					<button onClick={toggleShowAllSingles}>
						{showAllSingles ? <BiDownArrowAlt /> : <BiUpArrowAlt />}
					</button>
				)}
			</div>
			<div className={styles.artistSingles}>
				{artistInfo?.artist.discography.singles.items
					.slice(0, showAllSingles ? undefined : maxVisibleSingles)
					.map((track, index) => (
						<div key={index} className={styles.singleInfo}>
							<img
								src={track.releases.items[0].coverArt.sources[0].url}
								alt=''
								className={styles.singleImage}
							/>
							<div className={styles.singleName}>
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

export default SingleList
