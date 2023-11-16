import { useSelector } from 'react-redux'
import styles from './SearchResults.module.scss'
import { RootState } from '../../store/store'
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'
import { useState } from 'react'
import {
	formatMillisecondsToMinutesSeconds,
	formatNumberWithSpaces
} from '../../utils/TimeFormater'
import { VscDebugStart } from 'react-icons/vsc'
import { AiFillPlayCircle } from 'react-icons/ai'
import { MdPlaylistAdd } from 'react-icons/md'
import image from '../../assets/images/background.gif'
import { Link } from 'react-router-dom'
import AddTrackToPlaylistModal from '../AddTrackToPlaylistModal/AddTrackToPlaylistModal'

interface Track {
	duration_ms: number
	name: string
	artists: {
		name: string
	}[]
	id: number
	track: {
		id: number
		album: {
			coverArt: {
				sources: { url: string }[]
			}
		}
		name: string
		artists: {
			items: {
				profile: {
					name: string
				}
			}[]
		}
		duration: {
			totalMilliseconds: number
		}
	}
}

const SearchResults = () => {
	const [showAllAlbums, setShowAllAlbums] = useState<boolean>(false)

	const playlists = useSelector((state: RootState) => state.playlist.playlists)

	const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)

	const openAddToPlaylistModal = (track: Track) => {
		setSelectedTrack(track)
	}

	const closeAddToPlaylistModal = () => {
		setSelectedTrack(null)
	}

	const searchResults = useSelector(
		(state: RootState) => state.search.searchResults
	)
	if (!searchResults) {
		return <h1>Nothing Found</h1>
	}

	const maxVisibleAlbums: number = 5
	const numAlbums = searchResults?.albums.items.length || 0

	// Determining whether to display arrows to collapse/expand albums
	const shouldShowArrows = numAlbums > maxVisibleAlbums

	const toggleShowAllAlbums = () => {
		setShowAllAlbums(!showAllAlbums)
	}

	return (
		<div className={styles.wrapper}>
			<h1>Artists</h1>
			<div className={styles.artistsWrapper}>
				{searchResults.artists.items.slice(0, 3).map((artist, index) => (
					<Link to={`/artist/${artist.id}`} key={index}>
						<div className={styles.artists}>
							<div className={styles.artistInfo}>
								<div>{artist.name}</div>
								<p>
									Followers: {''}
									{formatNumberWithSpaces(artist.followers.total)}
								</p>
							</div>
							<img src={artist.images[0]?.url || image} alt='' />
						</div>
					</Link>
				))}
			</div>

			<div className={styles.albumsWrapper}>
				<div className={styles.albumALl}>
					<h2>Albums</h2>
					{shouldShowArrows && (
						<button onClick={toggleShowAllAlbums}>
							{showAllAlbums ? <BiDownArrowAlt /> : <BiUpArrowAlt />}
						</button>
					)}
				</div>
				<div className={styles.albums}>
					{searchResults.albums.items
						.slice(0, showAllAlbums ? undefined : maxVisibleAlbums)
						.map((album, index) => (
							<Link to={`/album/${album.id}`} key={index}>
								<div className={styles.albumCard}>
									<div>{album.name}</div>
									<img src={album.images[0].url} alt='' />
									<div className={styles.playButton}>
										<VscDebugStart />
									</div>
								</div>
							</Link>
						))}
				</div>
			</div>

			<h1>Tracks</h1>
			<div className={styles.tracksWrapper}>
				{searchResults.tracks.items.map((track, index) => (
					<div key={index} className={styles.trackCard}>
						<div className={styles.play}>
							<AiFillPlayCircle />
						</div>
						<img src={track.album.images[0].url} alt='' />
						<div className={styles.trackInfo}>
							<div className={styles.trackName}>{track.name}</div>
							<div className={styles.artistName}>{track.artists[0].name}</div>
							<div className={styles.addToPlaylist}>
								<MdPlaylistAdd onClick={() => openAddToPlaylistModal(track)} />
							</div>
						</div>
						<div className={styles.trackDuration}>
							{formatMillisecondsToMinutesSeconds(track.duration_ms)}
						</div>
					</div>
				))}
			</div>
			{selectedTrack !== null && (
				<AddTrackToPlaylistModal
					playlists={playlists}
					selectedTrack={selectedTrack}
					onClose={closeAddToPlaylistModal}
				/>
			)}
		</div>
	)
}

export default SearchResults
