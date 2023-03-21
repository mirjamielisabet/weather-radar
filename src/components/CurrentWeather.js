import "../App.css";
import React from "react";
import axios from "axios";
import { Card, CardContent, Stack, Typography } from "@mui/material";

/**
 * A component containing information about the current weather of the chosen location.
 *
 * @param {Object} props
 * @param {string} props.location - The chosen location
 * @param {Function} props.getLat - Function for obtaining the latitude of the chosen location
 * @param {Function} props.getLon - Function for obtaining the longitude of the chosen location
 * @returns the Current Weather component
 */
const CurrentWeather = (props) => {
  const [data, setData] = React.useState({
    location: "",
    temp: "",
    desc: "",
    wind: "",
    humidity: "",
    rain: "",
    date: "",
    icon: "",
  });
  const [errorMsg, setErrorMsg] = React.useState("");

  const currentLocation = props.location;
  const getLat = props.getLat;
  const getLon = props.getLon;

  /**
   * By using Axios, fetches the weather information of the chosen location and saves the data to the state.
   * @param {number} lat - the latitude of the location
   * @param {number} lon - the longitude of the location
   */
  const getWeatherData = (lat, lon) => {
    const apiKey = process.env.REACT_APP_API_KEY;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      )
      .then((result) => {
        let rain = ": 0";
        if (result.data.rain) {
          if (result.data["rain"]["3h"]) {
            rain = " (3h): " + Math.round(result.data["rain"]["3h"]);
          } else if (result.data["rain"]["1h"]) {
            rain = " (1h): " + Math.round(result.data["rain"]["1h"]);
          }
        }

        setData({
          location: result.data.name,
          temp: Math.round(result.data.main.temp),
          desc: result.data.weather[0].description,
          wind: Math.round(result.data.wind.speed * 10) / 10,
          humidity: result.data.main.humidity,
          rain: rain,
          date: result.data.dt,
          icon: result.data.weather[0].icon,
        });
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

  /**
   * Gets the latitude and longitude values and calls getWeatherData function
   * after the initial render and when the location changes.
   */
  React.useEffect(() => {
    let lat = getLat(currentLocation);
    let lon = getLon(currentLocation);
    getWeatherData(lat, lon);
  }, [currentLocation, getLat, getLon]);

  /**
   * Formats the date as 'month date+ordinal indicator'
   * @param {number} time - the time in unix form
   * @returns the formatted date
   */
  const formatDate = (time) => {
    let date = new Date(time * 1000);
    let dt = date.getDate();
    let month = date.toLocaleDateString("en-gb", { month: "long" });

    let dateString = `${month} ${dt}${ordinal(dt)}`;
    return dateString;
  };

  /**
   * Formats the time as 'hours:minutes'
   * @param {number} time - the time in unix form
   * @returns the formatted time
   */
  const formatTime = (time) => {
    let date = new Date(time * 1000);
    let hours = date.getHours();
    let minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

    let timeString = `${hours}:${minutes}`;
    return timeString;
  };

  /**
   * Returns the fitting ordinal indicator for the date.
   * @param {number} date - the date
   * @returns the ordinal indicator
   */
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

  if (errorMsg !== "") {
    return <div className="errormsg">Current Weather data: {errorMsg}</div>;
  }
  return (
    <Card className="weatherContainer" variant="outlined">
      <CardContent>
        <Stack direction="row" justifyContent="space-between" paddingBottom={3}>
          <Stack>
            <Typography
              sx={{ fontSize: "19pt", position: "relative", top: "15px" }}
            >
              {data.location}
            </Typography>
            <Typography
              sx={{
                fontSize: "13pt",
                position: "relative",
                top: "11px",
              }}
              className="secondary-text"
            >
              {data.desc}
            </Typography>
          </Stack>

          <Stack direction="row">
            <img
              src={`https://openweathermap.org/img/w/${data.icon}.png`}
              alt="weather icon"
              className="icon"
            />
            <Typography
              sx={{ fontSize: "26pt", position: "relative", top: "15px" }}
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
          <Stack sx={{ position: "relative", top: "25px" }}>
            <Typography sx={{ fontSize: "15pt" }}>
              {formatDate(data.date)}
            </Typography>
            <Typography className="secondary-text" sx={{ fontSize: "13pt" }}>
              {formatTime(data.date)}
            </Typography>
          </Stack>

          <Typography
            textAlign="right"
            className="secondary-text"
            sx={{ fontSize: "13pt" }}
          >
            Wind: {data.wind} m/s
            <br />
            Humidity: {data.humidity} %
            <br />
            Precipitation{data.rain} mm
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
