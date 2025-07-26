import { useAppSelector } from "../app/hooks";
import { Helmet } from "react-helmet-async";
import PlacesList from "../components/PlacesList";
import PlacesMap from "../components/PlacesMap";
import { selectPlaces, selectSelectedPlace } from "../features/placesSelectors";
import { Place } from "../types/places.types";
import { useAutoSelectFirstPlace } from "../hooks/useAutoSelectFirstPlace";

const Places = (): JSX.Element => {
  const places: Place[] = useAppSelector(selectPlaces);
  const selectedPlace: Place = useAppSelector(selectSelectedPlace);

  const pageTitle: string = "All Places";

  useAutoSelectFirstPlace(places, selectedPlace);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
        <PlacesList />
        <div className="flex-1">
          <PlacesMap places={places} selectedPlace={selectedPlace} />
        </div>
      </div>
    </>
  );
};

export default Places;
