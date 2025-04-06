import React from 'react';
import {Row, Col, Card} from 'react-bootstrap';

function DailyForecastCard({forecast}) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const dailyForecasts = {};

    forecast.forEach((f) => {
        const date = new Date(f.dt * 1000);
        const dayIndex = date.getDay();
        const dayName = daysOfWeek[dayIndex];

        const dateString = date.toLocaleDateString();

        if (!dailyForecasts[dateString]) {
            dailyForecasts[dateString] = {
                dayName: dayName,
                temp: Math.round(f.main.temp),
                wind: Math.round(f.wind.speed),
                humidity: Math.round(f.main.humidity),
                icon: f.weather[0]?.icon,
            };
        }
    });

    const dailyForecastArray = Object.values(dailyForecasts);

    return (
        <Row className="forecast-row mt-4">
            {dailyForecastArray.map((daily) => (
                <Col key={daily.dayName} xs={6} sm={4} md={2} className="mb-3">
                    <Card className="forecast-card text-center">
                        <h5>{daily.dayName}</h5>
                        {daily.icon && (
                            <img className="forecast-icon"
                                 src={`https://openweathermap.org/img/wn/${daily.icon}@2x.png`}
                                 alt="Weather Icon"
                            />
                        )}
                        <p>Temperature: {daily.temp}°C</p>
                        <p>Wind: {daily.wind} m/s</p>
                        <p>Humidity: {daily.humidity}%</p>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default DailyForecastCard;