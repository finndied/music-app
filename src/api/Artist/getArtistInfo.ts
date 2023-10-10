import axios from 'axios'

const getArtistInfo = async (artistId: string) => {
	const options = {
		method: 'GET',
		url: 'https://spotify81.p.rapidapi.com/artist_overview',
		params: {
			id: artistId
		},
		headers: {
			'X-RapidAPI-Key': 'd89f642dc6mshee910d3722e7fc0p1d7429jsne4af5d570e8a',
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
