import { WeatherRepository } from "../repository/weatherRepository";
import { WeatherDataResponse } from "../types/weatherData.types";

export class WeatherService {
  static async fetchWeatherData(
    lat: number,
    lng: number
  ): Promise<WeatherDataResponse> {
    return WeatherRepository.fetchWeatherData(lat, lng);
  }
}
