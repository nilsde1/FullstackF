import React, { useEffect, useState } from "react";
import Language from "./Language";
import Weather from "./Weather";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  const api_key = process.env.REACT_APP_API_KEY;
  const capital = country[0].capital;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`;

  useEffect(() => {
    axios.get(url).then((response) => {
      setWeather(response.data);
    });
  }, [url]);

  return (
    <div>
      {country.map((country) => (
        <div key={country.cca3}>
          <h1>{country.name.common} </h1>
          <p>
            <div>Capital: {country.capital}</div>
            <div>Area: {country.area}</div>
          </p>
          <Language languages={Object.entries(country.languages)} />
          <img src={country.flags.png} alt="CountryFlag" />
        </div>
      ))}
      <Weather capital={capital} weather={weather} />
    </div>
  );
};

export default Country;
