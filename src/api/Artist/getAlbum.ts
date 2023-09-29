import axios from 'axios'

const getAlbum = async (accessToken: string, id: string) => {
	try {
		const response = await axios.get(
			`https://api.spotify.com/v1/albums/${id}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		)
		return response.data
	} catch (error) {
		console.error(error)
		throw error
	}
}

export default getAlbum