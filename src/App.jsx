import React from "react";
import WeatherCard from "./components/WeatherCard";

// lista kaupungeista, joille näytetään säätiedot
const cities = [
  { city: "Helsinki", latitude: 60.17, longitude: 24.94 },
  { city: "Tampere", latitude: 61.5, longitude: 23.8 },
  { city: "Oulu", latitude: 65.01, longitude: 25.47 },
  { city: "Turku", latitude: 60.45, longitude: 22.26 },
  { city: "Vaasa", latitude: 63.09, longitude: 21.61 },
];

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-wrap justify-center items-center p-4">
      {/* käydään kaupunkilista läpi ja luodaan jokaisesta WeatherCard-komponentti */}
      {cities.map((location) => (
        // avaimena käytetään kaupungin nimeä, ja propsit välitetään suoraan WeatherCardille
        <WeatherCard key={location.city} {...location} />
      ))}
    </div>
  );
}

export default App;
