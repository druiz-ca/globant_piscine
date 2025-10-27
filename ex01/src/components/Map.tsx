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
      </div>
    );
  }

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