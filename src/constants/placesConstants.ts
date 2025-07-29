import { PlaceFilterType } from "../types/places.types";
import { Option } from "../components/CustomSelect";

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

export const placeTypeOptions: Option<PlaceFilterType>[] = [
  { label: "All", value: "all" as PlaceFilterType },
  ...placeTypes.map((type: PlaceEnum) => ({
    label: type[0].toLocaleUpperCase() + type.slice(1),
    value: type as PlaceFilterType,
  })),
];
