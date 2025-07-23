import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Place } from "../types/places.types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addPlace } from "../features/placesSlice";
import { PlaceFormData, placeSchema } from "../schemas/create-place.schema";
import { RootState } from "../app/store";
import { PlaceUtils } from "../utils/placeUtils";
import ConfirmResetModal from "../components/ConfirmResetModal";
import { Helmet } from "react-helmet-async";
import Spinner from "../components/Spinner";
import { PlaceEnum, placeTypes } from "../constants/placesConstants";

const CreatePlace = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const places: Place[] = useAppSelector(
    (state: RootState) => state.places.places
  );

  const pageTitle: string = "Create Place";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PlaceFormData>({
    resolver: zodResolver(placeSchema),
    defaultValues: {
      type: PlaceEnum.RESTAURANT,
    },
  });

  const onSubmit = (data: PlaceFormData): void => {
    try {
      setLoading(true);
      const newPlaceWithIdAndCreationDate = {
        ...data,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };

      PlaceUtils.validateNewPlace(newPlaceWithIdAndCreationDate, places);

      setTimeout(() => {
        setLoading(false);
        dispatch(addPlace(newPlaceWithIdAndCreationDate));
        toast.success("Place created successfully!");
        navigate("/places");
      }, 2000);
    } catch (error: any) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong.");
      }
      setLoading(false);
    }
  };

  const handleResetForm = (): void => {
    setShowResetModal(true);
  };

  const confirmReset = (): void => {
    reset();
    toast.info("Form reset successfully!");
    setShowResetModal(false);
  };

  const cancelReset = (): void => {
    setShowResetModal(false);
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      <div className="min-h-screen pt-8 flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-6 bg-white"
        >
          <h2 className="text-3xl font-bold text-center text-blue-700">
            {pageTitle}
          </h2>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Name</label>
            <input
              {...register("name")}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Place Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">*{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              {...register("lat", { valueAsNumber: true })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. 32.0853"
            />
            {errors.lat && (
              <p className="text-red-500 text-sm">*{errors.lat.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              {...register("lng", { valueAsNumber: true })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="e.g. 34.7818"
            />
            {errors.lng && (
              <p className="text-red-500 text-sm">*{errors.lng.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">Type</label>
            <select
              {...register("type")}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white text-gray-900 cursor-pointer"
            >
              {placeTypes.map((type: PlaceEnum) => (
                <option key={type} value={type}>
                  {type[0].toLocaleUpperCase() + type.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">*{errors.type.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Address
            </label>
            <input
              {...register("address")}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="123 Main St, City, Country"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">*{errors.address.message}</p>
            )}
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 font-semibold rounded-lg shadow transition flex items-center justify-center ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {loading ? (
                <Spinner
                  size={20}
                  color="#ffffff"
                  fullHeight={false}
                  className="h-auto"
                />
              ) : (
                "Create Place"
              )}
            </button>

            <button
              type="button"
              onClick={handleResetForm}
              className="w-full py-2 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition"
            >
              Reset
            </button>
          </div>
        </form>
        <ConfirmResetModal
          isOpen={showResetModal}
          onConfirm={confirmReset}
          onCancel={cancelReset}
        />
      </div>
    </>
  );
};

export default CreatePlace;
