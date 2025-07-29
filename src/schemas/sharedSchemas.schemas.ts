import { z } from "zod";

export const latSchema = z
  .number({ invalid_type_error: "Latitude is required" })
  .min(-90, "Latitude must be between -90 and 90")
  .max(90, "Latitude must be between -90 and 90");

export const lngSchema = z
  .number({ invalid_type_error: "Longitude is required" })
  .min(-180, "Longitude must be between -180 and 180")
  .max(180, "Longitude must be between -180 and 180");
