import axios from "axios";
import { WeatherDataResponse } from "../types/weatherData.types";
import { Place } from "../types/places.types";
import { URLS } from "./urls";
import { API_KEYS } from "./apiKeys";

const { OPENWEATHER_API_KEY } = API_KEYS;
const { weatherUrlApi } = URLS;

export const fetchWeatherData = async (
  place: Place
): Promise<WeatherDataResponse> => {
  const { data } = await axios.get<WeatherDataResponse>(weatherUrlApi, {
    params: {
      lat: place.lat,
      lon: place.lng,
      appid: OPENWEATHER_API_KEY,
      units: "metric",
    },
  });

  return data;
};
