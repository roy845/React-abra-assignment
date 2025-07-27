import { useAppSelector, useAppDispatch } from "../app/hooks";
import { Helmet } from "react-helmet-async";
import PlacesList from "../components/PlacesList";
import PlacesMap from "../components/PlacesMap";
import CustomSelect, { Option } from "../components/CustomSelect";
import {
  selectFilteredSortedPlaces,
  setFilterType,
} from "../features/placesSlice";
import { Place, PlaceFilterType } from "../types/places.types";
import { placeTypes } from "../constants/placesConstants";
import { useAutoSelectFirstPlace } from "../hooks/useAutoSelectFirstPlace";
import {
  selectFilterType,
  selectSelectedPlace,
} from "../features/placesSelectors";

const placeTypeOptions: Option<PlaceFilterType>[] = [
  { label: "All", value: "all" as PlaceFilterType },
  ...placeTypes.map((type) => ({
    label: type[0].toLocaleUpperCase() + type.slice(1),
    value: type as PlaceFilterType,
  })),
];

const Places = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const places: Place[] = useAppSelector(selectFilteredSortedPlaces);
  const selectedPlace: Place = useAppSelector(selectSelectedPlace);
  const filterType: PlaceFilterType = useAppSelector(selectFilterType);

  useAutoSelectFirstPlace(places, selectedPlace);

  const pageTitle: string = "All Places";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)]">
        <div className="flex-1 overflow-y-auto border-r border-gray-300 bg-white h-full min-h-0">
          <h3 className="text-center text-2xl font-bold text-blue-600 mt-6 mb-2">
            Places
          </h3>
          <div className="mb-4 px-4">
            <CustomSelect
              label="Filter by type:"
              options={placeTypeOptions}
              value={filterType}
              onChange={(type: PlaceFilterType) =>
                dispatch(setFilterType(type))
              }
              className="border border-gray-400 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none cursor-pointer w-full"
            />
          </div>
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
