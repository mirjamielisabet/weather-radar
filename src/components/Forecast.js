import React from "react";
import axios from "axios";
import { Card, CardContent, Typography } from "@mui/material";

const Forecast = (props) => {
  const [data, setData] = React.useState([
    {
      temp: "",
      wind: "",
      humidity: "",
      date: "",
      icon: "",
    },
  ]);

  const currentLocation = props.location;
  const getLat = props.getLat;
  const getLon = props.getLon;

  const formatTime = (time) => {
    let date = new Date(time);
    let hours = date.getHours();
    let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

    let timeString = `${hours}:${minutes}`;
    return timeString;
  };

  const getForecastData = (lat, lon) => {
    const apiKey = process.env.REACT_APP_API_KEY;

    const tempArr = [];

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      )
      .then((result) => {
        for (let i = 1; i < 6; i++) {
          tempArr.push({
            temp: Math.round(result.data.list[i].main.temp),
            wind: Math.round(result.data.list[i].wind.speed * 10) / 10,
            humidity: result.data.list[i].main.humidity,
            date: result.data.list[i].dt_txt,
            icon: result.data.list[i].weather[0].icon,
          });
        }
        setData(tempArr);
      });
  };

  React.useEffect(() => {
    let lat = getLat(currentLocation);
    let lon = getLon(currentLocation);
    getForecastData(lat, lon);
  }, [currentLocation, getLat, getLon]);

  return (
    <div>
      {data.map((row, index) => {
        return (
          <Card sx={{ minWidth: 275 }} key={index}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {formatTime(row.date)}
              </Typography>
              <img
                src={`https://openweathermap.org/img/w/${row.icon}.png`}
                alt="weather icon"
              />
              <Typography sx={{ fontSize: 20 }} gutterBottom>
                {row.temp} °C
              </Typography>
              <Typography variant="body2">
                {row.wind} m/s
                <br />
                {row.humidity} %
                <br />
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Forecast;
