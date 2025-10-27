import { Destination } from '../types/destination';

export async function getDestinationsFromAI(query: string): Promise<Destination[]> {
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

    // Verificar si la respuesta es OK
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Verificar que exista choices
    if (!data.choices || !data.choices[0]) {
      console.error('Respuesta de OpenAI:', data);
      throw new Error('Respuesta inválida de OpenAI');
    }

    const content = data.choices[0].message.content;
    
    // Parsear el JSON
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