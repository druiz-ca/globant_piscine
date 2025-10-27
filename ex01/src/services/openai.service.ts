import { Destination } from '../types/destination';

export async function getDestinationsFromAI(query: string): Promise<Destination[]> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key not found');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Eres un asistente de viajes. Responde SOLO con un JSON array de destinos. Formato: [{"name":"Ciudad","country":"País","description":"Descripción breve","estimatedCost":"$$"}]'
        },
        {
          role: 'user',
          content: query
        }
      ],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  const content = data.choices[0].message.content;
  
  return JSON.parse(content);
}
import { Destination } from '../types/destination';

export async function getDestinationsFromAI(query: string): Promise<Destination[]> {
  // 🔧 MODO DESARROLLO: Datos mock (cambiar a false cuando tengas créditos)
  const useMockData = true;
  
  if (useMockData) {
    console.log('🧪 Usando datos mock (sin OpenAI)');
    console.log('Query recibida:', query);
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Respuestas diferentes según la búsqueda
    const queryLower = query.toLowerCase();
    
    // Playas en España/Málaga
    if (queryLower.includes('málaga') || queryLower.includes('malaga') || 
        (queryLower.includes('playa') && queryLower.includes('españa'))) {
      return [
        {
          name: "Málaga",
          country: "España",
          description: "Costa del Sol con playas increíbles, clima mediterráneo y rica cultura andaluza.",
          estimatedCost: "$$",
          lat: 36.7213,
          lon: -4.4214
        },
        {
          name: "Marbella",
          country: "España",
          description: "Playas exclusivas, puerto deportivo de lujo y vida nocturna vibrante.",
          estimatedCost: "$$$",
          lat: 36.5101,
          lon: -4.8824
        },
        {
          name: "Nerja",
          country: "España",
          description: "Pueblo costero con calas escondidas y las famosas Cuevas de Nerja.",
          estimatedCost: "$$",
          lat: 36.7450,
          lon: -3.8740
        },
        {
          name: "Torremolinos",
          country: "España",
          description: "Playas urbanas con gran ambiente, parques acuáticos y paseo marítimo animado.",
          estimatedCost: "$",
          lat: 36.6201,
          lon: -4.4999
        }
      ];
    }
    
    // Playas en general
    if (queryLower.includes('playa')) {
      return [
        {
          name: "Cancún",
          country: "México",
          description: "Playas de arena blanca, agua turquesa y ruinas mayas cercanas.",
          estimatedCost: "$$",
          lat: 21.1619,
          lon: -86.8515
        },
        {
          name: "Punta Cana",
          country: "República Dominicana",
          description: "Resorts todo incluido, playas paradisíacas y deportes acuáticos.",
          estimatedCost: "$$$",
          lat: 18.5601,
          lon: -68.3725
        },
        {
          name: "Tulum",
          country: "México",
          description: "Playas bohemias con ruinas mayas sobre el mar Caribe.",
          estimatedCost: "$$",
          lat: 20.2114,
          lon: -87.4654
        },
        {
          name: "Maldivas",
          country: "Maldivas",
          description: "Atolones paradisíacos, bungalows sobre el agua y snorkel increíble.",
          estimatedCost: "$$$$",
          lat: 3.2028,
          lon: 73.2207
        }
      ];
    }
    
    // Europa
    if (queryLower.includes('europa')) {
      return [
        {
          name: "París",
          country: "Francia",
          description: "Ciudad del amor con la Torre Eiffel, museos mundiales y gastronomía exquisita.",
          estimatedCost: "$$$",
          lat: 48.8566,
          lon: 2.3522
        },
        {
          name: "Roma",
          country: "Italia",
          description: "Historia antigua, Coliseo, Vaticano y la mejor pasta del mundo.",
          estimatedCost: "$$",
          lat: 41.9028,
          lon: 12.4964
        },
        {
          name: "Barcelona",
          country: "España",
          description: "Arquitectura de Gaudí, playas urbanas y vibrante vida nocturna.",
          estimatedCost: "$$",
          lat: 41.3874,
          lon: 2.1686
        },
        {
          name: "Ámsterdam",
          country: "Países Bajos",
          description: "Canales románticos, museos de arte y cultura ciclista única.",
          estimatedCost: "$$$",
          lat: 52.3676,
          lon: 4.9041
        }
      ];
    }
    
    // Barato/económico
    if (queryLower.includes('barato') || queryLower.includes('económico') || 
        queryLower.includes('low cost')) {
      return [
        {
          name: "Budapest",
          country: "Hungría",
          description: "Baños termales, arquitectura impresionante y precios muy accesibles.",
          estimatedCost: "$",
          lat: 47.4979,
          lon: 19.0402
        },
        {
          name: "Cracovia",
          country: "Polonia",
          description: "Ciudad medieval bien conservada, historia rica y costos bajos.",
          estimatedCost: "$",
          lat: 50.0647,
          lon: 19.9450
        },
        {
          name: "Praga",
          country: "República Checa",
          description: "Castillo, puente Carlos y cerveza barata en el corazón de Europa.",
          estimatedCost: "$",
          lat: 50.0755,
          lon: 14.4378
        },
        {
          name: "Hanoi",
          country: "Vietnam",
          description: "Comida callejera increíble, cultura fascinante y muy económico.",
          estimatedCost: "$",
          lat: 21.0285,
          lon: 105.8542
        }
      ];
    }
    
    // Default: Asia
    return [
      {
        name: "Bangkok",
        country: "Tailandia",
        description: "Ciudad vibrante con templos dorados, comida callejera increíble y vida nocturna animada.",
        estimatedCost: "$$",
        lat: 13.7563,
        lon: 100.5018
      },
      {
        name: "Bali",
        country: "Indonesia",
        description: "Playas paradisíacas, templos antiguos y arrozales en terrazas. Perfecto para surfear.",
        estimatedCost: "$$$",
        lat: -8.3405,
        lon: 115.0920
      },
      {
        name: "Tokio",
        country: "Japón",
        description: "Metrópolis futurista con templos antiguos, tecnología y gastronomía única.",
        estimatedCost: "$$$",
        lat: 35.6762,
        lon: 139.6503
      },
      {
        name: "Seúl",
        country: "Corea del Sur",
        description: "K-pop, palacios históricos, tecnología avanzada y barbacoa coreana.",
        estimatedCost: "$$",
        lat: 37.5665,
        lon: 126.9780
      }
    ];
  }
  
  // ... resto del código de OpenAI (cuando tengas créditos)
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key not found');
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Eres un asistente de viajes. Responde SOLO con un JSON array válido de destinos. Formato exacto: [{"name":"Ciudad","country":"País","description":"Descripción breve","estimatedCost":"$$"}]. No incluyas texto adicional, solo el JSON.'
          },
          {
            role: 'user',
            content: query
          }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0]) {
      console.error('Respuesta de OpenAI:', data);
      throw new Error('Respuesta inválida de OpenAI');
    }

    const content = data.choices[0].message.content;
    
    try {
      const destinations = JSON.parse(content);
      return Array.isArray(destinations) ? destinations : [];
    } catch (parseError) {
      console.error('Error parseando JSON:', content);
      throw new Error('La respuesta de OpenAI no es un JSON válido');
    }
    
  } catch (error) {
    console.error('Error en getDestinationsFromAI:', error);
    throw error;
  }
}