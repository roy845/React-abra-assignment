import { useEffect, useRef, useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { Place } from "../types/places.types";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectPlaces } from "../features/placesSelectors";
import { addPlace } from "../features/placesSlice";
import { PlaceFormData, placeSchema } from "../schemas/create-place.schema";
import { PlaceUtils } from "../utils/placeUtils";
import { ROUTES } from "../constants/routesConstants";
import { RouteUtils } from "../utils/routeUtils";
import { PlaceEnum } from "../constants/placesConstants";

interface UseCreatePlaceForm {
  loading: boolean;
  showResetModal: boolean;
  formMethods: UseFormReturn<PlaceFormData>;
  handleResetForm: () => void;
  confirmReset: () => void;
  cancelReset: () => void;
  onSubmit: (data: PlaceFormData) => void;
}

export const useCreatePlaceForm = (): UseCreatePlaceForm => {
  const [loading, setLoading] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();
  const places: Place[] = useAppSelector(selectPlaces);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formMethods = useForm<PlaceFormData>({
    resolver: zodResolver(placeSchema),
    defaultValues: { type: PlaceEnum.RESTAURANT },
  });

  const { reset } = formMethods;

  const onSubmit = (data: PlaceFormData): void => {
    try {
      setLoading(true);
      const newPlace: Place = {
        ...data,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };

      PlaceUtils.validateNewPlace(newPlace, places);

      timeoutRef.current = setTimeout(() => {
        setLoading(false);
        dispatch(addPlace(newPlace));
        toast.success("Place created successfully!");
        navigate(RouteUtils.buildRoute(ROUTES.PLACES));
      }, 2000);
    } catch (error: any) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
      setLoading(false);
    }
  };

  const handleResetForm = (): void => setShowResetModal(true);

  const confirmReset = (): void => {
    reset();
    toast.info("Form reset successfully!");
    setShowResetModal(false);
  };

  const cancelReset = (): void => setShowResetModal(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    loading,
    showResetModal,
    formMethods,
    handleResetForm,
    confirmReset,
    cancelReset,
    onSubmit,
  };
};
