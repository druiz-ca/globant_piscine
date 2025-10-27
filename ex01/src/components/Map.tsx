import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapLocation } from '../types/destination';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix para los iconos de Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  locations: MapLocation[];
}

export default function Map({ locations }: MapProps) {
  // Centro del mapa (promedio de todas las ubicaciones o centro del mundo)
  const center: [number, number] = locations.length > 0
    ? [
        locations.reduce((sum, loc) => sum + loc.latitude, 0) / locations.length,
        locations.reduce((sum, loc) => sum + loc.longitude, 0) / locations.length
      ]
    : [20, 0]; // Centro del mundo por defecto

  const zoom = locations.length > 0 ? 4 : 2;

  if (locations.length === 0) {
    return (
      <div className="w-full h-[400px] md:h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500 text-lg">Busca destinos para ver el mapa</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] md:h-[600px] rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={center}
        zoom={zoom}
        className="w-full h-full"
        aria-label="Mapa interactivo de destinos"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {locations.map((location, index) => (
          <Marker
            key={index}
            position={[location.latitude, location.longitude]}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg">{location.name}</h3>
                <p className="text-sm text-gray-600">{location.country}</p>
                <p className="text-sm mt-2">{location.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}