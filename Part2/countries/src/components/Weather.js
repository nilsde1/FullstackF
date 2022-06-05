const Weather = ({ city, weather }) => {
  if (weather) {
    const getIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    const calculateWindSpeed = (
      Math.round(weather.wind.speed * 100) / 100
    ).toFixed(2);

    return (
      <div>
        <h3>Weather in {city}</h3>
        <p>temperature {weather.main.temp} Celsius</p>
        <img src={getIcon} alt="WeatherIcon" />
        <p>wind {calculateWindSpeed} m/s</p>
      </div>
    );
  }
};

export default Weather;
