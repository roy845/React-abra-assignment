import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { WeatherDataResponse } from "../types/weatherData.types";
import { Place } from "../types/places.types";
import { WeatherService } from "../service/weatherService";

export const useWeatherData = (
  place: Place | null
): UseQueryResult<WeatherDataResponse, Error> =>
  useQuery({
    queryKey: ["weatherData", place?.lat, place?.lng],
    queryFn: () => {
      if (!place) throw new Error("No place selected");
      try {
        return WeatherService.fetchWeatherData(place.lat, place.lng);
      } catch (error: any) {
        throw error;
      }
    },
    enabled: !!place,
  });
