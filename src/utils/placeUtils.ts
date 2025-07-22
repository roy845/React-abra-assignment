import { Place } from "../types/places.types";

export class PlaceUtils {
  static validateNewPlace(place: Place, existingPlaces: Place[]): void {
    const existsByNameAndAddress: boolean = existingPlaces.some(
      (p: Place) =>
        p.name.toLowerCase().trim() === place.name.toLowerCase().trim() &&
        p.address.toLowerCase().trim() === place.address.toLowerCase().trim()
    );

    if (existsByNameAndAddress) {
      throw new Error("Place with the same name and address already exists.");
    }

    const existsByCoordinates: boolean = existingPlaces.some(
      (p: Place) => p.lat === place.lat && p.lng === place.lng
    );

    if (existsByCoordinates) {
      throw new Error(
        "Place with the same latitude and longitude already exists."
      );
    }
  }
}
