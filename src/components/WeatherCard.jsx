import React, { useEffect, useState } from "react";

const weatherDescriptions = {
  0: "☀️ Selkeää",
  1: "🌤️ Melkein selkeää",
  2: "⛅ Puolipilvistä",
  3: "☁️ Pilvistä",
  45: "🌫️ Sumuista",
  48: "🌫️ Jäätävä sumu",
  51: "🌦️ Kevyt tihku",
  61: "🌧️ Sade",
  71: "🌨️ Lumi",
  95: "⛈️ Ukkosmyrsky",
};

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("fi-FI", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });
}

export default function WeatherCard({ city, latitude, longitude }) {
  const [unit, setUnit] = useState("celsius");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const unitSymbol = unit === "celsius" ? "°C" : "°F";

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto&temperature_unit=${unit}`;

    setLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data.current_weather);
        setForecast(data.daily);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Virhe:", err);
        setError("Tietojen hakeminen epäonnistui!");
        setLoading(false);
      });
  }, [latitude, longitude, unit]);

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-90 text-center m-4">
      <h1 className="text-2xl font-bold mb-2 text-blue-700">🌦 {city}</h1>

      <button
        onClick={() => setUnit(unit === "celsius" ? "fahrenheit" : "celsius")}
        className="text-sm text-blue-500 hover:underline mb-4"
      >
        Vaihda {unit === "celsius" ? "°F" : "°C"}
      </button>

      {loading && <p className="text-gray-500">Ladataan säätietoja...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {weather && (
        <>
          <div className="text-3xl font-semibold">
            {weather.temperature} {unitSymbol}
          </div>
          <p className="text-sm text-gray-600">
            Tuuli: {weather.windspeed} km/h
          </p>
          <p className="text-sm mt-1">
            {weatherDescriptions[weather.weathercode] || "🌈"}
          </p>
        </>
      )}

      {forecast && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700 mb-2">7 päivän ennuste</h3>
          <div className="grid grid-cols-3 gap-2 text-sm">
            {forecast.time.slice(0, 7).map((day, i) => (
              <div key={i} className="bg-blue-100 rounded p-2">
                <div className="font-medium">{formatDate(day)}</div>
                <div>
                  {forecast.temperature_2m_max[i]} /{" "}
                  {forecast.temperature_2m_min[i]} {unitSymbol}
                </div>
                <div className="text-xs">
                  {weatherDescriptions[forecast.weathercode[i]] || "🌈"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
