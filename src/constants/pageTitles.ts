import { Place } from "../types/places.types";

export const PAGE_TITLES = {
  CREATE_PLACE_PAGE_TITLE: "Create Place +",
  ALL_PLACES: "All Places",
  WEATHER_DATA: (place?: Place | null) =>
    place ? `Weather Data - ${place.name}` : "Weather Data",
  NOT_FOUND: "404 - Not Found",
};
