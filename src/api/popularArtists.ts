import axios from 'axios'

export interface PopularArtist {
	id: string
	album: {
		images: { url: string }[]
	}
	artists: { name: string }[]
}

const popularArtists = async (accessToken: string) => {
	try {
		const response = await axios.get(
			'https://api.spotify.com/v1/recommendations',
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				},
				params: {
					limit: 100,
					seed_artists: '7d3WFRME3vBY2cgoP38RDo',
					seed_genres: 'hip-hop',
					seed_tracks: '2uDTi1PlpSpvAv7IRAoAEU',
					min_popularity: 60,
					max_popularity: 100
				}
			}
		)
		console.log(response.data)
		return response.data
	} catch (error) {
		console.error('Error searching artists:', error)
		throw error
	}
}

export default popularArtists
