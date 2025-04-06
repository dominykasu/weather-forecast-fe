import React from 'react';
import { render, screen } from '@testing-library/react';
import DailyForecastCard from "../components/dailyForecastCard";

const mockForecastData = [
    {
        dt: 1680739200,
        main: { temp: 10.5, humidity: 70 },
        wind: { speed: 3.2 },
        weather: [{ icon: '01d' }],
    },
    {
        dt: 1680825600,
        main: { temp: 12.1, humidity: 75 },
        wind: { speed: 4.5 },
        weather: [{ icon: '02d' }],
    },
    {
        dt: 1680912000,
        main: { temp: 9.8, humidity: 80 },
        wind: { speed: 2.8 },
        weather: [{ icon: '03d' }],
    },
    {
        dt: 1680998400,
        main: { temp: 14.3, humidity: 65 },
        wind: { speed: 5.1 },
        weather: [{ icon: '04d' }],
    },
    {
        dt: 1681084800,
        main: { temp: 11.7, humidity: 78 },
        wind: { speed: 3.9 },
        weather: [{ icon: '09d' }],
    }
];

describe('<DailyForecastCard />', () => {
    it('should render daily forecast cards with correct information', () => {
        render(<DailyForecastCard forecast={mockForecastData} />);

        expect(screen.getByText('Monday')).toBeInTheDocument();
        expect(screen.getByText('Thursday')).toBeInTheDocument();
        expect(screen.getByText('Friday')).toBeInTheDocument();
        expect(screen.getByText('Saturday')).toBeInTheDocument();
        expect(screen.getByText('Sunday')).toBeInTheDocument();

        expect(screen.getByText('Temperature: 11°C')).toBeInTheDocument();

        expect(screen.getByText('Wind: 4 m/s')).toBeInTheDocument();

        expect(screen.getByText('Humidity: 70%')).toBeInTheDocument();

        const mondayIcon = screen.getAllByAltText('Weather Icon')[0];
        expect(mondayIcon).toHaveAttribute('src', 'https://openweathermap.org/img/wn/01d@2x.png');
    });

    it('should render only one card per day', () => {
        render(<DailyForecastCard forecast={mockForecastData} />);

        const mondayCards = screen.getAllByText('Monday');
        expect(mondayCards.length).toBe(1);

        expect(screen.getByText('Temperature: 11°C')).toBeInTheDocument();
    });

    it('should render without weather icon if the icon data is missing', () => {
        const forecastWithoutIcon = [
            {
                dt: 1680739200,
                main: { temp: 10.5, humidity: 70 },
                wind: { speed: 3.2 },
                weather: [],
            },
        ];
        render(<DailyForecastCard forecast={forecastWithoutIcon} />);

        expect(screen.getByText('Thursday')).toBeInTheDocument();
        expect(screen.getByText('Temperature: 11°C')).toBeInTheDocument();
        expect(screen.queryByAltText('Weather Icon')).toBeNull();
    });
});