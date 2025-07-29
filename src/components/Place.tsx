import { Place as PlaceType } from "../types/places.types";
import { usePlaceCardHandlers } from "../hooks/usePlaceCardHandlers";

interface PlaceProps {
  place: PlaceType;
  isSelected: boolean;
}

const Place = ({ place, isSelected }: PlaceProps): JSX.Element => {
  const { handleClick, handleNavigateToWeatherData } =
    usePlaceCardHandlers(place);

  return (
    <li
      className={`p-4 cursor-pointer rounded-lg transition-colors duration-200
        ${isSelected ? "bg-gray-200" : "hover:bg-gray-50"}
        flex flex-col gap-2 items-start`}
      onClick={handleClick}
      tabIndex={0}
    >
      <span className="font-medium text-lg text-gray-800">{place.name}</span>
      <span className="text-gray-600 text-sm">{place.address}</span>
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
