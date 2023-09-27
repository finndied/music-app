import axios from 'axios'

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
	width: number
	height: number
}

const getArtistInfo = async (artistId: string): Promise<ArtistInfo> => {
	const options = {
		method: 'GET',
		url: 'https://spotify81.p.rapidapi.com/artists',
		params: {
			ids: artistId
		},
		headers: {
			'X-RapidAPI-Key': 'dad75f3a1dmsh197ca1cf16f4d44p139e79jsn32916d99121c',
			'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
		}
	}

	try {
		const response = await axios.request(options)
		return response.data
	} catch (error) {
		console.error(error)
		throw error
	}
}

export default getArtistInfo