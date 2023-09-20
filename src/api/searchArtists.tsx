import axios from 'axios';

const searchArtists = async (accessToken: string, query: string) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: query,
        type: 'artist',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching artists:', error);
    throw error;
  }
};

export default searchArtists;