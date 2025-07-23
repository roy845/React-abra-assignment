export enum PlaceEnum {
  RESTAURANT = "restaurant",
  HOTEL = "hotel",
  PARK = "park",
}

export const placeTypes: readonly [PlaceEnum, PlaceEnum, PlaceEnum] = [
  PlaceEnum.RESTAURANT,
  PlaceEnum.HOTEL,
  PlaceEnum.PARK,
] as const;
