import React, { useState } from "react";
import { ForecastCards } from "./ForecastCards";
import axios from "axios";

export const Current = () => {
  const [city, setCity] = useState("");
  const [data, setData] = useState();
  const [forecasts, setForecasts] = useState(null);
  const [error, setError] = useState();

  const fetchWeatherForecast = async () => {
    setData(null);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=d63dfa57822545d5af624205242706&q=${city}&days=6&aqi=no&alerts=no`
      );
      setData(response.data);
      setForecasts(response.data.forecast.forecastday);
      setCity("");
    } catch (e) {
      setError(e.response.data.error.message);
    }
  };
  return (
    <div className="w-full flex flex-col  items-center">
      <div className="w-9/12 flex flex-row justify-center mt-2">
        <input
          type="search"
          id="search"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-4/5 p-3 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Search for a city..."
          required
        />
        <button
          type="submit"
          onClick={fetchWeatherForecast}
          className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-3 px-5 ml-1"
        >
          Search
        </button>
      </div>
      {!data ? (
        <div>{error}</div>
      ) : (
        <>
          <section
            className="w-9/12 flex justify-center items-center flex-col text-slate-100 bg-white/20 rounded-lg
     mt-4 mb-4 py-5"
          >
            <h1 className="text-xl pb-1">
              {data.location.name},{data.location.region}
            </h1>
            <h2 className="text-2xl">
              {data.current.temp_c}
              °C
            </h2>
            <img src={data.current.condition.icon} alt="weather-img" />
            <h3 className="text-xl pb-1">{data.current.condition.text}</h3>
            <p className="pb-1 text-xs">{data.location.localtime}</p>
            <div className="pb-1 text-sm">
              <span className="mr-2">
                Wind {data.current.wind_kph}
                km/h
              </span>
              <span className="ml-2">
                {" "}
                Precipitation {data.current.precip_mm}
                mm
              </span>
            </div>
            <div className="pb-1 text-sm">
              <span className="mr-2">Humidity {data.current.humidity} %</span>
              <span className="ml-2">Cloudness {data.current.cloud} %</span>
            </div>
          </section>
          <section className="w-9/12 flex flex-row flex-wrap items-center justify-center">
            {forecasts.slice(1).map((forecast, index) => {
              return (
                <ForecastCards
                  key={index}
                  day={forecast.date}
                  img={forecast.day.condition.icon}
                  temperature={forecast.day.avgtemp_c}
                  condition={forecast.day.condition.text}
                />
              );
            })}
          </section>
        </>
      )}
    </div>
  );
};
