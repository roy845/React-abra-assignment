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
    <div style={{ flex: 1, overflowY: "auto", borderRight: "1px solid #ccc" }}>
      <h3 className="text-center text-2xl text-blue-500">Places</h3>
      <div className="mb-[8px]">
        <CustomSelect
          label="Filter by type:"
          options={placeTypeOptions}
          value={filterType}
          onChange={setFilterType}
          className="border border-black cursor-pointer"
        />
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {sortedPlaces.length === 0 ? (
          <li style={{ padding: "8px", color: "#888", textAlign: "center" }}>
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
