<<<<<<< HEAD
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Destination } from "../types/destination";

// Fix para iconos de Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  destinations: Destination[];
}

function Map({ destinations }: MapProps) {
  console.log('🗺️ Map render - destinations:', destinations);

  // Validar que destinations existe y es un array
  if (!destinations || !Array.isArray(destinations)) {
    console.error('❌ destinations no es un array válido:', destinations);
    return (
      <div className="h-96 bg-gray-100 flex items-center justify-center rounded-lg">
        <p className="text-red-500">Error: datos inválidos para el mapa</p>
=======
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
>>>>>>> 11458b49a0884011dad9d2d66e66e26cfbd6a9a9
      </div>
    );
  }

<<<<<<< HEAD
  // Filtrar solo destinos con coordenadas válidas
  const validDestinations = destinations.filter(d => {
    const isValid = d && typeof d.lat === 'number' && typeof d.lon === 'number';
    if (!isValid) {
      console.warn('⚠️ Destino sin coordenadas válidas:', d);
    }
    return isValid;
  });

  console.log('✅ Destinos válidos para el mapa:', validDestinations.length);

  if (validDestinations.length === 0) {
    return (
      <div className="h-96 bg-gray-100 flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <p className="text-gray-500 text-lg">📍 No hay destinos con coordenadas para mostrar</p>
          <p className="text-gray-400 text-sm mt-2">Los destinos aparecerán aquí cuando tengan ubicación</p>
        </div>
      </div>
    );
  }

  const center: [number, number] = [
    validDestinations[0].lat!,
    validDestinations[0].lon!
  ];

  return (
    <MapContainer
      center={center}
      zoom={4}
      className="h-96 rounded-lg shadow-lg z-0"
      style={{ height: '400px' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {validDestinations.map((destination, index) => (
        <Marker key={index} position={[destination.lat!, destination.lon!]}>
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-lg">{destination.name}</h3>
              <p className="text-sm text-gray-600">📍 {destination.country}</p>
              <p className="text-xs text-gray-500 mt-1">{destination.estimatedCost}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
=======
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
>>>>>>> 11458b49a0884011dad9d2d66e66e26cfbd6a9a9
