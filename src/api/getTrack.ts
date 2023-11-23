import axios from 'axios';

const getTrack = async (artist: string, trackName: string) => {
  const options = {
    method: 'GET',
    url: 'https://spotify-scraper.p.rapidapi.com/v1/track/download',
    params: {
      track: `${artist} - ${trackName}`,
    },
    headers: {
      'X-RapidAPI-Key': 'ad52c5bbf5mshd1f47e5faf81d5fp1512b0jsn4e47857cd6e2',
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