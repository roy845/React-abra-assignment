import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { RootState } from "../app/store";
import {
  WeatherDataResponse,
  WeatherListItem,
} from "../types/weatherData.types";
import { Place } from "../types/places.types";
import { Helmet } from "react-helmet-async";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const OPENWEATHER_API_KEY = "45017ea56ecca68d10012b50cec53ea5";

const WeatherData = () => {
  const selectedPlace: Place = useSelector(
    (state: RootState) => state.places.selectedPlace
  );
  const [weatherData, setWeatherData] = useState<WeatherDataResponse | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!selectedPlace) return;
      setLoading(true);
      setError(null);
      setWeatherData(null);
      try {
        const { data } = await axios.get<WeatherDataResponse>(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedPlace.lat}&lon=${selectedPlace.lng}&appid=${OPENWEATHER_API_KEY}&units=metric`
        );

        setWeatherData(data);
      } catch (error) {
        setError("Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, [selectedPlace]);

  if (!selectedPlace)
    return (
      <div className="text-center text-red-500">
        Select a place to see weather data.
      </div>
    );
  if (loading)
    return <div className="text-center">Loading weather data...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!weatherData || !weatherData.list) return null;

  const chartData = {
    labels: weatherData.list.map((item: WeatherListItem) =>
      new Date(item.dt * 1000).toLocaleString()
    ),
    datasets: [
      {
        label: "Temperature (°C)",
        data: weatherData.list.map((item: WeatherListItem) => item.main.temp),
        borderColor: "rgba(75,192,192,1)",
        fill: false,
        yAxisID: "y-temp",
      },
      {
        label: "Pressure (hPa)",
        data: weatherData.list.map(
          (item: WeatherListItem) => item.main.pressure
        ),
        borderColor: "rgba(255,99,132,1)",
        fill: false,
        yAxisID: "y-pressure",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    interaction: { mode: "index" as const, intersect: false },
    scales: {
      "y-temp": {
        type: "linear" as const,
        position: "left" as const,
        title: { display: true, text: "Temperature (°C)" },
      },
      "y-pressure": {
        type: "linear" as const,
        position: "right" as const,
        title: { display: true, text: "Pressure (hPa)" },
        grid: { drawOnChartArea: false },
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Weather Data - {selectedPlace.name}</title>
      </Helmet>
      <Line data={chartData} options={chartOptions} height={200} />
    </>
  );
};

export default WeatherData;
