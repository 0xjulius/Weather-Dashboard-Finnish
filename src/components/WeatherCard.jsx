import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  WiStrongWind,
  WiHumidity,
  WiThermometer,
  WiCloud,
  WiDaySunny,
  WiFog,
  WiSprinkle,
  WiRain,
  WiRainMix,
  WiSnow,
  WiSnowflakeCold,
  WiShowers,
  WiSnowWind,
  WiThunderstorm,
  WiHail,
} from "react-icons/wi";

export default function WeatherCard({ city, latitude, longitude }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          "https://api.open-meteo.com/v1/forecast",
          {
            params: {
              latitude,
              longitude,
              current_weather: true,
              daily:
                "temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,relative_humidity_2m_max,relative_humidity_2m_min,weathercode",
              timezone: "auto",
            },
          }
        );
        setWeather(response.data);
      } catch (error) {
        console.error("Sään haku epäonnistui:", error);
      }
    };

    fetchWeather();
  }, [latitude, longitude]);

  if (!weather) {
    return (
      <div className="w-64 h-80 m-4 bg-[#151515] text-white flex items-center justify-center rounded-xl">
        Ladataan...
      </div>
    );
  }

  const current = weather.current_weather;
  const daily = weather.daily;

  const avgHumidity =
    daily.relative_humidity_2m_max && daily.relative_humidity_2m_min
      ? Math.round(
          (daily.relative_humidity_2m_max[0] +
            daily.relative_humidity_2m_min[0]) /
            2
        )
      : null;

  const avgFeelsLike =
    daily.apparent_temperature_max && daily.apparent_temperature_min
      ? Math.round(
          (daily.apparent_temperature_max[0] +
            daily.apparent_temperature_min[0]) /
            2
        )
      : null;

  const getWeekday = (isoDate) =>
    new Date(isoDate).toLocaleDateString("fi-FI", { weekday: "short" });

  // Map weather codes to icons with size param
  const weatherCodeToIcon = (code, size = 24) => {
    if (code === 0)
      return (
        <WiDaySunny size={size} className="mx-auto my-1 text-yellow-400" />
      );
    if ([1, 2, 3].includes(code))
      return <WiCloud size={size} className="mx-auto my-1 text-gray-400" />;
    if ([45, 48].includes(code))
      return <WiFog size={size} className="mx-auto my-1 text-gray-400" />;
    if ([51, 53, 55].includes(code))
      return <WiSprinkle size={size} className="mx-auto my-1 text-blue-400" />;
    if ([61, 63, 65].includes(code))
      return <WiRain size={size} className="mx-auto my-1 text-blue-600" />;
    if ([66, 67].includes(code))
      return <WiRainMix size={size} className="mx-auto my-1 text-blue-600" />;
    if ([71, 73, 75].includes(code))
      return <WiSnow size={size} className="mx-auto my-1 text-blue-200" />;
    if (code === 77)
      return (
        <WiSnowflakeCold size={size} className="mx-auto my-1 text-blue-200" />
      );
    if ([80, 81, 82].includes(code))
      return <WiShowers size={size} className="mx-auto my-1 text-blue-400" />;
    if ([85, 86].includes(code))
      return <WiSnowWind size={size} className="mx-auto my-1 text-blue-300" />;
    if (code === 95)
      return (
        <WiThunderstorm size={size} className="mx-auto my-1 text-yellow-600" />
      );
    if ([96, 99].includes(code))
      return <WiHail size={size} className="mx-auto my-1 text-yellow-600" />;
    return <WiCloud size={size} className="mx-auto my-1 text-gray-400" />; // default fallback
  };

  return (
    <div className="w-64 bg-[#151515] rounded-xl overflow-hidden shadow-2xl border border-[#232323] font-inter m-4 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
    style={{ willChange: "transform" }}>
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-[#232323]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <h2 className="text-gray-200 font-medium text-sm">{city}</h2>
          </div>
          <span className="text-xs text-gray-500">Nyt päivitetty</span>
        </div>
      </div>

      {/* Current weather */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-baseline">
              <span className="text-4xl font-light text-white">
                {Math.round(current.temperature)}°
              </span>
              <span className="ml-1 text-gray-400 text-sm">C</span>
            </div>
            <p className="text-gray-400 text-sm mt-1 flex items-center gap-1">
              <WiStrongWind size={18} />
              Tuuli {Math.round(current.windspeed)} km/h
            </p>
          </div>

          <div className="text-gray-300">
            {/* Bigger current weather icon */}
            {weatherCodeToIcon(current.weathercode, 60)}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 py-4 bg-[#171717] grid grid-cols-3 gap-2 text-center">
        <div className="px-2 py-3 flex flex-col items-center">
          <WiHumidity size={28} className="text-gray-500" />
          <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">
            Kosteus
          </p>
          <p className="text-gray-300 font-medium mt-1">
            {avgHumidity !== null ? `${avgHumidity}%` : "–"}
          </p>
        </div>
        <div className="px-2 py-3 flex flex-col items-center">
          <WiStrongWind size={28} className="text-gray-500" />
          <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">
            Tuuli
          </p>
          <p className="text-gray-300 font-medium mt-1">
            {Math.round(current.windspeed)} km/h
          </p>
        </div>
        <div className="px-2 py-3 flex flex-col items-center">
          <WiThermometer size={28} className="text-gray-500" />
          <p className="text-xs text-gray-500 uppercase tracking-wide mt-1">
            Tuntuu kuin
          </p>
          <p className="text-gray-300 font-medium mt-1">
            {avgFeelsLike !== null ? `${avgFeelsLike}°` : "–"}
          </p>
        </div>
      </div>

      {/* Forecast */}
      <div className="px-6 py-4 border-t border-[#232323]">
        <div className="grid grid-cols-5 gap-2">
          {daily.time.slice(0, 5).map((day, i) => (
            <div key={day} className="text-center">
              <p className="text-xs text-gray-500">{getWeekday(day)}</p>
              {weatherCodeToIcon(daily.weathercode[i])}
              <p className="text-xs font-medium text-gray-300">
                {Math.round(daily.temperature_2m_max[i])}°
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
