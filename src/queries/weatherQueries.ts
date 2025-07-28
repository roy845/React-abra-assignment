import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { WeatherDataResponse } from "../types/weatherData.types";
import { Place } from "../types/places.types";
import { WeatherService } from "../service/weatherService";

export const useWeatherData = (
  place: Place | null
): UseQueryResult<WeatherDataResponse, Error> =>
  useQuery({
    queryKey: ["weatherData", place?.lat, place?.lng],
    queryFn: async () => {
      if (!place) throw new Error("No place selected");
      try {
        return await WeatherService.fetchWeatherData(place.lat, place.lng);
      } catch (err: any) {
        if (err.name === "ZodError") {
          throw new Error("Invalid coordinates");
        }
        throw err;
      }
    },
    enabled: !!place,
  });
