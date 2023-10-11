import { createSlice } from '@reduxjs/toolkit'
import search from '../api/search'

interface Image {
	height: number
	url: string
	width: number
}

interface Followers {
	href: string | null
	total: number
}

interface Artist {
	href: string
	id: string
	name: string
	popularity: number
	type: string
	uri: string
	followers: Followers
	genres: string[]
	images: Image[]
}

interface Artists {
	href: string
	items: Artist[]
}

interface Album {
	name: string
	images: Image[]
	id: string
}

interface Albums {
	items: Album[]
}

interface Track {
	album: { images: Image[] }
	artists: { name: string }[]
	name: string
	duration_ms: number
}

interface Tracks {
	items: Track[]
}

interface SearchResults {
	artists: Artists
	albums: Albums
	tracks: Tracks
}

interface SearchState {
	searchResults: SearchResults | null
	searchQuery: string
}

const searchSlice = createSlice({
	name: 'search',
	initialState: {
		searchResults: null,
		searchQuery: ''
	} as SearchState,
	reducers: {
		setSearchResults: (state, action) => {
			state.searchResults = action.payload
		}
	}
})

export const searchAsync =
	(accessToken: string, query: string) => async dispatch => {
		try {
			const searchResults = await search(accessToken, query)
			dispatch(setSearchResults(searchResults))
		} catch (error) {}
	}

export const { setSearchResults } = searchSlice.actions
export default searchSlice.reducer
