
## Características Implementadas

### Interfaz de Usuario
- **Tablero 4x4**: Cuadrícula de juego con celdas de igual tamaño
- **Puntuación**: Contador de puntos (actualmente estático en HTML)
- **Botón de reinicio**: Permite comenzar una nueva partida
- **Diseño responsive**: Centrado y adaptable

### Mecánicas del Juego

#### Inicialización ([`initGrid`](script.js))
- Crea una matriz 4x4 inicializada con ceros
- Añade 2 fichas aleatorias al inicio (2 o 4)
- Renderiza el tablero inicial

#### Generación de Fichas ([`addRandomTile`](script.js))
- Coloca fichas en posiciones vacías aleatorias
- 90% de probabilidad de generar un 2
- 10% de probabilidad de generar un 4

#### Movimientos
Implementados para las 4 direcciones mediante las teclas de flecha:

- **Izquierda** ([`moveLeft`](script.js)): Colapsa todas las filas hacia la izquierda
- **Derecha** ([`moveRight`](script.js)): Colapsa todas las filas hacia la derecha
- **Arriba** ([`moveUp`](script.js)): Colapsa todas las columnas hacia arriba
- **Abajo** ([`moveDown`](script.js)): Colapsa todas las columnas hacia abajo

#### Lógica de Colapso ([`collapseRowLeft`](script.js))
1. Elimina los espacios vacíos (ceros)
2. Fusiona fichas consecutivas iguales
3. Rellena con ceros a la derecha

### Renderizado ([`renderGrid`](script.js))
- Actualiza el DOM con el estado actual del tablero
- Aplica clases CSS dinámicas según el valor de cada ficha
- Limpia y reconstruye el tablero en cada actualización

## Controles

| Tecla | Acción |
|-------|--------|
| ⬅️ Flecha Izquierda | Mover fichas a la izquierda |
| ➡️ Flecha Derecha | Mover fichas a la derecha |
| ⬆️ Flecha Arriba | Mover fichas hacia arriba |
| ⬇️ Flecha Abajo | Mover fichas hacia abajo |

## Tecnologías Utilizadas

- **HTML5**: Estructura del documento
- **CSS3**: Estilos y layout (Flexbox + CSS Grid)
- **JavaScript (ES6+)**: Lógica del juego y manipulación del DOM

## Cómo Ejecutar

1. Abre el archivo [index.html](index.html) en un navegador web
2. Usa las teclas de flecha para mover las fichas
3. Combina números iguales para crear números más grandes
4. Haz clic en "Reiniciar" para comenzar una nueva partida

## Notas Técnicas

- La variable global [`grid_array`](script.js) mantiene el estado del tablero
- El evento `keydown` escucha las teclas de dirección
- Se usa `JSON.stringify()` para comparar arrays y detectar cambios
- La función [`init`](script.js) está registrada pero no implementada completamente