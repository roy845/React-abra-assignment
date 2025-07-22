export type WeatherListItem = {
  dt: number;
  main: {
    temp: number;
    pressure: number;
  };
};

export type WeatherDataResponse = {
  list: WeatherListItem[];
  // Add other properties if you use them (e.g., city, cod, etc.)
};
