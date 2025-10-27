# 🌍 Travel AI Map - TripRecommendator

Aplicación web que utiliza IA para sugerir destinos de viaje basados en descripciones en texto libre, mostrándolos en un mapa interactivo.

## 🚀 Tecnologías

- **TypeScript** - Lenguaje de programación principal
- **React** - Framework frontend
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework CSS para diseño responsive mobile-first
- **OpenAI API** - Procesamiento de lenguaje natural (NLP)
- **Leaflet.js** - Mapas interactivos
- **Docker** - Containerización

## 📋 Requisitos Previos

- Docker
- Docker Compose
- (Opcional) API Key de OpenAI

## 🔧 Instalación y Ejecución

### Opción 1: Con Docker (Recomendado)

#### 1. Clonar el repositorio

```bash
git clone <tu-repo>
cd ex01
```

#### 2. Configurar variables de entorno

Copia el archivo de ejemplo:

```bash
cp .env.example .env
```

Edita `.env` y agrega tu API key de OpenAI (opcional):

```env
VITE_OPENAI_API_KEY=sk-proj-tu-clave-aqui
```

**Nota:** Si no tienes API key, la app funcionará con datos mock.

#### 3. Construir y ejecutar con Docker Compose

```bash
docker-compose up --build
```

La aplicación estará disponible en **http://localhost:5173**

#### 4. Detener los contenedores

```bash
docker-compose down
```

### Opción 2: Sin Docker (Desarrollo local)

#### 1. Instalar dependencias

```bash
npm install
```

#### 2. Configurar `.env`

```bash
cp .env.example .env
# Edita .env con tu API key (opcional)
```

#### 3. Ejecutar en desarrollo

```bash
npm run dev
```

## 🎯 Uso

1. **Describe tu viaje ideal** en el campo de texto (ej: "playas baratas en Asia", "destinos románticos en Europa")
2. Haz clic en **"Buscar Destinos"**
3. Explora los resultados en:
   - 🗺️ **Mapa interactivo** con marcadores
   - 📋 **Tarjetas de destinos** con descripciones y costos estimados

## 🔧 Configuración

### Modo Mock (sin OpenAI)

Por defecto, la app usa datos mock. Para cambiar a OpenAI real:

1. Obtén una API key en https://platform.openai.com/api-keys
2. Agrégala al archivo `.env`
3. En `src/services/openai.service.ts`, cambia `useMockData = false`

### Respuestas Mock Incluidas

- 🏖️ Playas en Málaga/España
- 🌍 Destinos en Europa
- 💰 Viajes baratos/económicos
- 🏝️ Playas en general
- 🌏 Asia (por defecto)

## ♿ Accesibilidad

La aplicación implementa:

- ✅ HTML semántico
- ✅ Navegación por teclado
- ✅ Contraste de colores adecuado
- ✅ Etiquetas ARIA básicas
- ✅ Diseño responsive mobile-first

## 🏗️ Build para producción

```bash
# Con Docker
docker-compose run app npm run build

# Sin Docker
npm run build
```

Los archivos se generarán en la carpeta `dist/`

## 📦 Estructura del Proyecto

```
ex01/
├── src/
│   ├── components/        # Componentes React
│   │   ├── SearchInput.tsx
│   │   ├── Map.tsx
│   │   └── DestinationCard.tsx
│   ├── services/          # Servicios API
│   │   ├── openai.service.ts
│   │   └── geocoding.service.ts
│   ├── types/             # Definiciones TypeScript
│   │   └── destination.ts
│   ├── App.tsx            # Componente principal
│   └── main.tsx           # Entry point
├── Dockerfile             # Configuración Docker
├── docker-compose.yml     # Orquestación Docker
├── .env.example           # Template de variables
├── tailwind.config.js     # Configuración Tailwind
└── package.json           # Dependencias
```

## 🛡️ Seguridad

- ⚠️ **NUNCA** subas archivos `.env` a Git
- ✅ Solo sube `.env.example` con placeholders
- ✅ Usa variables de entorno en producción
- ✅ Revoca las API keys si se filtran

## 🌐 Despliegue

Puedes desplegar en:
- **Vercel** (recomendado para Vite/React)
- **Netlify**
- **GitHub Pages**
- **Railway** (con Docker)
- **Render** (con Docker)

**IMPORTANTE:** Configura las variables de entorno en tu plataforma de hosting.

## 📝 Licencia

MIT

## 👨‍💻 Autor

Daniel Ruiz - TripRecommendator