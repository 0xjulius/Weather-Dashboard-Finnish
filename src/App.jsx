import React, { useEffect, useRef, useState } from "react";
import WeatherCard from "./components/WeatherCard";
import * as THREE from "three";
import CLOUDS from "vanta/dist/vanta.clouds.min";

const cities = [
  { city: "Helsinki", latitude: 60.17, longitude: 24.94 },
  { city: "Tampere", latitude: 61.5, longitude: 23.8 },
  { city: "Oulu", latitude: 65.01, longitude: 25.47 },
  { city: "Turku", latitude: 60.45, longitude: 22.26 },
  { city: "Vaasa", latitude: 63.09, longitude: 21.61 },
];


function App() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CLOUDS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="min-h-screen flex flex-wrap justify-center items-center p-4"
      style={{ backgroundColor: "#3a5a7a" }} // fallback color if animation fails
    >
      {cities.map((location) => (
        <WeatherCard key={location.city} {...location} />
      ))}
    </div>
  );
}

export default App;
