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
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="text-center text-lg text-gray-500">
          Select a place to view the map.
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[300px] bg-gray-100 rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={[+selectedPlace.lat, +selectedPlace.lng]}
        zoom={13}
        className="w-full h-full min-h-[300px]"
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        <ZoomControl position="topright" />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {places.map(
          (place: Place) =>
            place.lat !== undefined &&
            place.lng !== undefined &&
            !isNaN(+place.lat) &&
            !isNaN(+place.lng) && (
              <Marker key={place.id} position={[+place.lat, +place.lng]}>
                <Popup>
                  <div className="flex flex-col">
                    <strong className="text-blue-700">{place.name}</strong>
                    <span className="text-gray-400 text-sm mt-1">
                      {new Date(place.createdAt).toLocaleString()}
                    </span>
                  </div>
                </Popup>
              </Marker>
            )
        )}
        <CenterMap lat={+selectedPlace.lat} lng={+selectedPlace.lng} />
      </MapContainer>
    </div>
  );
};

export default PlacesMap;
