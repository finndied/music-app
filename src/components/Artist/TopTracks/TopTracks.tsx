import { FC } from 'react'
import styles from './TopTracks.module.scss'
import { ArtistInfo } from '../../../pages/Artist/types'
import {
	formatMillisecondsToMinutesSeconds,
	formatNumberWithSpaces
} from '../../../utils/TimeFormater'
import { AiFillPlayCircle } from 'react-icons/ai'
import { MdPlaylistAdd } from 'react-icons/md'

interface TopTracksProps {
	artistInfo: ArtistInfo | null
}

const TopTracks: FC<TopTracksProps> = ({ artistInfo }) => {
	return (
		<div>
			<div className={styles.artistTopTracks}>
				{artistInfo?.artist.discography.topTracks.items.map((track, uid) => (
					<div key={uid} className={styles.trackInfo}>
						<div className={styles.trackArtist}>
							<div className={styles.play}>
								<AiFillPlayCircle />
							</div>
							<img
								className={styles.trackImage}
								src={track.track.album.coverArt.sources[0].url}
								alt=''
							/>
							<div className={styles.trackName}>{track.track.name}</div>
						</div>
						<div className={styles.trackCount}>
							{formatNumberWithSpaces(track.track.playcount)}
						</div>
						<div className={styles.addToPlaylist}>
							<MdPlaylistAdd />
						</div>
						<div className={styles.trackDuration}>
							{formatMillisecondsToMinutesSeconds(
								track.track.duration.totalMilliseconds
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default TopTracks
