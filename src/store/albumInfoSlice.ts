import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import getAlbum from '../api/Artist/getAlbum'
import getAccessToken from '../api/apiSpotify'
import { AlbumInfo } from '../pages/Album/types'

export const fetchAlbumInfo = createAsyncThunk(
	'albumInfo/fetchAlbumInfo',
	async (albumId: string) => {
		try {
			const accessToken = await getAccessToken()
			const data = await getAlbum(accessToken, albumId)
			console.log(data)
			return data
		} catch (error) {
			throw error
		}
	}
)

const albumInfoSlice = createSlice({
	name: 'albumInfo',
	initialState: {} as AlbumInfo,
	reducers: {
		setAlbumInfo: (state, action) => {
			return action.payload
		}
	},
	extraReducers: builder => {
		builder.addCase(fetchAlbumInfo.fulfilled, (state, action) => {
			return action.payload
		})
	}
})
export const { setAlbumInfo } = albumInfoSlice.actions
export default albumInfoSlice.reducer
