export const CitySelect = (props: any) => {
  const {
    setSelectedCity,
    setShowWeather,
    setSelectedCityJP,
    city_en,
    city_jp,
  } = props;

  const radioSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCity(event.target.value);
    setShowWeather(true);
    setSelectedCityJP(city_jp);
  };

  return (
    <div>
      <input
        type="radio"
        id={city_en}
        name="city"
        value={city_en}
        onChange={(event) => {
          radioSelect(event);
        }}
      />
      <label htmlFor={city_en}>{city_jp}</label>
    </div>
  );
};
