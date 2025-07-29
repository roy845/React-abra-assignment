import { useAppDispatch, useAppSelector } from "../app/hooks";
import { placeTypeOptions } from "../constants/placesConstants";
import { selectFilterType } from "../features/placesSelectors";
import { setFilterType } from "../features/placesSlice";
import { PlaceFilterType } from "../types/places.types";
import CustomSelect from "./CustomSelect";

const PlacesFilter = (): JSX.Element => {
  const filterType: PlaceFilterType = useAppSelector(selectFilterType);
  const dispatch = useAppDispatch();

  return (
    <div className="mb-4 px-4">
      <CustomSelect
        label="Filter by type:"
        options={placeTypeOptions}
        value={filterType}
        onChange={(type: PlaceFilterType) => dispatch(setFilterType(type))}
        className="border border-gray-400 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-400 focus:outline-none cursor-pointer w-full"
      />
    </div>
  );
};

export default PlacesFilter;
