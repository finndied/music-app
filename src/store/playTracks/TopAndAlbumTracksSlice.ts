import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import getTrack from '../../api/getTrack'
import { RootState } from '../store'
import { setAudioUrl, setCurrentImage } from '../playerSlice'
import { AlbumInfo } from '../../pages/Album/types'
import { ArtistInfo } from '../../pages/Artist/types'

interface Track {
	name: string
	artists: {
		name: string
		id: string
	}[]
	track: {
		name: string
		artists: {
			items: {
				profile: {
					name: string
				}
			}[]
		}
	}
}

interface TracksState {
	currentTrack: Track | null
	albumTracks: string[]
	topTracks: string[]
	currentAlbumTrackIndex: number | null
	currentTopTrackIndex: number | null
	currentTrackType: string
}

const initialState: TracksState = {
	currentTrack: null,
	albumTracks: [],
	topTracks: [],
	currentAlbumTrackIndex: null,
	currentTopTrackIndex: null,
	currentTrackType: '',
}
// Creating an asynchronous thunk for playing the top track
export const playTopTrackAsync = createAsyncThunk(
	'tracks/playTopTrack',
	async (trackIndex: number, { dispatch, getState }) => {
		try {
			// Get the Redux state using getState()
			const state = getState() as RootState
			const artistInfo = state.artistInfo as ArtistInfo | null
			// Get information about the track and its image
			const track = artistInfo?.artist.discography.topTracks.items[trackIndex]
			const currentImage =
				artistInfo?.artist.discography.topTracks.items[trackIndex].track.album
					.coverArt.sources[0].url || ''
			// Check for the existence of the track
			if (!track) {
				throw new Error('Invalid track index')
			}
			// Get the YouTube video for the track
			const youtubeVideo = await getTrack(
				artistInfo?.artist.profile.name,
				track.track.name
			)
			// Check for the existence of YouTube video data
			if (youtubeVideo) {
				const audioUrl = youtubeVideo.audio[0]?.url
				if (audioUrl) {
					// Update top tracks information and play the track
					dispatch(
						setTopTracks(artistInfo?.artist.discography.topTracks.items || [])
					)
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
// Creating an asynchronous thunk for playing a track from an album
export const playTrackAsyncAlbum = createAsyncThunk(
	'tracks/playTrackAlbum',
	async (trackIndex: number, { dispatch, getState }) => {
		try {
			// Get the Redux state using getState()
			const state = getState() as RootState
			const albumInfo = state.albumInfo as AlbumInfo | null
			// Get information about the track and its image
			const track = albumInfo?.tracks.items[trackIndex]
			const currentImage = albumInfo?.images[0]?.url || ''
			// Check for the existence of the track
			if (!track) {
				throw new Error('Invalid track index')
			}
			// Get the YouTube video for the track
			const youtubeVideo = await getTrack(track.artists[0].name, track.name)
			// Check for the existence of YouTube video data
			if (youtubeVideo) {
				const audioUrl = youtubeVideo.audio[0]?.url
				if (audioUrl) {
					// Update album tracks information and play the track
					dispatch(setAlbumTracks(albumInfo?.tracks.items || []))
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

const TopAndAlbumTracksSlice = createSlice({
	name: 'tracks',
	initialState,
	reducers: {
		setCurrentTrack: (state, action) => {
			state.currentTrack = action.payload
		},
		setAlbumTracks: (state, action) => {
			state.albumTracks = action.payload
		},
		setTopTracks: (state, action) => {
			state.topTracks = action.payload
		},
		setCurrentAlbumTrackIndex: (state, action) => {
			state.currentAlbumTrackIndex = action.payload
		},
		setCurrentTopTrackIndex: (state, action) => {
			state.currentTopTrackIndex = action.payload
		},
		setCurrentTrackType: (state, action) => {
			state.currentTrackType = action.payload
		}
	}
})

export const {
	setCurrentTrack,
	setAlbumTracks,
	setTopTracks,
	setCurrentAlbumTrackIndex,
	setCurrentTopTrackIndex,
	setCurrentTrackType
} = TopAndAlbumTracksSlice.actions
export default TopAndAlbumTracksSlice.reducer
