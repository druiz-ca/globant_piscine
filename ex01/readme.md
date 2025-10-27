# 🌍 Tryp Recomendator

Aplicación web que utiliza IA para sugerir destinos de viaje y mostrarlos en un mapa interactivo.

## 🚀 Tecnologías

- **TypeScript** - Lenguaje de programación
- **React** - Framework frontend
- **Tailwind CSS** - Estilos
- **OpenAI API** - Procesamiento de lenguaje natural
- **Leaflet.js** - Mapas interactivos
- **Docker** - Containerización

## 📋 Requisitos Previos

- Node.js 18+
- Docker y Docker Compose
- API Key de OpenAI

## 🔧 Instalación

### 1. Clonar el repositorio

\`\`\`bash
git clone <tu-repo>
cd travel-ai-map
\`\`\`

### 2. Configurar variables de entorno

Crear archivo `.env`:

\`\`\`env
VITE_OPENAI_API_KEY=tu-clave-api-aqui
\`\`\`

### 3. Ejecutar con Docker

\`\`\`bash
docker-compose up --build
\`\`\`

La aplicación estará disponible en http://localhost:5173

### 4. Ejecutar sin Docker (desarrollo)

\`\`\`bash
npm install
npm run dev
\`\`\`

## 📱 Uso

1. Escribe lo que buscas en el textarea (ej: "playas baratas en Asia")
2. Click en "Buscar Destinos"
3. La IA procesará tu búsqueda y mostrará:
   - Tarjetas con información de cada destino
   - Mapa interactivo con marcadores
4. Click en los marcadores para ver detalles

## ♿ Accesibilidad

- HTML semántico
- Navegación por teclado
- Etiquetas ARIA
- Alto contraste de colores
- Diseño responsive (mobile-first)

## 📄 Estructura del Proyecto

\`\`\`
src/
├── components/
│   ├── SearchInput.tsx
│   ├── Map.tsx
│   └── DestinationCard.tsx
├── services/
│   ├── openai.service.ts
│   └── geocoding.service.ts
├── types/
│   └── destination.ts
└── App.tsx
\`\`\`

## 🐳 Docker

- **Dockerfile**: Configuración del contenedor
- **docker-compose.yml**: Orquestación de servicios

## 📝 Licencia

MIT

## 👤 Autor

Daniel Ruiz - Proyecto para Globant
\`\`\`

---
