import { Place } from "../types/places.types";

export class PlaceUtils {
  static validateNewPlace(place: Place, existingPlaces: Place[]): void {
    const existsByNameAndAddress: boolean = existingPlaces.some(
      (p: Place): boolean =>
        p.name.toLowerCase().trim() === place.name.toLowerCase().trim() &&
        p.address.toLowerCase().trim() === place.address.toLowerCase().trim()
    );

    if (existsByNameAndAddress) {
      throw new Error("Place with the same name and address already exists.");
    }

    const existsByCoordinates: boolean = existingPlaces.some(
      (p: Place): boolean => p.lat === place.lat && p.lng === place.lng
    );

    if (existsByCoordinates) {
      throw new Error(
        "Place with the same latitude and longitude already exists."
      );
    }
  }
  static formatEnum = (value: string): string =>
    value[0].toUpperCase() + value.slice(1).toLowerCase();
}
