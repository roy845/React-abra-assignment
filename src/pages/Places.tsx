import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setSelectedPlace } from "../features/placesSlice";
import { RootState } from "../app/store";
import { Helmet } from "react-helmet-async";
import PlacesList from "../components/PlacesList";
import PlacesMap from "../components/PlacesMap";
import { PlacesState } from "../types/places.types";

const Places = (): JSX.Element => {
  const { places, selectedPlace } = useAppSelector(
    (state: RootState): PlacesState => state.places
  );
  const dispatch = useAppDispatch();

  const pageTitle: string = "All Places";

  useEffect(() => {
    if (!selectedPlace && places.length > 0) {
      dispatch(setSelectedPlace(places[0]));
    }
  }, [places, selectedPlace, dispatch]);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div style={{ display: "flex", height: "500px" }}>
        <PlacesList />
        <div style={{ flex: 2 }}>
          <PlacesMap places={places} selectedPlace={selectedPlace} />
        </div>
      </div>
    </>
  );
};

export default Places;
