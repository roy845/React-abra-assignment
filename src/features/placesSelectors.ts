import { RootState } from "../app/store";
import { Place } from "../types/places.types";

export const selectPlaces: (state: RootState) => Place[] = (
  state: RootState
): Place[] => state.places.places;

export const selectSelectedPlace: (state: RootState) => Place = (
  state: RootState
): Place => state.places.selectedPlace;
