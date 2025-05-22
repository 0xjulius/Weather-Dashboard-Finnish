import React, { useEffect, useState } from "react";

function LoadingMessage() {
  return <p className="text-gray-500">Ladataan säätietoja...</p>;
}

function ErrorMessage({ message }) {
  return <p className="text-red-500">{message}</p>;
}

function formatDate(isoString) {  // luodaan apufunktio date+time muunnokseen.
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
      <p className="text-sm text-gray-400">Aikaleima: {formatDate(weather.time)}</p>
    </div>
  );
}

function App() {
  const [weather, setWeather] = useState(null); // sää data
  const [loading, setLoading] = useState(true); // ladataan tilanne
  const [error, setError] = useState(null);     // error check

  useEffect(() => {                             // api-osoite, josta säätiedot haetaan ja tallennetaan weather funktioon.
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=60.17&longitude=24.94&current_weather=true";

    fetch(url)                                   // haetaan data
      .then((res) => res.json())                 // muunnetaan response
      .then((data) => {
        setWeather(data.current_weather);        // tallennetaan api-datasta current_weather -vastaus ja määritetään se "weather" funktiolle
        setLoading(false);                       // poistetaan ladataan ilmoitus
      })
      .catch((err) => {
        console.error("Virhe:", err);
        setError("Tietojen hakeminen epäonnistui!");
        setLoading(false);
      });
  }, []);

  function renderContent() {                                  // renderöidään sisältö
    if (loading) return <LoadingMessage />;                   // jos haku on kesken, palautetaan viesti
    if (error) return <ErrorMessage message={error} />;       // jos ilmenee virhe, palautetaan virhe
    if (weather) return <WeatherInfo weather={weather} />;    // jos kaikki onnistuu, palautetaan säätiedot
    return null;                                              // muussa tapauksessa ei näytetä mitään
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-80 text-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">🌦 Helsinki</h1>
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
