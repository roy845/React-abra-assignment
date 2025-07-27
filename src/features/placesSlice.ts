import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Place,
  PlaceFilterType,
  PlaceSortType,
  PlacesState,
} from "../types/places.types";
import { RootState } from "../app/store";
import { generateMockPlaces } from "../mock/mockPlaces";

const initialState: PlacesState = {
  places: generateMockPlaces() as Place[],
  selectedPlace: {} as Place,
  filterType: "all" as PlaceFilterType,
  sortBy: "createdAtDesc" as PlaceSortType,
};

export const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    addPlace(state, action: PayloadAction<Place>): void {
      state.places.push(action.payload);
    },
    setSelectedPlace(state, action: PayloadAction<Place>): void {
      state.selectedPlace = action.payload;
    },
    setFilterType(state, action: PayloadAction<PlaceFilterType>): void {
      state.filterType = action.payload;
    },
    setSortBy(state, action: PayloadAction<PlaceSortType>): void {
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
