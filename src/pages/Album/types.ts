export interface AlbumInfo {
	name: string
	artists: { name: string }[]
	images: { url: string }[]
	release_date: string
	total_tracks: number
	tracks: { items: AlbumTrack[] }
}

export interface AlbumTrack {
	artists: { name: string }[]
	name: string
	duration_ms: number
}
