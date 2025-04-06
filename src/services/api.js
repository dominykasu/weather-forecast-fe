import axios from "axios";

const API_KEY = process.env.REACT_APP_OPENWEATHERMAPP_API_KEY;

const API_URL_WEATHER = "https://api.openweathermap.org/data/2.5/weather";
const API_URL_FORECAST = "https://api.openweathermap.org/data/2.5/forecast";

export const fetchCityOptions = async () => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/find?lat=40.7128&lon=-74.0060&cnt=50&appid=${API_KEY}`
        );
        const options = response.data.list.map(city => ({ value: city.name, label: city.name }));
        return options;
    } catch (error) {
        console.error("Error fetching city options:", error);
    }
};
export const fetchWeatherForecastData = async (cityName) => {
    try {
        const response = await axios.get(`${API_URL_FORECAST}`, {
            params: {
                q: cityName,
                appid: API_KEY,
                units: "metric"
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching data for ${cityName}:`, error);
        return [];
    }
};

export const fetchWeatherData = async (cityName) => {
    try {
        const response = await axios.get(`${API_URL_WEATHER}`, {
            params: {
                q: cityName,
                appid: API_KEY,
                units: "metric"
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching data for ${cityName}:`, error);
        return [];
    }
};