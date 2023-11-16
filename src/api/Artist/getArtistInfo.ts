import axios from 'axios'

const getArtistInfo = async (artistId: string) => {
	const options = {
		method: 'GET',
		url: 'https://spotify81.p.rapidapi.com/artist_overview',
		params: {
			id: artistId
		},
		headers: {
			'X-RapidAPI-Key': 'c1d5f0518cmshf0e06dcb90f85b1p1a67fdjsncc20f6f297cc',
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
