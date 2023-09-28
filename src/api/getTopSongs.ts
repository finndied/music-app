import axios from 'axios'

export interface TopSong {
	chartEntryData: {
		currentRank: string
	}
	trackMetadata: {
		displayImageUri: string
		trackName: string
		artists: Artist[]
	}
}

interface Artist {
	name: string
}

const options = {
	method: 'GET',
	url: 'https://spotify81.p.rapidapi.com/top_200_tracks',
	params: {
		country: 'GLOBAL',
		period: 'weekly',
		date: '2023-09-14'
	},
	headers: {
		'X-RapidAPI-Key': '24b86b7f95mshaa5acc4b3b06b2ep1ebbc5jsn118fa73c7395',
		'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
	}
}

const getTopSongs = async () => {
	try {
		const response = await axios.request(options)
		console.log(response.data)
		return response.data
	} catch (error) {
		console.error(error)
		throw error
	}
}

export default getTopSongs
