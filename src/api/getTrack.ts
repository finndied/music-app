import axios from 'axios';

const getTrack = async (artist: string, trackName: string) => {
  const options = {
    method: 'GET',
    url: 'https://spotify-scraper.p.rapidapi.com/v1/track/download',
    params: {
      track: `${artist} - ${trackName}`,
    },
    headers: {
      'X-RapidAPI-Key': 'd2ceba004dmsh322664a7376fd32p1da370jsnb179bfb56c17',
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