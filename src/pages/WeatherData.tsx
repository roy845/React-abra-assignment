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
import { Helmet } from "react-helmet-async";
import { useWeatherData } from "../queries/weatherQueries";
import { Place } from "../types/places.types";
import Spinner from "../components/Spinner";
import { ChartUtils, weatherChartOptions } from "../utils/chartUtils";
import { selectSelectedPlace } from "../features/placesSelectors";
import { PAGE_TITLES } from "../constants/pageTitles";
import EmptyStateMessage from "../components/EmptyStateMessage";
import ErrorMessage from "../components/ErrorMessage";
import { NavigateFunction, useNavigate } from "react-router-dom";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const WeatherData = (): JSX.Element | null => {
  const selectedPlace: Place = useSelector(selectSelectedPlace);
  const navigate: NavigateFunction = useNavigate();
  const {
    data: weatherData,
    isLoading,
    isError,
    error,
  } = useWeatherData(selectedPlace);

  if (!selectedPlace)
    return <EmptyStateMessage message="Select a place to see weather data." />;

  const { WEATHER_DATA: weatherDataPageTitle } = PAGE_TITLES;

  const pageTitle = weatherDataPageTitle(selectedPlace);

  if (isLoading) return <Spinner />;

  if (isError)
    return (
      <ErrorMessage
        message={(error as Error).message || "Failed to fetch weather data"}
      />
    );

  if (!weatherData || !weatherData.list || !weatherData.list.length)
    return (
      <EmptyStateMessage message="No weather data available for this place." />
    );

  const chartData = ChartUtils.buildWeatherChartData(weatherData.list);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-5 mt-5">
        {pageTitle}
      </h2>
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="relative h-[250px] sm:h-[350px] md:h-[400px]">
          <Line
            data={chartData}
            options={{
              ...weatherChartOptions,
              maintainAspectRatio: false,
              responsive: true,
            }}
          />
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default WeatherData;
