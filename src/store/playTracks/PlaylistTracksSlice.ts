import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import getTrack from '../../api/getTrack'
import { RootState } from '../store'
import { setAudioUrl, setCurrentImage } from '../playerSlice'

interface Artist {
	name: string
}

interface Image {
	height: number
	url: string
	width: number
}

interface Album {
	coverArt: {
		sources: Image[]
	}
	artists: Artist[]
	images: Image[]
	name: string
}

interface Track {
	artists: any
	album: Album
	name: string
}

interface PlaylistTrackData {
	album: Album
	track: Track
	artists: Artist[]
	id: string
	images: Image[]
	name: string
}

interface PlaylistTracksState {
	currentTrack: Track | null
	playlistTracks: PlaylistTrackData[]
	currentPlaylistTrackIndex: number | null
	currentTrackType: string
}

const initialState: PlaylistTracksState = {
	currentTrack: null,
	playlistTracks: [],
	currentPlaylistTrackIndex: null,
	currentTrackType: ''
}

// Creating an asynchronous thunk for playing a track from a search results
export const playTrackAsyncPlaylist = createAsyncThunk(
	'playlistTracks/playTrackPlaylist',
	async (trackIndex: number, { dispatch, getState }) => {
		try {
			// Get the Redux state using getState()
			const state = getState() as RootState
			const playlistTracks = state.playlistTracks?.playlistTracks
			// Get information about the track and its image
			const track = playlistTracks[trackIndex]
			const currentImage =
				track.track?.album?.coverArt?.sources[0]?.url ||
				track?.album?.images[0]?.url ||
				''
			const trackName = track?.track?.name || track?.name || ''
			const artistName = track?.track?.artists?.items[0]?.profile?.name || ''
			// Check for the existence of the track
			if (!track) {
				throw new Error('Invalid track index')
			}
			// Get the YouTube video for the track
			const youtubeVideo = await getTrack(
				artistName || track?.artists[0]?.name,
				trackName || track?.name || ''
			)
			// Check for the existence of YouTube video data
			if (youtubeVideo) {
				const audioUrl = youtubeVideo.audio[0]?.url
				if (audioUrl) {
					dispatch(setPlaylistTracks(playlistTracks || []))
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
			console.error('Error playing playlist track:', error)
			throw error
		}
	}
)

const playlistTracksSlice = createSlice({
	name: 'playlistTracks',
	initialState,
	reducers: {
		setCurrentTrack: (state, action) => {
			state.currentTrack = action.payload
		},
		setPlaylistTracks: (state, action) => {
			state.playlistTracks = action.payload
		},
		setCurrentPlaylistTrackIndex: (state, action) => {
			state.currentPlaylistTrackIndex = action.payload
		},
		setCurrentTrackType: (state, action) => {
			state.currentTrackType = action.payload
		}
	}
})

export const {
	setCurrentTrack,
	setPlaylistTracks,
	setCurrentPlaylistTrackIndex,
	setCurrentTrackType
} = playlistTracksSlice.actions
export default playlistTracksSlice.reducer
