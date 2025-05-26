import React, { useEffect, useState } from "react";

function LoadingMessage() {
  return <p className="text-gray-500">Ladataan säätietoja...</p>;
}

function ErrorMessage({ message }) {
  return <p className="text-red-500">{message}</p>;
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString("fi-FI", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function WeatherInfo({ weather }) {
  return (
    <div className="space-y-2 text-center">
      <p className="text-3xl font-semibold">{weather.temperature}°C</p>
      <p className="text-sm text-gray-600">Tuuli: {weather.windspeed} km/h</p>
      <p className="text-sm text-gray-400">
        Aikaleima: {formatDate(weather.time)}
      </p>
    </div>
  );
}

export default function WeatherCard({ city, latitude, longitude }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setWeather(data.current_weather);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Virhe:", err);
        setError("Tietojen hakeminen epäonnistui!");
        setLoading(false);
      });
  }, [latitude, longitude]);

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 w-80 text-center m-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">🌦 {city}</h1>
      {loading && <LoadingMessage />}
      {error && <ErrorMessage message={error} />}
      {weather && <WeatherInfo weather={weather} />}
    </div>
  );
}
