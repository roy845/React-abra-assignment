export type PlaceType = "restaurant" | "hotel" | "park";

export type PlaceFilterType = "all" | PlaceType;

export enum PlaceEnum {
  RESTAURANT = "restaurant",
  HOTEL = "hotel",
  PARK = "park",
}

export type latLng = {
  lat: number;
  lng: number;
};

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
