import { useState } from "react";
import { Weather } from "./components/Wether";
import { CitySelect } from "./components/CitySelect";

export const App = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCityJP, setSelectedCityJP] = useState("");
  const [showWeather, setShowWeather] = useState(false);

  return (
    <div className="max-w-screen-md mx-auto bg-black h-screen">
      <div className="mx-auto">
        <h1 className="text-2xl font-bold">Weather-App</h1>
        <div className="mt-3">
          <CitySelect
            setSelectedCity={setSelectedCity}
            setShowWeather={setShowWeather}
            setSelectedCityJP={setSelectedCityJP}
            city_en="tokyo"
            city_jp="東京"
          />
          <CitySelect
            setSelectedCity={setSelectedCity}
            setShowWeather={setShowWeather}
            setSelectedCityJP={setSelectedCityJP}
            city_en="osaka"
            city_jp="大阪"
          />
        </div>
        {showWeather && (
          <Weather
            selectedCity={selectedCity}
            selectedCityJP={selectedCityJP}
          />
        )}
      </div>
    </div>
  );
};

export default App;
