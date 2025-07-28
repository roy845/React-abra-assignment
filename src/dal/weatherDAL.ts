import { API_KEYS } from "../api/apiKeys";
import { URLS } from "../api/urls";
import { WeatherDataResponse } from "../types/weatherData.types";
import { HttpClient } from "../utils/httpClient";

const { OPENWEATHER_API_KEY } = API_KEYS;
const { WEATHER_URL_API } = URLS;

export class WeatherDAL {
  static fetchWeatherData = async (
    lat: number,
    lng: number
  ): Promise<WeatherDataResponse> => {
    return HttpClient.get<WeatherDataResponse>(WEATHER_URL_API, {
      lat,
      lon: lng,
      appid: OPENWEATHER_API_KEY,
      units: "metric",
    });
  };
}
