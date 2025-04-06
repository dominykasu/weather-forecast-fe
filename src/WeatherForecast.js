import React, {useEffect, useState} from "react";
import {Container, Row, Col, Card} from "react-bootstrap";
import './styles.scss';
import {fetchWeatherData, fetchCityOptions, fetchWeatherForecastData} from "./services/api";
import Select from "react-select";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import DailyForecastCard from "./components/dailyForecastCard";
import axios from "axios";

const WeatherForecast = () => {
    const [city, setCity] = useState();
    const [weatherData, setWeatherData] = useState();
    const [cityOptions, setCityOptions] = useState([]);
    const [mostViewedCities, setMostViewedCities] = useState([]);
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        fetchCityOptions().then(cities => {
            setCityOptions(cities);
        });

    }, []);

    useEffect(() => {
        if (city) {
            fetchWeatherData(city).then(weatherData => {
                setWeatherData(weatherData);
            })
            fetchWeatherForecastData(city).then(forecastData => {
                const forecastDays = forecastData.list.filter((_, index) => index % 8 === 0)
                 setForecast(forecastDays)
            })
            updateMostViewed(city)
        }
    }, [city]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("cityViews"));
        if (stored) {
            const sorted = Object.entries(stored)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3)
                .map(([name]) => name);
            setMostViewedCities(sorted);
            setCity(sorted[0])
        }
    }, []);
    const updateMostViewed = (selectedCity) => {
        const cityViews = JSON.parse(localStorage.getItem("cityViews")) || {};
        cityViews[selectedCity] = (cityViews[selectedCity] || 0) + 1;
        localStorage.setItem("cityViews", JSON.stringify(cityViews));

        const sorted = Object.entries(cityViews)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([name]) => name);
        setMostViewedCities(sorted);
    };

    const logCitySelection = async (cityName) => {
        try {
            await axios.post("http://localhost:5432/api/log", {city: cityName});
        } catch (error) {
            console.error("Error logging city selection:", error);
        }
    };
    const handleCityChange = (selectedOption) => {
        setCity(selectedOption.value);
        logCitySelection(selectedOption.value);
    };

    const handleMostViewedClick = (cityName) => {
        setCity(cityName);
        logCitySelection(cityName);
    };

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("mostViewedCities"));
        if (stored) setMostViewedCities(stored);
    }, []);

    return (
        <div className="dashboard-container">
            <Container fluid>
                <Row className="mb-4 align-items-center">
                    <Col md={6} sm={12} className="search-dropdown">
                        <Select
                            options={cityOptions}
                            onChange={handleCityChange}
                            placeholder="Search for a city..."
                            isSearchable
                        />
                    </Col>
                    <Col md={6} sm={12}>
                        <div className="most-viewed">
                            <h6>Most Viewed:</h6>
                            {mostViewedCities.map((city, index) => (
                                <span
                                    key={index}
                                    className="most-viewed-cities"
                                    onClick={() => handleMostViewedClick(city)}
                                >
                                    {city}
                                </span>
                            ))}
                        </div>
                    </Col>
                </Row>
                {weatherData && (
                    <Row>
                        <Col lg={6} md={12} className="mb-4">
                            <Card className="weather-card text-center">
                                <h3>{weatherData.name}</h3>
                                {weatherData.weather[0].icon && (
                                    <img
                                        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                        alt="Weather Icon"
                                    />)}
                                <h1>{Math.round(weatherData.main.temp)}°C</h1>
                                <p>Wind: {weatherData.wind.speed} m/s</p>
                                <p>Humidity: {weatherData.main.humidity}%</p>
                            </Card>
                        </Col>
                    </Row>
                )}
                <Row className="forecast-row mt-4">
                    {forecast && <DailyForecastCard forecast={forecast}/>}
                </Row>
                <Col>
                    <Card className="chart-card">
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart
                                data={forecast.map(f => ({date: f.dt_txt.split(" ")[0], temp: f.main.temp}))}>
                                <XAxis dataKey="date"/>
                                <YAxis/>
                                <Tooltip/>
                                <CartesianGrid stroke="#444"/>
                                <Line type="monotone" dataKey="temp" stroke="#ff7300" strokeWidth={2}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </Card>
                </Col>
            </Container>
        </div>
    );
};

export default WeatherForecast;
