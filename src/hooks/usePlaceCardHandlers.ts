import { useAppDispatch } from "../app/hooks";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { setSelectedPlace } from "../features/placesSlice";
import { Place } from "../types/places.types";
import { ROUTES } from "../constants/routesConstants";
import { RouteUtils } from "../utils/routeUtils";

interface UsePlaceCardHandlersResult {
  handleClick: () => void;
  handleNavigateToWeatherData: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export const usePlaceCardHandlers = (
  place: Place
): UsePlaceCardHandlersResult => {
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { WEATHER_DATA } = ROUTES;

  const handleClick = (): void => {
    dispatch(setSelectedPlace(place));
  };

  const handleNavigateToWeatherData = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    dispatch(setSelectedPlace(place));
    navigate(RouteUtils.buildRoute(WEATHER_DATA));
  };

  return { handleClick, handleNavigateToWeatherData };
};
