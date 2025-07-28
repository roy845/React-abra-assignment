import { WeatherDAL } from "../dal/weatherDAL";
import {
  WeatherQueryParams,
  weatherQuerySchema,
} from "../schemas/weatherSchemas.schema";
import { WeatherDataResponse } from "../types/weatherData.types";

export class WeatherRepository {
  static async fetchWeatherData(
    lat: number,
    lng: number
  ): Promise<WeatherDataResponse> {
    const validated: WeatherQueryParams = weatherQuerySchema.parse({
      lat,
      lng,
    });

    return WeatherDAL.fetchWeatherData(validated.lat, validated.lng);
  }
}
