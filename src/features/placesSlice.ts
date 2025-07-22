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
      const { name, address } = action.payload;
      const exists: boolean = state.places.some(
        (place) =>
          place.name.toLowerCase() === name.toLowerCase().trim() &&
          place.address.toLowerCase() === address.toLowerCase().trim()
      );
      if (!exists) {
        state.places.push(action.payload);
      } else {
        throw new Error("Place with the same name and address already exists.");
      }
    },
    setSelectedPlace(state, action: PayloadAction<Place>) {
      state.selectedPlace = action.payload;
    },
  },
});

export const { addPlace, setSelectedPlace } = placesSlice.actions;
export default placesSlice.reducer;
