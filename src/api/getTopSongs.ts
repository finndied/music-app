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
		'X-RapidAPI-Key': '95502d54e7msh4d789d92679426bp164070jsnff7e34c9ebe6',
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
