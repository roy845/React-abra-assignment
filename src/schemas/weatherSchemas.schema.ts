import { z } from "zod";

export const weatherQuerySchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

export type WeatherQueryParams = z.infer<typeof weatherQuerySchema>;
