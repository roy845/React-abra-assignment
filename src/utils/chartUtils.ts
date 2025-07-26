import { WeatherListItem } from "../types/weatherData.types";

export class ChartUtils {
  static buildWeatherChartData(list: WeatherListItem[]) {
    return {
      labels: list.map((item: WeatherListItem) =>
        new Date(item.dt * 1000).toLocaleString()
      ),
      datasets: [
        {
          label: "Temperature (°C)",
          data: list.map((item) => item.main.temp),
          borderColor: "rgba(75,192,192,1)",
          fill: false,
          yAxisID: "y-temp",
        },
        {
          label: "Pressure (hPa)",
          data: list.map((item) => item.main.pressure),
          borderColor: "rgba(255,99,132,1)",
          fill: false,
          yAxisID: "y-pressure",
        },
      ],
    };
  }
}

export const weatherChartOptions = {
  responsive: true,
  interaction: { mode: "index" as const, intersect: false },
  scales: {
    "y-temp": {
      type: "linear" as const,
      position: "left" as const,
      title: { display: true, text: "Temperature (°C)" },
    },
    "y-pressure": {
      type: "linear" as const,
      position: "right" as const,
      title: { display: true, text: "Pressure (hPa)" },
      grid: { drawOnChartArea: false },
    },
  },
};
