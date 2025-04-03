import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapComponent({ latitude, longitude, vendorName }) {
  return (
    <MapContainer center={[latitude, longitude]} zoom={15} className="h-64 w-full rounded-lg shadow-md">
      {/* Tile Layer from OpenStreetMap */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Vendor Marker */}
      <Marker position={[latitude, longitude]}>
        <Popup>{vendorName}</Popup>
      </Marker>
    </MapContainer>
  );
}
