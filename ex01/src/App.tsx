import { useState } from 'react';
import SearchInput from './components/SearchInput';
import Map from './components/Map';
import DestinationCard from './components/DestinationCard';
import { Destination } from './types/destination';
import { getDestinationsFromAI } from './services/openai.service';

function App() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  console.log('🎨 APP RENDER - Destinations:', destinations, 'Loading:', loading);

  const handleSearch = async (query: string) => {
    console.log('🔍 INICIO handleSearch');
    setLoading(true);
    setError(null);
    setDestinations([]); // Limpiar destinos anteriores
    
    try {
      console.log('📡 Llamando getDestinationsFromAI...');
      const aiDestinations = await getDestinationsFromAI(query);
      console.log('✅ Recibido:', aiDestinations);
      
      console.log('💾 Actualizando estado con', aiDestinations.length, 'destinos');
      setDestinations(aiDestinations);
      
    } catch (err: any) {
      console.error('❌ ERROR:', err);
      setError(err?.message || 'Error desconocido');
    } finally {
      console.log('🏁 Finalizando, loading = false');
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

        {/* Loading */}
        {loading && (
          <div className="text-center py-12 bg-white rounded-lg">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 font-bold text-xl">Buscando destinos increíbles...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
            ❌ {error}
          </div>
        )}

        {/* Results */}
        {!loading && destinations.length > 0 && (
          <div className="bg-green-100 p-8 rounded">
            <h2 className="text-3xl font-bold mb-4">
              ✅ {destinations.length} Destinos Encontrados
            </h2>
            
            {/* Map */}
            <div className="mb-12 bg-white p-4 rounded">
              <h3 className="text-2xl font-bold mb-4">📍 Mapa</h3>
              <Map destinations={destinations} />
            </div>

            {/* Cards */}
            <div>
              <h3 className="text-2xl font-bold mb-4">✈️ Lista</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map((destination, index) => (
                  <DestinationCard key={index} destination={destination} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && destinations.length === 0 && !error && (
          <div className="text-center text-gray-500 py-12 bg-white rounded-lg">
            <p className="text-xl">
              👆 Escribe tu búsqueda arriba para comenzar 🚀
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;