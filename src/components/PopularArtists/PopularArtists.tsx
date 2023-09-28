import React, { useState, useEffect } from 'react'
import getAccessToken from '../../api/apiSpotify'
import popularArtists, { PopularArtist } from '../../api/Artist/Artist/popularArtists'
import styles from './PopularArtists.module.scss'
import { Link } from 'react-router-dom'

interface PopularArtistsProps {
	artistsToDisplay: number
}

const PopularArtists: React.FC<PopularArtistsProps> = ({
	artistsToDisplay
}) => {
	const [popularArtist, setPopularArtist] = useState<PopularArtist[]>([])

	useEffect(() => {
		getAccessToken()
			.then(accessToken => {
				popularArtists(accessToken)
					.then(data => {
						setPopularArtist(data.tracks)
					})
					.catch(error => {
						console.error('Error searching artists:', error)
					})
			})
			.catch(error => {
				console.error('Error fetching access token:', error)
			})
	}, [])

	return (
		<div className={styles.artists}>
			{popularArtist.slice(0, artistsToDisplay).map(popularArtist => (
				<Link to={`/artist/${popularArtist.artists[0].id}`} key={popularArtist.id}>
					<div className={styles.targetArtist}>
						<img
							className={styles.image}
							src={popularArtist.album.images[0].url}
							width={130}
							height={130}
							alt='artist image'
						/>
						<div className={styles.artistName}>
							{popularArtist.artists[0].name}
						</div>
					</div>
				</Link>
			))}
		</div>
	)
}

export default PopularArtists