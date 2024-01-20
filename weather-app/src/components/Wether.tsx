import { useEffect, useState } from "react";

type WeatherProps = {
  selectedCity: string;
  selectedCityJP: any;
};

export const FetchWeather = (props: any) => {
  const { selectedCity, selectedCityJP } = props;
  const [area, setArea] = useState<any>(null);
  let code = "";

  if (selectedCity === "tokyo") {
    code = "130000";
  } else if (selectedCity === "osaka") {
    code = "270000";
  }

  // 状態とエラーハンドリングを追加
  const [weather, setWeather] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://www.jma.go.jp/bosai/forecast/data/forecast/${code}.json`)
      .then((res) => res.json())
      .then((json) => {
        setWeather(json[0]);
        setArea(json[0].timeSeries[0].areas[0]);
      })
      .catch(() => setError("error"));
  }, [code]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weather) {
    return <div>Loading...</div>;
  }

  // データがロードされたら表示
  return (
    <div>
      <h2 className="mt-3 text-xl font-semibold">{selectedCityJP}の天気予報</h2>
      <table className="mt-1">
        <tbody>
          <tr className="border-b">
            <td className="py-2">発表元:</td>
            <td className="py-2 pl-2">
              {JSON.stringify(weather.publishingOffice)}
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-2">報告日時:</td>
            <td className="py-2 pl-2">
              {JSON.stringify(weather.reportDatetime)}
            </td>
          </tr>
          <tr className="border-b">
            <td className="py-2">場所:</td>
            <td className="py-2 pl-2">{JSON.stringify(area.area.name)}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2">今日の天気:</td>
            <td className="py-2 pl-2">{JSON.stringify(area.weathers[0])}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2">明日の天気:</td>
            <td className="py-2 pl-2">{JSON.stringify(area.weathers[1])}</td>
          </tr>
          <tr className="border-b">
            <td className="py-2">明後日の天気:</td>
            <td className="py-2 pl-2">{JSON.stringify(area.weathers[2])}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export const Weather = ({ selectedCity, selectedCityJP }: WeatherProps) => {
  return (
    <FetchWeather selectedCity={selectedCity} selectedCityJP={selectedCityJP} />
  );
};
