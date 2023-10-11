import axios from 'axios'

const search = async (accessToken: string, query: string) => {
	try {
		const response = await axios.get('https://api.spotify.com/v1/search', {
			headers: {
				Authorization: `Bearer ${accessToken}`
			},
			params: {
				q: query,
				type: 'album,artist,track',
				limit: 10
			}
		})

		return response.data
	} catch (error) {
		console.error('Error searching artists:', error)
		throw error
	}
}

export default search
