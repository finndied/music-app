import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import getArtistInfo from '../api/Artist/getArtistInfo'
import { ArtistInfo } from '../pages/Artist/types'


export const fetchArtistInfo = createAsyncThunk(
	'albumInfo/fetchAlbumInfo',
	async (artistId: string) => {
		try {
			const data = await getArtistInfo(artistId)
			console.log(data)
			return data
		} catch (error) {
			throw error
		}
	}
)

const artistInfoSlice = createSlice({
	name: 'artistInfo',
	initialState: {} as ArtistInfo,
	reducers: {
		setArtistInfo: (state, action) => {
			return action.payload
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchArtistInfo.fulfilled, (state, action) => {
			return action.payload
		})
	}
})
export const { setArtistInfo } = artistInfoSlice.actions
export default artistInfoSlice.reducer
