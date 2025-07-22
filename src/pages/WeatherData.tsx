import { useSelector } from "react-redux";
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
import { WeatherListItem } from "../types/weatherData.types";
import { Helmet } from "react-helmet-async";
import { useWeatherData } from "../queries/weatherQueries";
import { Place } from "../types/places.types";
import Spinner from "../components/Spinner";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const WeatherData = () => {
  const selectedPlace: Place = useSelector(
    (state: RootState) => state.places.selectedPlace
  );

  const {
    data: weatherData,
    isLoading,
    isError,
    error,
  } = useWeatherData(selectedPlace);

  if (!selectedPlace)
    return (
      <div className="text-center text-red-500">
        Select a place to see weather data.
      </div>
    );

  if (isLoading) return <Spinner />;

  if (isError)
    return (
      <div className="text-center text-red-500">
        {(error as Error).message || "Failed to fetch weather data"}
      </div>
    );

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
