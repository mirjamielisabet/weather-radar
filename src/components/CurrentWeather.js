import "../App.css";
import React from "react";
import axios from "axios";
import { Card, CardContent, Stack, Typography } from "@mui/material";

const CurrentWeather = (props) => {
  const [data, setData] = React.useState({
    location: "",
    temp: "",
    desc: "",
    wind: "",
    humidity: "",
    date: "",
    icon: "",
  });

  const currentLocation = props.location;
  const getLat = props.getLat;
  const getLon = props.getLon;

  const getWeatherData = (lat, lon) => {
    const apiKey = process.env.REACT_APP_API_KEY;

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

  React.useEffect(() => {
    let lat = getLat(currentLocation);
    let lon = getLon(currentLocation);
    getWeatherData(lat, lon);
  }, [currentLocation, getLat, getLon]);

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

  return (
    <Card className="weatherContainer">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" paddingBottom={3}>
          <Stack>
            <Typography
              sx={{ fontSize: 20, position: "relative", top: "15px" }}
            >
              {data.location}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                position: "relative",
                top: "11px",
              }}
              color="text.secondary"
            >
              {data.desc}
            </Typography>
          </Stack>

          <Stack direction="row">
            <img
              src={`https://openweathermap.org/img/w/${data.icon}.png`}
              alt="weather icon"
              class="icon"
            />
            <Typography
              sx={{ fontSize: 30, position: "relative", top: "15px" }}
            >
              {data.temp}
            </Typography>
            <Typography
              sx={{ fontSize: 15, position: "relative", top: "20px" }}
            >
              °C
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Stack>
            <Typography variant="body2" sx={{ fontSize: 15 }}>
              {formatDate(data.date)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatTime(data.date)}
            </Typography>
          </Stack>

          <Typography variant="body2" textAlign="right" color="text.secondary">
            Wind: {data.wind} m/s
            <br />
            Humidity: {data.humidity} %
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
