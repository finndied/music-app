import React, { useState, useEffect } from 'react'
import getAccessToken from '../../api/apiSpotify'
import popularArtists, { PopularArtist } from '../../api/popularArtists'
import styles from './PopularArtists.module.scss'

const PopularArtists: React.FC = () => {
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
			{popularArtist.slice(0, 5).map(popularArtist => (
				<div className={styles.targetArtist} key={popularArtist.id}>
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
			))}
		</div>
	)
}

export default PopularArtists
