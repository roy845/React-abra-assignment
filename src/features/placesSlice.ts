import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Place, PlacesState } from "../types/places.types";

const initialState: PlacesState = {
  places: [] as Place[],
  selectedPlace: {} as Place,
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
  },
});

export const { addPlace, setSelectedPlace } = placesSlice.actions;
export default placesSlice.reducer;
