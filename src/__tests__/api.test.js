import axios from 'axios';

jest.mock('axios');

describe('API Service Functions', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    const { fetchCityOptions, fetchWeatherData, fetchWeatherForecastData } = require('../services/api');

    describe('fetchCityOptions', () => {
        it('should fetch city options and format them correctly with mock API key', async () => {
            const mockResponse = {
                data: {
                    list: [
                        { name: 'London' },
                        { name: 'Paris' },
                    ],
                },
            };
            axios.get.mockResolvedValue(mockResponse);

            const options = await fetchCityOptions();

            expect(axios.get).toHaveBeenCalledWith(
                `https://api.openweathermap.org/data/2.5/find?lat=40.7128&lon=-74.0060&cnt=50&appid=${process.env.REACT_APP_OPENWEATHERMAPP_API_KEY}`
            );
            expect(options).toEqual([
                { value: 'London', label: 'London' },
                { value: 'Paris', label: 'Paris' },
            ]);
        });

        it('should log an error if fetching city options fails', async () => {
            const mockError = new Error('Failed to fetch');
            axios.get.mockRejectedValue(mockError);
            const consoleSpy = jest.spyOn(console, 'error');

            await fetchCityOptions();

            expect(axios.get).toHaveBeenCalledWith(
                `https://api.openweathermap.org/data/2.5/find?lat=40.7128&lon=-74.0060&cnt=50&appid=${process.env.REACT_APP_OPENWEATHERMAPP_API_KEY}`
            );
            expect(consoleSpy).toHaveBeenCalledWith('Error fetching city options:', mockError);
        });
    });

    describe('fetchWeatherData', () => {
        it('should fetch weather data for a given city with mock API key', async () => {
            const mockWeatherData = { name: 'London', main: { temp: 10 } };
            axios.get.mockResolvedValue({ data: mockWeatherData });

            const data = await fetchWeatherData('London');

            expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: 'London',
                    appid: process.env.REACT_APP_OPENWEATHERMAPP_API_KEY,
                    units: 'metric',
                },
            });
            expect(data).toEqual(mockWeatherData);
        });

        it('should log an error and return an empty array if fetching weather data fails', async () => {
            const mockError = new Error('Failed to fetch weather');
            axios.get.mockRejectedValue(mockError);
            const consoleSpy = jest.spyOn(console, 'error');

            const data = await fetchWeatherData('New York');

            expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: 'New York',
                    appid: process.env.REACT_APP_OPENWEATHERMAPP_API_KEY,
                    units: 'metric',
                },
            });
            expect(consoleSpy).toHaveBeenCalledWith('Error fetching data for New York:', mockError);
            expect(data).toEqual([]);
        });
    });

    describe('fetchWeatherForecastData', () => {
        it('should fetch weather forecast data for a given city with mock API key', async () => {
            const mockForecastData = { list: [{ main: { temp: 5 } }] };
            axios.get.mockResolvedValue({ data: mockForecastData });

            const data = await fetchWeatherForecastData('Paris');

            expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/forecast', {
                params: {
                    q: 'Paris',
                    appid: process.env.REACT_APP_OPENWEATHERMAPP_API_KEY,
                    units: 'metric',
                },
            });
            expect(data).toEqual(mockForecastData);
        });

        it('should log an error and return an empty array if fetching forecast data fails', async () => {
            const mockError = new Error('Failed to fetch forecast');
            axios.get.mockRejectedValue(mockError);
            const consoleSpy = jest.spyOn(console, 'error');

            const data = await fetchWeatherForecastData('Berlin');

            expect(axios.get).toHaveBeenCalledWith('https://api.openweathermap.org/data/2.5/forecast', {
                params: {
                    q: 'Berlin',
                    appid: process.env.REACT_APP_OPENWEATHERMAPP_API_KEY,
                    units: 'metric',
                },
            });
            expect(consoleSpy).toHaveBeenCalledWith('Error fetching data for Berlin:', mockError);
            expect(data).toEqual([]);
        });
    });
});