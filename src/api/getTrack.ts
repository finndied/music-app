import axios from 'axios';

const getTrack = async (artist: string, trackName: string) => {
  const options = {
    method: 'GET',
    url: 'https://spotify-scraper.p.rapidapi.com/v1/track/download',
    params: {
      track: `${artist} - ${trackName}`,
    },
    headers: {
      'X-RapidAPI-Key': '92e4a4f520msh7e4df595000b0a3p1509bdjsn10037f4e3f96',
      'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.youtubeVideo; 
  } catch (error) {
    console.error('Error getting track data:', error);
    throw error; 
  }
};

export default getTrack;