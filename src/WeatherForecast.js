import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import './styles.scss';
const WeatherForecast = () => {
    const [city, setCity] = useState("New York");

    return (
        <div className="dashboard-container">
            <Container>
                <Row className="mb-3">
                    <Col md={6}>
                        <h2>Weather Dashboard</h2>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Card className="p-3 weather-card">
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
