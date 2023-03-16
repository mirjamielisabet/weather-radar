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
          temp: Math.round(result.data.main.temp),
          desc: result.data.weather[0].description,
          wind: Math.round(result.data.wind.speed * 10) / 10,
          humidity: result.data.main.humidity,
          date: result.data.dt,
          icon: result.data.weather[0].icon,
        });
      });
  };

  const formatDate = (time) => {
    let date = new Date(time * 1000);
    let dt = date.getDate();
    let month = date.toLocaleDateString("en-gb", { month: "long" });

    let dateString = `${month} ${dt}${ordinal(dt)}`;
    return dateString;
  };

  const formatTime = (time) => {
    let date = new Date(time * 1000);
    let hours = date.getHours();
    let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

    let timeString = `${hours}:${minutes}`;
    return timeString;
  };

  const ordinal = (date) => {
    if (date > 3 && date < 21) return "th";
    switch (date % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
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
          Humidity: {data.humidity} %
          <br />
          {formatDate(data.date)}
          <br />
          {formatTime(data.date)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;