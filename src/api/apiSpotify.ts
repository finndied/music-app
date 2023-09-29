import axios from 'axios'

const clientId = 'd8a2334d10594a2fb8a346d639ac34df'
const clientSecret = '02d6a1dbe83b42d3b4f3c054bac63b7d'

const getAccessToken = async () => {
	const requestBody = {
		grant_type: 'client_credentials',
		client_id: clientId,
		client_secret: clientSecret
	}

	try {
		const response = await axios.post(
			'https://accounts.spotify.com/api/token',
			requestBody,
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
			)
			console.log(response.data.access_token)
			return response.data.access_token
	} catch (error) {
		console.error('Error fetching access token:', error)
		throw error
	}
}

export default getAccessToken
