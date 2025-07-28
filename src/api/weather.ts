import axios from "axios";
import { WeatherDataResponse } from "../types/weatherData.types";
import { Place } from "../types/places.types";
import { URLS } from "./urls";
import { API_KEYS } from "./apiKeys";

const { OPENWEATHER_API_KEY } = API_KEYS;
const { WEATHER_URL_API } = URLS;

export const fetchWeatherData = async (
  place: Place
): Promise<WeatherDataResponse> => {
  const { data } = await axios.get<WeatherDataResponse>(WEATHER_URL_API, {
    params: {
      lat: place.lat,
      lon: place.lng,
      appid: OPENWEATHER_API_KEY,
      units: "metric",
    },
  });

  return data;
};
