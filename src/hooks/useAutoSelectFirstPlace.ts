import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { Place } from "../types/places.types";
import { setSelectedPlace } from "../features/placesSlice";

export const useAutoSelectFirstPlace = (
  places: Place[],
  selected?: Place
): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!selected && places.length > 0) {
      dispatch(setSelectedPlace(places[0]));
    }
  }, [places, selected, dispatch]);
};
