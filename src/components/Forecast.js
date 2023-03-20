import React from "react";
import axios from "axios";
import { Card, CardContent, Stack, Typography } from "@mui/material";

const Forecast = (props) => {
  const [data, setData] = React.useState([
    {
      temp: "",
      wind: "",
      humidity: "",
      rain: "",
      date: "",
      icon: "",
    },
  ]);
  const [errorMsg, setErrorMsg] = React.useState("");

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
          let rain = 0;
          if (result.data.list[i].rain) {
            if (result.data.list[i].rain["3h"]) {
              rain = Math.round(result.data.list[i].rain["3h"]);
            }
          }
          tempArr.push({
            temp: Math.round(result.data.list[i].main.temp),
            wind: Math.round(result.data.list[i].wind.speed * 10) / 10,
            humidity: result.data.list[i].main.humidity,
            rain: rain,
            date: result.data.list[i].dt_txt,
            icon: result.data.list[i].weather[0].icon,
          });
        }
        setData(tempArr);
      })
      .catch((error) => {
        if (error.response) {
          setErrorMsg(error.response.status + " " + error.response.statusText);
          console.log(error.response);
        } else if (error.request) {
          setErrorMsg("Error: request failed, no response");
          console.log(error.request);
        } else {
          setErrorMsg("Error: ", error.message);
        }
      });
  };

  React.useEffect(() => {
    let lat = getLat(currentLocation);
    let lon = getLon(currentLocation);
    getForecastData(lat, lon);
  }, [currentLocation, getLat, getLon]);

  if (errorMsg !== "") {
    return <div className="errormsg">Forecast data: {errorMsg}</div>;
  }
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="center"
      className="forecastContainer"
    >
      {data.map((row, index) => {
        return (
          <Card sx={{ width: "100%" }} variant="outlined" key={index}>
            <CardContent>
              <Typography
                className="secondary-text"
                sx={{ fontSize: "13pt" }}
                gutterBottom
              >
                {formatTime(row.date)}
              </Typography>
              <img
                src={`https://openweathermap.org/img/w/${row.icon}.png`}
                alt="weather icon"
              />
              <Stack direction="row" justifyContent="center">
                <Typography sx={{ fontSize: "15pt" }}>{row.temp}</Typography>
                <Typography
                  sx={{ fontSize: "9pt", position: "relative", top: "2px" }}
                >
                  °C
                </Typography>
              </Stack>
            </CardContent>
            <CardContent
              sx={{
                backgroundColor: "#e5f6fd",
                borderTop: "1px solid #E6E6E6",
              }}
            >
              <Typography
                className="secondary-text"
                sx={{
                  fontSize: "10pt",
                }}
              >
                {row.wind} m/s
                <br />
                {row.humidity} %
                <br />
                {row.rain} mm
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Stack>
  );
};

export default Forecast;
