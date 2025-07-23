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
      style={{
        padding: "8px",
        cursor: "pointer",
        background: isSelected ? "#e0e0e0" : "transparent",
      }}
      onClick={handleClick}
    >
      {place.name} <br />
      <small>{new Date(place.createdAt).toLocaleString()}</small>
      <button
        className="bg-transparent border-none cursor-pointer text-2xl ml-2 mt-5"
        title="Show weather data"
        onClick={handleNavigateToWeatherData}
      >
        →
      </button>
    </li>
  );
};

export default Place;
