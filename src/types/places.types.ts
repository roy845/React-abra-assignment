export type PlaceType = "restaurant" | "hotel" | "park";

export type PlaceFilterType = "all" | PlaceType;

export type LatLng = {
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
