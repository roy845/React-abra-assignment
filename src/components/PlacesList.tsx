import { Place } from "../types/places.types";
import PlaceComponent from "./Place";
import EmptyStateMessage from "./EmptyStateMessage";

interface PlacesListProps {
  places: Place[];
  selectedPlace: Place;
}

const PlacesList = ({
  places,
  selectedPlace,
}: PlacesListProps): JSX.Element => {
  if (places.length === 0) {
    return <EmptyStateMessage message="No places found." />;
  }

  return (
    <ul className="list-none p-0 m-0">
      {places.map((place: Place) => (
        <PlaceComponent
          key={place.id}
          place={place}
          isSelected={selectedPlace?.id === place.id}
        />
      ))}
    </ul>
  );
};

export default PlacesList;
