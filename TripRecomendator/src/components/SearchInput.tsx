import { useState } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  loading: boolean;
}

function SearchInput({ onSearch, loading }: SearchInputProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col gap-4">
        <label htmlFor="search" className="text-lg font-semibold text-gray-700">
          ¿Qué tipo de viaje buscas?
        </label>
        <textarea
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ej: playas baratas en Asia, destinos románticos en Europa..."
          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
          rows={3}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Buscando...' : 'Buscar Destinos 🔍'}
        </button>
      </div>
    </form>
  );
}

export default SearchInput;