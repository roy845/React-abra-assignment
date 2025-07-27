import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Place,
  PlaceFilterType,
  PlaceSortType,
  PlacesState,
} from "../types/places.types";
import { RootState } from "../app/store";

const initialState: PlacesState = {
  places: [] as Place[],
  selectedPlace: {} as Place,
  filterType: "all" as PlaceFilterType,
  sortBy: "createdAtDesc" as PlaceSortType,
};

export const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    addPlace(state, action: PayloadAction<Place>) {
      state.places.push(action.payload);
    },
    setSelectedPlace(state, action: PayloadAction<Place>) {
      state.selectedPlace = action.payload;
    },
    setFilterType(state, action: PayloadAction<PlaceFilterType>) {
      state.filterType = action.payload;
    },
    setSortBy(state, action: PayloadAction<PlaceSortType>) {
      state.sortBy = action.payload;
    },
  },
});

export const selectFilteredSortedPlaces = (state: RootState): Place[] => {
  const { places, filterType, sortBy } = state.places;

  let filtered: Place[] =
    filterType === "all"
      ? places
      : places.filter((p: Place) => p.type === filterType);

  if (sortBy === "createdAtDesc") {
    filtered = [...filtered].sort(
      (a: Place, b: Place) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  return filtered;
};

export const { addPlace, setSelectedPlace, setFilterType, setSortBy } =
  placesSlice.actions;
export default placesSlice.reducer;
