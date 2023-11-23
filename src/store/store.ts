import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './playerSlice'
import albumInfoReducer from './albumInfoSlice'
import artistInfoReducer from './artistInfoSlice'
import playlistReducer from './playlistSlice'
import searchReducer from './searchSlice'
import tracksReducer from './playTracks/TopAndAlbumTracksSlice'
import playlistTracksReducer from './playTracks/PlaylistTracksSlice'
import searchResultsTracksReducer from './playTracks/SearchResultsTracksSlice'
const store = configureStore({
	reducer: {
		player: playerReducer,
		albumInfo: albumInfoReducer,
		artistInfo: artistInfoReducer,
		tracks: tracksReducer,
		search: searchReducer,
		playlist: playlistReducer,
		searchResultsTracks: searchResultsTracksReducer,
		playlistTracks: playlistTracksReducer
	}
})


export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
