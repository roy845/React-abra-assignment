import { UseFormRegister, FieldErrors } from "react-hook-form";
import { PlaceFormData } from "../schemas/create-place.schema";
import { PlaceEnum, placeTypes } from "../constants/placesConstants";
import { PlaceUtils } from "../utils/placeUtils";

interface Props {
  register: UseFormRegister<PlaceFormData>;
  errors: FieldErrors<PlaceFormData>;
  loading: boolean;
}

const CreatePlaceFormFields = ({ register, errors, loading }: Props) => (
  <>
    <div>
      <label className="block mb-1 text-gray-700 font-medium">Name</label>
      <input
        {...register("name")}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Place Name"
        disabled={loading}
      />
      {errors.name && (
        <p className="text-red-500 text-sm">*{errors.name.message}</p>
      )}
    </div>

    <div>
      <label className="block mb-1 text-gray-700 font-medium">Latitude</label>
      <input
        type="number"
        step="any"
        {...register("lat", { valueAsNumber: true })}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="e.g. 32.0853"
        disabled={loading}
      />
      {errors.lat && (
        <p className="text-red-500 text-sm">*{errors.lat.message}</p>
      )}
    </div>

    <div>
      <label className="block mb-1 text-gray-700 font-medium">Longitude</label>
      <input
        type="number"
        step="any"
        {...register("lng", { valueAsNumber: true })}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="e.g. 34.7818"
        disabled={loading}
      />
      {errors.lng && (
        <p className="text-red-500 text-sm">*{errors.lng.message}</p>
      )}
    </div>

    <div>
      <label className="block mb-1 text-gray-700 font-medium">Type</label>
      <select
        {...register("type")}
        disabled={loading}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white text-gray-900 cursor-pointer"
      >
        {placeTypes.map((type: PlaceEnum) => (
          <option key={type} value={type}>
            {PlaceUtils.formatEnum(type)}
          </option>
        ))}
      </select>
      {errors.type && (
        <p className="text-red-500 text-sm">*{errors.type.message}</p>
      )}
    </div>

    <div>
      <label className="block mb-1 text-gray-700 font-medium">Address</label>
      <input
        {...register("address")}
        disabled={loading}
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="123 Main St, City, Country"
      />
      {errors.address && (
        <p className="text-red-500 text-sm">*{errors.address.message}</p>
      )}
    </div>
  </>
);

export default CreatePlaceFormFields;
