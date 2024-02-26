import React, { useState } from "react";
import axios from "axios";
import styles from "./DropDown.module.css";

const DropDown = () => {
  const [weather, setWeather] = useState({});
  const today = new Date().toLocaleDateString("en-US");
  const tomorrow = new Date(
    Date.now() + 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-US");
  const dayAfterTomorrow = new Date(
    Date.now() + 2 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-US");
  const thirdDay = new Date(
    Date.now() + 3 * 24 * 60 * 60 * 1000
  ).toLocaleDateString("en-US");

  const handleChange = async (e) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${e.target.value}&units=metric&appid=1d75cfc1c34237184a63881579635407`
      );
      const foreCast = aggregateForecastData(response.data.list);
      setWeather(foreCast);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const aggregateForecastData = (forecastList) => {
    const forecastData = {};
    forecastList.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString("en-US");
      if (!forecastData[date]) {
        forecastData[date] = [];
      }
      forecastData[date].push({
        date: date,
        weather: item.weather[0].main,
        icon: `http://openweathermap.org/img/w/${item.weather[0].icon}.png`,
        temperature: item.main.temp,
      });
    });
    return forecastData;
  };

  return (
    <div>
      <select onChange={handleChange}>
        <option value="">Select Country</option>
        <option value="Ho Chi Minh">Ho Chi Minh</option>
        <option value="Singapore">Singapore</option>
        <option value="Kuala Lumpur">Kuala Lumpur</option>
        <option value="Tokyo">Tokyo</option>
        <option value="Athens">Athens</option>
      </select>
      <div className={styles.container}>
        <div>
          {weather[today] &&
            weather[today].map(
              (day, index) =>
                index === 0 && (
                  <div key={index}>
                    <p>Current Weather</p>
                    <img src={day.icon} alt="weather icon" />
                    <p>{day.temperature}°C</p>
                  </div>
                )
            )}
        </div>
        <div>
          {weather[tomorrow] &&
            weather[tomorrow].map(
              (day, index) =>
                index === 0 && (
                  <div key={index}>
                    <p>{day.date}</p>
                    <img src={day.icon} alt="weather icon" />
                    <p>{day.temperature}°C</p>
                  </div>
                )
            )}
        </div>
        <div>
          {weather[dayAfterTomorrow] &&
            weather[dayAfterTomorrow].map(
              (day, index) =>
                index === 0 && (
                  <div key={index}>
                    <p>{day.date}</p>
                    <img src={day.icon} alt="weather icon" />
                    <p>{day.temperature}°C</p>
                  </div>
                )
            )}
        </div>
        <div>
          {weather[thirdDay] &&
            weather[thirdDay].map(
              (day, index) =>
                index === 0 && (
                  <div key={index}>
                    <p>{day.date}</p>
                    <img src={day.icon} alt="weather icon" />
                    <p>{day.temperature}°C</p>
                  </div>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default DropDown;
