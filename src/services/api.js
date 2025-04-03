import axios from "axios";

const API_KEY = process.env.REACT_APP_OPENWEATHERMAPP_API_KEY;

const API_URL = "https://api.openweathermap.org/data/2.5/forecast";

export const fetchWeatherData = async (townName) => {
    try {
        const response = await axios.get(`${API_URL}`, {
            params: {
                q: townName,
                appid: API_KEY,
                units: "metric"
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching data for ${townName}:`, error);
        return [];
    }
};