# 🌍 Travel AI Map

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

Tu Nombre - Proyecto para Globant
\`\`\`

---

## **PASO 21: Agregar .gitignore** ⏱️ 2 minutos

### Editar `.gitignore` (ya existe, agregar):
```
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env
.env.local
.env.production

# Docker
.dockerignore
```

---

## **✅ CHECKLIST FINAL**

- [ ] Proyecto creado con Vite + React + TypeScript
- [ ] Tailwind CSS configurado
- [ ] OpenAI API integrada
- [ ] Leaflet.js funcionando
- [ ] Textarea para entrada libre
- [ ] Mapa muestra marcadores
- [ ] Diseño responsive (mobile-first)
- [ ] HTML semántico y accesible
- [ ] Dockerfile creado
- [ ] docker-compose.yml creado
- [ ] README.md completo
- [ ] `.env.example` para documentación
- [ ] Pruebas locales funcionando
- [ ] Pruebas con Docker funcionando

---

## **🎯 ORDEN DE PRIORIDAD SI TIENES POCO TIEMPO**

### Mínimo viable (1-2 horas):
1. Pasos 1-13 (sin Docker)
2. Probar localmente

### Completo (3-4 horas):
1. Todos los pasos en orden

---

## **🆘 SOLUCIÓN DE PROBLEMAS COMUNES**

### Error: "OpenAI API key not found"
- Verifica que `.env` exista y tenga `VITE_OPENAI_API_KEY`
- Reinicia el servidor (`npm run dev`)

### Error: Mapa no se ve
```bash
# Instalar CSS de Leaflet
npm install leaflet
```

### Docker no funciona
```bash
# Detener y limpiar
docker-compose down
docker-compose up --build --force-recreate
```

---

¿Quieres que te ayude con algún paso específico o necesitas el código completo listo para copiar y pegar? 🚀