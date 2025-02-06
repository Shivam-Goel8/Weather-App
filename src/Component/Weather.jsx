import React, { useEffect, useRef, useState } from 'react';
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import cloud_icon from "../assets/cloud.png";

function Weather() {

    const InputRef = useRef()
    const allIcons = {
        "01d": clear_icon, "01n": clear_icon,
        "02d": cloud_icon, "02n": cloud_icon,
        "03d": cloud_icon, "03n": cloud_icon,
        "04d": drizzle_icon, "04n": drizzle_icon,
        "09d": rain_icon, "09n": rain_icon,
        "10d": rain_icon, "10n": rain_icon,
        "13d": snow_icon, "13n": snow_icon
    };

    const [weatherData, setWeatherData] = useState(null);

    const search = async (city) => {
        if (city === " ") {
            alert("City not found")
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=83c5668a7f1999cbbdf72443011f944f&units=metric`;
            const response = await fetch(url);
            const data = await response.json();

            console.log(data);

            const icon = allIcons[data.weather[0]?.icon] || cloud_icon;

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            });
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };
                                
    useEffect(() => {
        search("delhi");
    }, []);

    return (
        <div className="container">
            <div className="search">
                <input type="text" placeholder="Search" ref={InputRef} />
                <img src={search_icon} alt="Search icon" onClick={() => search(InputRef.current.value)} />
            </div>

            {weatherData ? (
                <>
                    <img src={weatherData.icon} className="weather_icon" alt="Weather icon" />
                    <p className="temp">{weatherData.temperature}<sup>o</sup>C</p>
                    <p className="location">{weatherData.location}</p>
                    <div className="weather_data">
                        <div>
                            <div className="humid">
                                <img src={humidity_icon} alt="Humidity icon" />
                                <p>{weatherData.humidity}%</p>
                            </div>
                            <p className="data">Humidity</p>
                        </div>
                        <div>
                            <div className="humid">
                                <img src={wind_icon} alt="Wind icon" />
                                <p>{weatherData.windSpeed} km/h</p>
                            </div>
                            <p className="data">Wind Speed</p>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Weather;
