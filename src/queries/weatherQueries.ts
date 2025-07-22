import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { WeatherDataResponse } from "../types/weatherData.types";
import { Place } from "../types/places.types";
import { fetchWeatherData } from "../api/weather";

export const useWeatherData = (
  place: Place | null
): UseQueryResult<WeatherDataResponse, Error> =>
  useQuery({
    queryKey: ["weatherData", place?.lat, place?.lng],
    queryFn: () => {
      if (!place) throw new Error("No place selected");
      return fetchWeatherData(place);
    },
    enabled: !!place,
  });
