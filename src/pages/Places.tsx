import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  ZoomControl,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  latLng,
  Place,
  PlaceFilterType,
  placeTypes,
} from "../types/places.types";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { setSelectedPlace } from "../features/placesSlice";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { Helmet } from "react-helmet-async";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function CenterMap({ lat, lng }: latLng) {
  const map = useMap();
  map.setView([lat, lng], map.getZoom());
  return null;
}

const Places = () => {
  const { places, selectedPlace } = useAppSelector(
    (state: RootState) => state.places
  );
  const [filterType, setFilterType] = useState<PlaceFilterType>("all");
  const dispatch = useAppDispatch();
  const navigate: NavigateFunction = useNavigate();

  const handleNavigateToWeatherData = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    place: Place
  ): void => {
    e.stopPropagation();
    dispatch(setSelectedPlace(place));
    navigate("/weatherData");
  };

  useEffect(() => {
    if (!selectedPlace && places.length > 0) {
      dispatch(setSelectedPlace(places[0]));
    }
  }, [places, selectedPlace, dispatch]);

  const filteredPlaces: Place[] =
    filterType === "all"
      ? places
      : places.filter((p: Place) => p.type === filterType);

  const sortedPlaces: Place[] = [...filteredPlaces].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <>
      <Helmet>
        <title>All Places</title>
      </Helmet>
      <div style={{ display: "flex", height: "500px" }}>
        <div
          style={{ flex: 1, overflowY: "auto", borderRight: "1px solid #ccc" }}
        >
          <h3 className="text-center text-2xl text-blue-500">Places</h3>
          <div className="mb-[8px]">
            <label>
              Filter by type:{" "}
              <select
                value={filterType}
                className="border border-black cursor-pointer"
                onChange={(e) =>
                  setFilterType(e.target.value as PlaceFilterType)
                }
              >
                <option value="all">All</option>
                {placeTypes.map((type: string) => (
                  <option className="cursor-pointer" key={type} value={type}>
                    {type[0].toLocaleUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {sortedPlaces.length === 0 ? (
              <li style={{ padding: "8px", color: "#888" }}>
                No places found.
              </li>
            ) : (
              sortedPlaces.map((place: Place) => (
                <li
                  key={place.id}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    background:
                      selectedPlace && selectedPlace.id === place.id
                        ? "#e0e0e0"
                        : "transparent",
                  }}
                  onClick={() => dispatch(setSelectedPlace(place))}
                >
                  {place.name} <br />
                  <small> {new Date(place.createdAt).toLocaleString()}</small>
                  <button
                    className="bg-transparent border-none cursor-pointer text-2xl ml-2 mt-5"
                    title="Show weather data"
                    onClick={(e) => handleNavigateToWeatherData(e, place)}
                  >
                    →
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
        <div style={{ flex: 2 }}>
          {selectedPlace &&
          selectedPlace.lat !== undefined &&
          selectedPlace.lng !== undefined &&
          !isNaN(+selectedPlace.lat) &&
          !isNaN(+selectedPlace.lng) ? (
            <MapContainer
              center={[+selectedPlace.lat, +selectedPlace.lng]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              zoomControl={false}
            >
              <ZoomControl position="topright" />
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {sortedPlaces.map((place: Place) =>
                place.lat !== undefined &&
                place.lng !== undefined &&
                !isNaN(+place.lat) &&
                !isNaN(+place.lng) ? (
                  <Marker key={place.id} position={[+place.lat, +place.lng]}>
                    <Popup>
                      <strong>{place.name}</strong>
                      <br />
                      <span style={{ color: "#888", fontSize: "0.9em" }}>
                        {new Date(place.createdAt).toLocaleString()}
                      </span>
                    </Popup>
                  </Marker>
                ) : null
              )}
              <CenterMap lat={+selectedPlace.lat} lng={+selectedPlace.lng} />
            </MapContainer>
          ) : (
            <div style={{ padding: 16 }}>Select a place to view the map.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Places;
