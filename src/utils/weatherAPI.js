import axios from 'axios';

const API_KEY = '8596a9c30dab076872da75d867058fad';

export const fetchWeather = async (location) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
