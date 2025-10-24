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