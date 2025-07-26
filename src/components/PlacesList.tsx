import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { Place, PlaceFilterType, PlacesState } from "../types/places.types";
import PlaceComponent from "./Place";
import CustomSelect, { Option } from "./CustomSelect";
import { RootState } from "../app/store";
import { placeTypes } from "../constants/placesConstants";

const placeTypeOptions: Option<PlaceFilterType>[] = [
  { label: "All", value: "all" as PlaceFilterType },
  ...placeTypes.map((type: string) => ({
    label: type[0].toLocaleUpperCase() + type.slice(1),
    value: type as PlaceFilterType,
  })),
];

const PlacesList = (): JSX.Element => {
  const { places, selectedPlace } = useAppSelector(
    (state: RootState): PlacesState => state.places
  );
  const [filterType, setFilterType] = useState<PlaceFilterType>("all");

  const filteredPlaces: Place[] =
    filterType === "all"
      ? places
      : places.filter((p: Place) => p.type === filterType);

  const sortedPlaces: Place[] = [...filteredPlaces].sort(
    (a: Place, b: Place) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="flex-1 overflow-y-auto border-r border-gray-300 bg-white h-full min-h-0">
      <h3 className="text-center text-2xl font-bold text-blue-600 mt-6 mb-2">
        Places
      </h3>
      <div className="mb-4 px-4">
        <CustomSelect
          label="Filter by type:"
          options={placeTypeOptions}
          value={filterType}
          onChange={setFilterType}
          className="border border-gray-400 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none cursor-pointer w-full"
        />
      </div>
      <ul className="list-none p-0 m-0">
        {sortedPlaces.length === 0 ? (
          <li className="py-6 px-2 text-gray-400 text-center select-none">
            No places found.
          </li>
        ) : (
          sortedPlaces.map((place: Place) => (
            <PlaceComponent
              key={place.id}
              place={place}
              isSelected={selectedPlace?.id === place.id}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default PlacesList;
