import { RootState } from "../app/store";
import { Place, PlaceFilterType } from "../types/places.types";

export const selectPlaces: (state: RootState) => Place[] = (
  state: RootState
): Place[] => state.places.places;

export const selectSelectedPlace: (state: RootState) => Place = (
  state: RootState
): Place => state.places.selectedPlace;

export const selectFilterType: (state: RootState) => PlaceFilterType = (
  state: RootState
): PlaceFilterType => state.places.filterType;
