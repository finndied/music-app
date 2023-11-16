import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SelectedTrack {
	duration_ms: number
	name: string
	artists: {
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

interface Playlist {
	id: number
	name: string
	image: string
	tracks: SelectedTrack[]
}

interface PlaylistTrack {
	playlistId: string
	tracks: number
}

interface PlaylistState {
	playlists: Playlist[]
	playlistTracks: PlaylistTrack[]
}

const initialState: PlaylistState = {
	playlists: [],
	playlistTracks: []
}

const playlistSlice = createSlice({
	name: 'playlist',
	initialState,
	reducers: {
		addPlaylist: (state, action: PayloadAction<Playlist>) => {
			state.playlists.push(action.payload)
		},
		addTrackToPlaylist: (
			state,
			action: PayloadAction<{ playlistId: number; track: SelectedTrack }>
		) => {
			const { playlistId, track } = action.payload

			// Finding a playlist by Id
			const playlist = state.playlists.find(
				playlist => playlist.id === playlistId
			)

			if (playlist) {
				if (!playlist.tracks) {
					playlist.tracks = []
				}

				// Adding the track Id to the trackid array
				playlist.tracks.push(track)
			}
		},
		removePlaylist: (state, action: PayloadAction<number>) => {
			const playlistId = action.payload

			// Finding the playlist index by its ID
			const playlistIndex = state.playlists.findIndex(
				playlist => playlist.id === playlistId
			)

			if (playlistIndex !== -1) {
				// Deleting a playlist from the array
				state.playlists.splice(playlistIndex, 1)
			}
		},
		removeTrack: (
			state,
			action: PayloadAction<{ playlistId: number; trackId: number }>
		) => {
			const { playlistId, trackId } = action.payload

			const playlist = state.playlists.find(
				playlist => playlist.id === playlistId
			)

			if (playlist) {
				const trackIndex = playlist.tracks.findIndex(
					track => track.id === trackId
				)

				if (trackIndex !== -1) {
					playlist.tracks.splice(trackIndex, 1)
				}
			}
		}
	}
})

export const { addPlaylist, addTrackToPlaylist, removePlaylist, removeTrack } =
	playlistSlice.actions
export default playlistSlice.reducer
