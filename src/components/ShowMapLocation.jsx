import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ShowMapLocation = ({ latitude, longitude }) => {
  // Default position if latitude and longitude are not provided
  const defaultPosition = [0, 0];

  // Coordinates for the map center
  const center =
    latitude && longitude ? [latitude, longitude] : defaultPosition;

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {latitude && longitude && (
        <Marker position={[latitude, longitude]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default ShowMapLocation;
