import { configureStore } from '@reduxjs/toolkit'
import playerReducer from './playerSlice'
import albumInfoReducer from './albumInfoSlice'
import artistInfoReducer from './artistInfoSlice'
import searchReducer from './searchSlice'
import tracksReducer from './playTracks/TopAndAlbumTracksSlice'
const store = configureStore({
	reducer: {
		player: playerReducer,
		albumInfo: albumInfoReducer,
		artistInfo: artistInfoReducer,
		tracks: tracksReducer,
		search: searchReducer
	}
})


export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
