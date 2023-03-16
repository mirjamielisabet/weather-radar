import React from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";

const CurrentWeather = () => {
  const [data, setData] = React.useState({
    location: "",
    temp: "",
    desc: "",
    wind: "",
    humidity: "",
    date: "",
    icon: "",
  });

  const getWeatherData = () => {
    const apiKey = "apikey";

    // Tampere:
    const lat = 61.4991;
    const lon = 23.7871;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      )
      .then((result) => {
        setData({
          location: result.data.name,
          temp: result.data.main.temp,
          desc: result.data.weather[0].description,
          wind: result.data.wind.speed,
          humidity: result.data.main.humidity,
          date: result.data.dt,
          icon: result.data.weather[0].icon,
        });
      });
  };

  React.useEffect(() => {
    getWeatherData();
  }, []);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20 }}>{data.location}</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data.desc}
        </Typography>
        <img
          src={`https://openweathermap.org/img/w/${data.icon}.png`}
          alt="weather icon"
        />
        <Typography sx={{ fontSize: 20 }} gutterBottom>
          {data.temp} °C
        </Typography>
        <Typography variant="body2">
          Wind: {data.wind} m/s
          <br />
          Temperature: {data.temp} °C
          <br />
          Humidity: {data.humidity} %
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
