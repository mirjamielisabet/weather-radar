import React from "react";
import "./App.css";
import Header from "./components/Header";
import DropDownMenu from "./components/DropDownMenu";
import CurrentWeather from "./components/CurrentWeather";
import Forecast from "./components/Forecast";

const App = () => {
  const [currentLocation, setCurrentLocation] = React.useState("All cities");
  const locations = ["Espoo", "Jyväskylä", "Kuopio", "Tampere"];

  const getLat = (location) => {
    switch (location) {
      case "Espoo":
        return 60.25;
      case "Jyväskylä":
        return 62.2415;
      case "Kuopio":
        return 62.8924;
      case "Tampere":
        return 61.4991;
      default:
        return 60.25;
    }
  };

  const getLon = (location) => {
    switch (location) {
      case "Espoo":
        return 24.6667;
      case "Jyväskylä":
        return 25.7209;
      case "Kuopio":
        return 27.677;
      case "Tampere":
        return 23.7871;
      default:
        return 24.6667;
    }
  };

  return (
    <div>
      <Header />
      <DropDownMenu setCurrentLocation={setCurrentLocation} />
      {currentLocation === "All cities" && (
        <div>
          {locations.map((location, index) => {
            return (
              <div key={index}>
                <CurrentWeather
                  location={location}
                  getLat={getLat}
                  getLon={getLon}
                />
                <Forecast location={location} getLat={getLat} getLon={getLon} />
              </div>
            );
          })}
        </div>
      )}
      {currentLocation !== "All cities" && (
        <div>
          <CurrentWeather
            location={currentLocation}
            getLat={getLat}
            getLon={getLon}
          />
          <Forecast
            location={currentLocation}
            getLat={getLat}
            getLon={getLon}
          />
        </div>
      )}
    </div>
  );
};

export default App;
