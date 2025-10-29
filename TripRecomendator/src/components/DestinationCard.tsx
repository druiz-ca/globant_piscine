import { Destination } from '../types/destination';

interface DestinationCardProps {
  destination: Destination;
}

function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800">
          {destination.name}
        </h3>
        <span className="text-2xl">{destination.estimatedCost}</span>
      </div>
      
      <p className="text-sm text-gray-600 mb-3">
        📍 {destination.country}
      </p>
      
      <p className="text-gray-700">
        {destination.description}
      </p>
    </div>
  );
}

export default DestinationCard;