import { z } from "zod";
import { PlaceEnum } from "../constants/placesConstants";

export const placeSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(25, "Name should be 25 characters or less"),
  lat: z
    .number({ invalid_type_error: "Latitude is required" })
    .min(-90, "Latitude must be between -90 and 90")
    .max(90, "Latitude must be between -90 and 90"),
  lng: z
    .number({ invalid_type_error: "Longitude is required" })
    .min(-180, "Longitude must be between -180 and 180")
    .max(180, "Longitude must be between -180 and 180"),
  type: z.nativeEnum(PlaceEnum),
  address: z.string().min(1, "Address is required"),
});

export type PlaceFormData = z.infer<typeof placeSchema>;
