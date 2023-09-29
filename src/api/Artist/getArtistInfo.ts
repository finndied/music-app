import axios from 'axios'

const getArtistInfo = async (artistId: string) => {
	const options = {
		method: 'GET',
		url: 'https://spotify81.p.rapidapi.com/artist_overview',
		params: {
			id: artistId
		},
		headers: {
			'X-RapidAPI-Key': '24b86b7f95mshaa5acc4b3b06b2ep1ebbc5jsn118fa73c7395',
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
