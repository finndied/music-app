import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import getTrack from '../../api/getTrack'
import { RootState } from '../store'
import { setAudioUrl, setCurrentImage } from '../playerSlice'

interface Track {
	duration_ms: number
	name: string
	album: {
		images: {
			0: {
				url: string
			}
		}
	}
	artists: {
		id: number
		name: string
	}[]
	id: number
	track: {
		id: number
		album: {
			coverArt: {
				sources: { url: string }[]
			}
		}
		name: string
		artists: {
			items: {
				profile: {
					name: string
				}
			}[]
		}
		duration: {
			totalMilliseconds: number
		}
	}
}

interface SearchResultsTracksState {
	currentTrack: Track | null
	searchResultsTracks: Track[]
	currentSearchResultsTrackIndex: number | null
	currentTrackType: string
}

const initialState: SearchResultsTracksState = {
	currentTrack: null,
	searchResultsTracks: [],
	currentSearchResultsTrackIndex: null,
	currentTrackType: ''
}
// Creating an asynchronous thunk for playing a track from a search results
export const playTrackAsyncSearchResults = createAsyncThunk(
	'searchResultsTracks/playTrack',
	async (trackIndex: number, { dispatch, getState }) => {
		try {
			// Get the Redux state using getState()
			const state = getState() as RootState
			const searchResultsTracks = state.searchResultsTracks.searchResultsTracks
			// Get information about the track and its image
			const track = searchResultsTracks[trackIndex]
			const currentImage = track?.album?.images?.[0]?.url || ''
			// Check for the existence of the track
			if (!track) {
				throw new Error('Invalid track index')
			}
			// Get the YouTube video for the track
			const youtubeVideo = await getTrack(track?.artists[0]?.name, track?.name)
			// Check for the existence of YouTube video data
			if (youtubeVideo) {
				const audioUrl = youtubeVideo.audio[0]?.url
				if (audioUrl) {
               dispatch(setSearchResultsTracks(searchResultsTracks || []))
					dispatch(setAudioUrl(audioUrl))
					dispatch(setCurrentImage(currentImage))
					dispatch(setCurrentTrack(track))
				} else {
					throw new Error('Error playing track: Invalid audio URL')
				}
			} else {
				throw new Error('Error playing track: No youtubeVideo data')
			}
		} catch (error) {
			console.error('Error playing track:', error)
			throw error
		}
	}
)

const searchResultsTracksSlice = createSlice({
	name: 'searchResultsTracks',
	initialState,
	reducers: {
		setCurrentTrack: (state, action) => {
			state.currentTrack = action.payload
		},
		setSearchResultsTracks: (state, action) => {
			state.searchResultsTracks = action.payload
		},
		setCurrentSearchResultsTrackIndex: (state, action) => {
			state.currentSearchResultsTrackIndex = action.payload
		},
		setCurrentTrackType: (state, action) => {
			state.currentTrackType = action.payload
		}
	}
})

export const {
	setCurrentTrack,
	setSearchResultsTracks,
	setCurrentSearchResultsTrackIndex,
	setCurrentTrackType
} = searchResultsTracksSlice.actions
export default searchResultsTracksSlice.reducer
