/* registra un manejador para el evento "click" 
del elemento con id "restart-btn". 
Al hacer clic en ese elemento se ejecuta la función init.*/
document.getElementById('restart-btn').addEventListener('click', init);

function init(){
    console.log('Inicializar el juego');
}

// Array de la cuadricula
let grid_array = [];

// Función para inicializar el tablero
function initGrid(){
    grid_array = [];
    
    // LLena la matriz con 0s
    for (let i = 0; i < 4; i++)
        grid_array.push([0,0,0,0]);

    // Llama 2x a addRandom... para poner 2 fichas
    addRandomTile();
    addRandomTile();

    // Renderiza los números de la matriz
    renderGrid();

    console.log(grid_array);
}

// Función para añadir una ficha aleatoria
function addRandomTile(){
    let aux_array = []; // array vacío auxiliar
    
    // Recorre todas las pos. de grid
    for (let r = 0; r < 4; r++){
        for (let c = 0; c < 4; c++)
            // Busca todas las posiciones vacías(0) de la cuadricula
            if (grid_array[r][c] === 0) 
                // almacena todas las pos. de la cuadrícula que estén a 0
                aux_array.push([r, c]);
    }
    
    if (aux_array.length === 0) 
        return false;
    
    // Elige una al azar
        // Genera un num random entre 0 y long del array
        // Lo convierte en un entero
        // Mediante desestructuración almacena la fila y columna random
    let [row, col] = aux_array[Math.floor(Math.random() * aux_array.length)];

    // Coloca un 2 (el 90% de las veces) o un 4
        // genera un num random entre 0 y 1
        // si es menor a 0,9 escoje 2 sino 4
    grid_array[row][col] = Math.random() < 0.9 ? 2 : 4;
    return true;
}

function renderGrid(){
    // Obtiene el contenedor de la cuadricula (id='grid')
    const gridDiv = document.getElementById('grid');
    gridDiv.innerHTML = ""; // Limpia el tablero

    // Recorre cada pos del tablero
    for (let r = 0; r < 4; r++){
        for (let c = 0; c < 4; c++){
            // Lée el valor de cada celda
            const valor = grid_array[r][c];
            // Crea un nuevo div
            const cell = document.createElement('div');
            // Añade la clase cell al nuevo div creado
            cell.classList.add('cell');
            // Si la celda contiene algún valor (> 0) pone estilo
            if(valor > 0){
                // añade clase 'tile' para el color
                cell.classList.add('tile', `tile-${valor}`);
                cell.textContent = valor;
            }
            gridDiv.appendChild(cell);
        }
    }
}

// Fucnión para colapsar fila hacia la izquierda
function collapseRowLeft(row){
    // 1. Filtrar ceros (quitar espacios vacíos)
        // en res queda array con todos los números menos los 0
    let res = row.filter(v => v !== 0);

    // 2. Fusionar fichas iguales y consecutivas
    for (let i = 0; i < res.length - 1; i++){
        // Si la celda actual es igual a la siguiente
        if(res[i] === res[i + 1]){
            res[i] *= 2; // duplica el valor de la celda actual
            res.splice(i + 1, 1); // elimina la ficha fusionada
        }
    }

    // 3. Rellenar con ceros a la derecha hasta la long 4
    while (res.length < 4){
        res.push(0);
    }
    return res;
}

// Desplaza todos los números a la izquierda
function moveLeft(){
    let changed = false;

    for (let r = 0; r < 4; r++){
        // Guarda la fila original
        let original = grid_array[r].slice();

        // Aplica el colapso
        grid_array[r] = collapseRowLeft(grid_array[r]);

        // Comprueba si cambió
        if (JSON.stringify(original) !== JSON.stringify(grid_array[r]))
            changed = true;
    }
    return changed;
}

// Función auxiliar para colapsar una fila hacia la derecha
function collapseRowRight(row) {
    // Invertir, colapsar a la izquierda, y volver a invertir
    return collapseRowLeft(row.reverse()).reverse();
}

// Desplaza todos los números a la derecha
function moveRight() {
    let changed = false;

    for (let r = 0; r < 4; r++) {
        // Guarda la fila original
        let original = grid_array[r].slice();

        // Aplica el colapso a la derecha
        grid_array[r] = collapseRowRight(grid_array[r]);

        // Comprueba si cambió
        if (JSON.stringify(original) !== JSON.stringify(grid_array[r]))
            changed = true;
    }
    return changed;
}

// Desplaza todos los números hacia arriba
function moveUp() {
    let changed = false;

    // Para cada columna (c de 0 a 3)
    for (let c = 0; c < 4; c++) {
        // Extraer la columna como un array
        let col = [];
        for (let r = 0; r < 4; r++) {
            col.push(grid_array[r][c]);
        }

        // Guarda la columna original
        let original = col.slice();

        // Aplica el colapso (como si fuera una fila hacia la izquierda)
        col = collapseRowLeft(col);

        // Vuelve a colocar la columna en el grid
        for (let r = 0; r < 4; r++) {
            grid_array[r][c] = col[r];
        }

        // Comprueba si cambió
        if (JSON.stringify(original) !== JSON.stringify(col))
            changed = true;
    }
    return changed;
}

// Desplaza todos los números hacia abajo
function moveDown() {
    let changed = false;

    // Para cada columna (c de 0 a 3)
    for (let c = 0; c < 4; c++) {
        // Extraer la columna como un array
        let col = [];
        for (let r = 0; r < 4; r++) {
            col.push(grid_array[r][c]);
        }

        // Guarda la columna original
        let original = col.slice();

        // Invertir, colapsar, y volver a invertir (como moveRight)
        col = collapseRowLeft(col.reverse()).reverse();

        // Vuelve a colocar la columna en el grid
        for (let r = 0; r < 4; r++) {
            grid_array[r][c] = col[r];
        }

        // Comprueba si cambió
        if (JSON.stringify(original) !== JSON.stringify(col))
            changed = true;
    }
    return changed;
}

// Escuchar las teclas del teclado
document.addEventListener('keydown', function(event) {
    let moved = false;
    
    // Detectar qué tecla se pulsó
    if (event.key === 'ArrowLeft') {
        moved = moveLeft();
    } else if (event.key === 'ArrowRight') {
        moved = moveRight();
    } else if (event.key === 'ArrowUp') {
        moved = moveUp();
    } else if (event.key === 'ArrowDown') {
        moved = moveDown();
    }
    
    // Si el tablero cambió:
    if (moved) {
        addRandomTile();  // Añade una ficha nueva
        renderGrid();      // Actualiza la vista
        console.log(grid_array); // Para ver el estado en consola
    }
});

// Llama a la ft initGrid al cargar la página
window.addEventListener('load', initGrid);
