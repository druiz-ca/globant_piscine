import { Destination } from '../types/destination';

export async function getCoordinatesForDestinations(destinations: Destination[]): Promise<Destination[]> {
  const destinationsWithCoords = await Promise.all(
    destinations.map(async (destination) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            `${destination.name}, ${destination.country}`
          )}&format=json&limit=1`
        );
        
        const data = await response.json();
        
        if (data && data.length > 0) {
          return {
            ...destination,
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon),
          };
        }
        
        return destination;
      } catch (error) {
        console.error(`Error geocoding ${destination.name}:`, error);
        return destination;
      }
    })
  );

  return destinationsWithCoords;
}