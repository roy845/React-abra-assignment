export type WeatherListItem = {
  dt: number;
  main: {
    temp: number;
    pressure: number;
  };
};

export type WeatherDataResponse = {
  list: WeatherListItem[];
};
