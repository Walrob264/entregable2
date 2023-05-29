import { useEffect, useState } from "react";
import "./App.css";
import getApiKey from "./utils/getApiKeys";
import axios from "axios";
import WheatherCard from "./components/WheatherCard";
import Loading from "./components/Loading";

function App() {
  const [coords, setCoords] = useState();
  const [inputValueCity, setinputValueCity] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();

  useEffect(() => {
    const succes = (pos) => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setCoords(obj);
    };
    navigator.geolocation.getCurrentPosition(succes);
  }, []);

  useEffect(() => {
    if (inputValueCity) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValueCity},&appid=${getApiKey()}`;
      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          const objTemp = {
            celsius: +(res.data.main.temp - 273.15).toFixed(1),
            farenheit: +(((res.data.main.temp - 273.15) * 9) / 5 + 32).toFixed(
              1
            ),
          };
          setTemp(objTemp);
        })
        .catch((err) => console.log(err));
    } else if (coords) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${
        coords.lat
      }&lon=${coords.lon}&appid=${getApiKey()}`;

      axios
        .get(url)
        .then((res) => {
          setWeather(res.data);
          const objTemp = {
            celsius: +(res.data.main.temp - 273.15).toFixed(1),
            farenheit: +(((res.data.main.temp - 273.15) * 9) / 5 + 32).toFixed(
              1
            ),
          };
          setTemp(objTemp);
        })
        .catch((err) => console.log(err));
    }
  }, [coords, inputValueCity]);

  const handleSumbit = (e) => {
    e.preventDefault();
    setinputValueCity(e.target.inputValueCity.value.trim());
    e.target.inputValueCity.value = "";
  };
  return (
    <div className="app">
      <form className="form" onSubmit={handleSumbit}>
        <input
          className="input"
          type="text"
          id="inputValueCity"
          placeholder="Search your City"
        />
        <button className="button">Search</button>
      </form>
      {weather ? <WheatherCard weather={weather} temp={temp} /> : <Loading />}
    </div>
  );
}

export default App;
