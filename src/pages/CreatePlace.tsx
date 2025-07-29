import { useEffect, useRef, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Place } from "../types/places.types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addPlace } from "../features/placesSlice";
import { PlaceFormData, placeSchema } from "../schemas/create-place.schema";
import { PlaceUtils } from "../utils/placeUtils";
import ConfirmResetModal from "../components/modal/ConfirmResetModal";
import { Helmet } from "react-helmet-async";
import { PlaceEnum } from "../constants/placesConstants";
import { selectPlaces } from "../features/placesSelectors";
import { PAGE_TITLES } from "../constants/pageTitles";
import { ROUTES } from "../constants/routesConstants";
import AppInfoModal from "../components/modal/AppInfoModal";
import CreatePlaceFormButtons from "../components/CreatePlaceFormButtons";
import CreatePlaceFormFields from "../components/CreatePlaceFormFields";
import { RouteUtils } from "../utils/routeUtils";

const CreatePlace = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showResetModal, setShowResetModal] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const places: Place[] = useAppSelector(selectPlaces);
  const timeoutRef: React.MutableRefObject<NodeJS.Timeout | null> =
    useRef<NodeJS.Timeout | null>(null);

  const { CREATE_PLACE_PAGE_TITLE } = PAGE_TITLES;
  const { PLACES } = ROUTES;

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
      const newPlaceWithIdAndCreationDate: Place = {
        ...data,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };

      PlaceUtils.validateNewPlace(newPlaceWithIdAndCreationDate, places);

      timeoutRef.current = setTimeout(() => {
        setLoading(false);
        dispatch(addPlace(newPlaceWithIdAndCreationDate));
        toast.success("Place created successfully!");
        navigate(RouteUtils.buildRoute(PLACES));
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

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{CREATE_PLACE_PAGE_TITLE}</title>
      </Helmet>

      <AppInfoModal />

      <div className="min-h-screen pt-8 flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 rounded-2xl shadow-xl w-full max-w-sm space-y-6 bg-white"
        >
          <h2 className="text-3xl font-bold text-center text-blue-700">
            {CREATE_PLACE_PAGE_TITLE}
          </h2>

          <CreatePlaceFormFields
            register={register}
            errors={errors}
            loading={loading}
          />

          <CreatePlaceFormButtons
            loading={loading}
            onResetClick={handleResetForm}
          />
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
