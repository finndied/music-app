import axios from 'axios';

const getTrack = async (artist: string, trackName: string) => {
  const options = {
    method: 'GET',
    url: 'https://spotify-scraper.p.rapidapi.com/v1/track/download',
    params: {
      track: `${artist} - ${trackName}`,
    },
    headers: {
      'X-RapidAPI-Key': 'ccf79f4ae3msh6ce307349529741p1f05c0jsn3cd0138b8ef9',
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