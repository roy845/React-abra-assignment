import { Place as PlaceType } from "../types/places.types";
import { useAppDispatch } from "../app/hooks";
import { setSelectedPlace } from "../features/placesSlice";
import { NavigateFunction, useNavigate } from "react-router-dom";

interface PlaceProps {
  place: PlaceType;
  isSelected: boolean;
}

const Place = ({ place, isSelected }: PlaceProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const handleClick = (): void => {
    dispatch(setSelectedPlace(place));
  };

  const handleNavigateToWeatherData = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    dispatch(setSelectedPlace(place));
    navigate("/weatherData");
  };

  return (
    <li
      className={`p-4 cursor-pointer rounded-lg transition-colors duration-200
        ${isSelected ? "bg-gray-200" : "hover:bg-gray-50"}
        flex flex-col gap-2 items-start`}
      onClick={handleClick}
      tabIndex={0}
    >
      <span className="font-medium text-lg text-gray-800">{place.name}</span>
      <small className="text-gray-500">
        {new Date(place.createdAt).toLocaleString()}
      </small>
      <button
        type="button"
        className="self-end mt-2 text-blue-600 hover:text-blue-800 text-xl transition"
        title="Show weather data"
        onClick={handleNavigateToWeatherData}
        tabIndex={-1}
        aria-label={`Show weather data for ${place.name}`}
      >
        <span aria-hidden="true">→</span>
      </button>
    </li>
  );
};

export default Place;
