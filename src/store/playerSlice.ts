import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'

interface PlayerState {
	audioUrl: string
	isPlaying: boolean
	currentImage: string
	isRandomMode: boolean
	progress: number
}

const initialState: PlayerState = {
	audioUrl: '',
	isPlaying: false,
	currentImage: '',
	isRandomMode: false,
	progress: 0
}
export const updateProgressAsync = createAsyncThunk(
	'player/updateProgress',
	async (newProgress: number) => {
		return newProgress
	}
)

const playerSlice = createSlice({
	name: 'player',
	initialState,
	reducers: {
		setAudioUrl: (state, action: PayloadAction<string>) => {
			state.audioUrl = action.payload
		},
		setIsPlaying: (state, action: PayloadAction<boolean>) => {
			state.isPlaying = action.payload
		},
		setCurrentImage: (state, action: PayloadAction<string>) => {
			state.currentImage = action.payload
		},
		setIsRandomMode: (state, action: PayloadAction<boolean>) => {
			state.isRandomMode = action.payload
		}
	},
	extraReducers: builder => {
		builder.addCase(updateProgressAsync.fulfilled, (state, action) => {
			state.progress = action.payload
		})
	}
})

export const { setAudioUrl, setIsPlaying, setCurrentImage, setIsRandomMode } =
	playerSlice.actions
export default playerSlice.reducer
