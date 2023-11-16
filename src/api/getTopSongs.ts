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
		date: '2023-09-28'
	},
	headers: {
		'X-RapidAPI-Key': 'c1d5f0518cmshf0e06dcb90f85b1p1a67fdjsncc20f6f297cc',
		'X-RapidAPI-Host': 'spotify81.p.rapidapi.com'
	}
}

const getTopSongs = async () => {
	try {
		const response = await axios.request(options)
		return response.data
	} catch (error) {
		console.error(error)
		throw error
	}
}

export default getTopSongs
