import { Place } from "../types/places.types";
import PlaceComponent from "./Place";
import PlacesNotFound from "./PlacesNotFound";

interface PlacesListProps {
  places: Place[];
  selectedPlace: Place;
}

const PlacesList = ({
  places,
  selectedPlace,
}: PlacesListProps): JSX.Element => (
  <ul className="list-none p-0 m-0">
    {places.length === 0 ? (
      <PlacesNotFound />
    ) : (
      places.map((place) => (
        <PlaceComponent
          key={place.id}
          place={place}
          isSelected={selectedPlace?.id === place.id}
        />
      ))
    )}
  </ul>
);

export default PlacesList;
