import { z } from "zod";
import { PlaceEnum } from "../constants/placesConstants";
import { latSchema, lngSchema } from "./sharedSchemas.schemas";

export const placeSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(25, "Name should be 25 characters or less"),
  lat: latSchema,
  lng: lngSchema,
  type: z.nativeEnum(PlaceEnum),
  address: z.string().min(1, "Address is required"),
});

export type PlaceFormData = z.infer<typeof placeSchema>;
