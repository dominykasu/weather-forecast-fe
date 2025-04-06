import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import WeatherForecast from '../WeatherForecast';
import * as api from '../services/api';
import axios from 'axios';

jest.mock('../services/api');
jest.mock('axios', () => ({
    post: jest.fn().mockResolvedValue({}),
}));

const mockCityOptions = [
    { value: 'london', label: 'London' },
    { value: 'paris', label: 'Paris' },
];

const mockWeatherData = {
    name: 'London',
    main: { temp: 10, humidity: 80 },
    weather: [{ icon: '01d' }],
    wind: { speed: 5 },
};

const mockForecastData = {
    list: [
        { dt_txt: '2025-04-07 00:00:00', main: { temp: 8 } },
        { dt_txt: '2025-04-08 00:00:00', main: { temp: 7 } },
        { dt_txt: '2025-04-09 00:00:00', main: { temp: 6 } },
        { dt_txt: '2025-04-10 00:00:00', main: { temp: 5 } },
        { dt_txt: '2025-04-11 00:00:00', main: { temp: 4 } },
    ],
};

describe('<WeatherForecast />', () => {
    beforeEach(() => {
        api.fetchCityOptions.mockResolvedValue(mockCityOptions);
        api.fetchWeatherData.mockResolvedValue(mockWeatherData);
        api.fetchWeatherForecastData.mockResolvedValue(mockForecastData);
        axios.post.mockClear();
        localStorage.clear();
    });

    it('should render the component and fetches city options', async () => {
        render(<WeatherForecast />);
        expect(api.fetchCityOptions).toHaveBeenCalledTimes(1);
        await screen.findByText('Search for a city...');
    });

    it('should render "Search for a city..."', () => {
        render(<WeatherForecast />);
        expect(screen.getByText('Search for a city...')).toBeInTheDocument();
    });

    it('should display "Most Viewed:" heading', () => {
        render(<WeatherForecast />);
        expect(screen.getByText('Most Viewed:')).toBeInTheDocument();
    });
});