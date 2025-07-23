import {
  MapContainer,
  TileLayer,
  Marker,
  ZoomControl,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { LatLng, Place } from "../types/places.types";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

type PlacesMapProps = {
  places: Place[];
  selectedPlace: Place | null;
};

function CenterMap({ lat, lng }: LatLng): null {
  const map: L.Map = useMap();
  map.setView([lat, lng], map.getZoom());
  return null;
}

const PlacesMap = ({ places, selectedPlace }: PlacesMapProps): JSX.Element => {
  if (
    !selectedPlace ||
    selectedPlace.lat === undefined ||
    selectedPlace.lng === undefined ||
    isNaN(+selectedPlace.lat) ||
    isNaN(+selectedPlace.lng)
  ) {
    return <div style={{ padding: 16 }}>Select a place to view the map.</div>;
  }

  return (
    <MapContainer
      center={[+selectedPlace.lat, +selectedPlace.lng]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <ZoomControl position="topright" />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {places.map((place: Place) =>
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
  );
};

export default PlacesMap;
