import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Playlist {
	id: number
	name: string
	image: string
}

interface PlaylistState {
	playlists: Playlist[]
}

const initialState: PlaylistState = {
	playlists: []
}

const playlistSlice = createSlice({
	name: 'playlist',
	initialState,
	reducers: {
		addPlaylist: (state, action: PayloadAction<Playlist>) => {
			state.playlists.push(action.payload)
		}
	}
})

export const { addPlaylist } = playlistSlice.actions
export default playlistSlice.reducer
