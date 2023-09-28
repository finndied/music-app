export const formatNumberWithSpaces = (number: number): string => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export const formatMillisecondsToMinutesSeconds = (
	milliseconds: number
): string => {
	const totalSeconds = Math.floor(milliseconds / 1000)
	const minutes = Math.floor(totalSeconds / 60)
	const seconds = totalSeconds % 60
	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}
