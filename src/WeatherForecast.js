import React, {useEffect, useState} from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import './styles.scss';
import {fetchWeatherData} from "./services/api";
const WeatherForecast = () => {
    const [city, setCity] = useState("New York");
    const [weatherData, setWeatherData] = useState();

    useEffect(() => {
        setWeatherData(fetchWeatherData(city));
    }, []);

    return (
        <div className="dashboard-container">
            <Container>
                <Row>
                    <Col>
                        <h2>Weather Dashboard</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className="weather-card">
                            <h3>{city}</h3>
                            <h1>--°C</h1>
                            <p>Wind: -- m/s</p>
                            <p>Humidity: --%</p>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default WeatherForecast;
