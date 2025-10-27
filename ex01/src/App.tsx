import { useState } from 'react';
import SearchInput from './components/SearchInput';
import Map from './components/Map';
import DestinationCard from './components/DestinationCard';
import { Destination } from './types/destination';
import { getDestinationsFromAI } from './services/openai.service';
import { getCoordinatesForDestinations } from './services/geocoding.service';

function App() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Obtener destinos de OpenAI
      const aiDestinations = await getDestinationsFromAI(query);
      
      // Obtener coordenadas
      const destinationsWithCoords = await getCoordinatesForDestinations(aiDestinations);
      
      setDestinations(destinationsWithCoords);
    } catch (err) {
      setError('Error al buscar destinos. Por favor, intenta de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🌍 Travel AI Map
          </h1>
          <p className="text-xl text-gray-600">
            Descubre tu próximo destino con IA
          </p>
        </header>

        {/* Search */}
        <div className="mb-12">
          <SearchInput onSearch={handleSearch} loading={loading} />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            {error}
          </div>
        )}

        {/* Results */}
        {destinations.length > 0 && (
          <>
            {/* Map */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                📍 Mapa de Destinos
              </h2>
              <Map destinations={destinations} />
            </div>

            {/* Cards */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                ✈️ Destinos Recomendados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map((destination, index) => (
                  <DestinationCard key={index} destination={destination} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Empty state */}
        {!loading && destinations.length === 0 && !error && (
          <div className="text-center text-gray-500 py-12">
            <p className="text-xl">
              Escribe tu búsqueda para comenzar 🚀
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;