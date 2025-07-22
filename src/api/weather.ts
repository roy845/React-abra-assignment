import axios from "axios";
import { WeatherDataResponse } from "../types/weatherData.types";
import { Place } from "../types/places.types";

const OPENWEATHER_API_KEY = "45017ea56ecca68d10012b50cec53ea5";
const weatherUrlApi = "https://api.openweathermap.org/data/2.5/forecast";

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
