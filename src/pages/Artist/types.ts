export interface ArtistInfo {
	name: string
	artist: Artist
	data: Artist
}

export interface Artist {
	name: string
	followers: {
		total: number
	}
	visuals: {
		headerImage: {
			sources: { url: string }[]
		}
		avatarImage: {
			sources: { url: string }[]
		}
	}
	profile: {
		name: string
		biography: {
			text: string
		}
	}
	stats: {
		followers: number
		monthlyListeners: number
	}
	discography: {
		albums: {
			items: {
				releases: {
					items: {
						id: string
						name: string
						date: {
							year: number
						}
						coverArt: {
							sources: { url: string }[]
						}
					}[]
				}
			}[]
		}
		singles: {
			items: {
				releases: {
					items: {
						name: string
						date: {
							year: number
						}
						coverArt: {
							sources: { url: string }[]
						}
					}[]
				}
			}[]
		}
		topTracks: {
			items: {
				track: {
					name: string
					album: {
						coverArt: {
							sources: { url: string }[]
						}
					}
					playcount: number
					duration: {
						totalMilliseconds: number
					}
				}
			}[]
		}
	}
}
