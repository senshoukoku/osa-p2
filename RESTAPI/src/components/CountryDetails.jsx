import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.REACT_APP_WEATHER_KEY; //API key

function CountryDetail({ country }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const capital = country.capital?.[0];
    const [lat, lon] = country.capitalInfo?.latlng || [];

    if (capital && lat && lon) {
      const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      axios
        .get(weatherURL)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.error('Weather API error:', error);
          setWeather(null);
        });
    }
  }, [country]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p><strong>Capital:</strong> {country.capital?.[0]}</p>
      <p><strong>Area:</strong> {country.area} km²</p>

      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages || {}).map((lang, i) => (
          <li key={i}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200" />

      {weather && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
          <p><strong>Description:</strong> {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default CountryDetail;
