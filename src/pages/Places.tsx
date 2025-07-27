import { useAppSelector } from "../app/hooks";
import { Helmet } from "react-helmet-async";
import PlacesList from "../components/PlacesList";
import PlacesMap from "../components/PlacesMap";
import { selectFilteredSortedPlaces } from "../features/placesSlice";
import { Place } from "../types/places.types";
import { useAutoSelectFirstPlace } from "../hooks/useAutoSelectFirstPlace";
import { selectSelectedPlace } from "../features/placesSelectors";
import PlacesFilter from "../components/PlacesFilter";
import { PAGE_TITLES } from "../constants/pageTitles";

const Places = (): JSX.Element => {
  const places: Place[] = useAppSelector(selectFilteredSortedPlaces);
  const selectedPlace: Place = useAppSelector(selectSelectedPlace);

  useAutoSelectFirstPlace(places, selectedPlace);
  const { ALL_PLACES } = PAGE_TITLES;

  return (
    <>
      <Helmet>
        <title>{ALL_PLACES}</title>
      </Helmet>
      <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
        <div className="flex-1 overflow-y-auto border-r border-gray-300 bg-white h-full min-h-0">
          <h3 className="text-center text-2xl font-bold text-blue-600 mt-6 mb-2">
            Places
          </h3>
          <PlacesFilter />
          <PlacesList places={places} selectedPlace={selectedPlace} />
        </div>
        <div className="flex-1">
          <PlacesMap places={places} selectedPlace={selectedPlace} />
        </div>
      </div>
    </>
  );
};

export default Places;
