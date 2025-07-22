import { Place } from "../types/places.types";
export class PlaceUtils {
  static validateNewPlace(place: Place, existingPlaces: Place[]) {
    const exists = existingPlaces.some(
      (p: Place) =>
        p.name.toLowerCase().trim() === place.name.toLowerCase().trim() &&
        p.address.toLowerCase().trim() === place.address.toLowerCase().trim()
    );

    if (exists) {
      throw new Error("Place with the same name and address already exists.");
    }
  }
}
