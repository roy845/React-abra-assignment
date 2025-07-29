import { z } from "zod";
import { latSchema, lngSchema } from "./sharedSchemas.schemas";

export const weatherQuerySchema = z.object({
  lat: latSchema,
  lng: lngSchema,
});

export type WeatherQueryParams = z.infer<typeof weatherQuerySchema>;
