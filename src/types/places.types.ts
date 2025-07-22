export type PlaceType = "restaurant" | "hotel" | "park";

export enum PlaceEnum {
  RESTAURANT = "Restaurant",
  HOTEL = "Hotel",
  PARK = "Park",
}

export type Place = {
  id: string;
  name: string;
  type: PlaceType;
  lat: number;
  lng: number;
  address: string;
  createdAt: string;
};

export type PlacesState = {
  places: Place[];
  selectedPlace: Place;
};

export const placeTypes: [string, string, string] = [
  PlaceEnum.RESTAURANT,
  PlaceEnum.HOTEL,
  PlaceEnum.PARK,
];
