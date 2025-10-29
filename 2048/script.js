/* registra un manejador para el evento "click" 
del elemento con id "restart-btn". 
Al hacer clic en ese elemento se ejecuta la función init.*/
document.getElementById('restart-btn').addEventListener('click', init);

// Variables globales
let score = 0;
let bestScore = 0;
let gameEnded = false;

// Cargar mejor puntuación al inicio
function loadBestScore() {
    const saved = localStorage.getItem('2048-best-score');
    bestScore = saved ? parseInt(saved) : 0;
    updateScoreDisplay();
}

// Guardar mejor puntuación
function saveBestScore() {
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('2048-best-score', bestScore);
    }
}

// Actualizar display de puntuaciones
function updateScoreDisplay() {
    document.getElementById('score').textContent = score;
    document.getElementById('best-score').textContent = bestScore;
}

// Añadir puntos
function addScore(points) {
    score += points;
    saveBestScore();
    updateScoreDisplay();
}

// Función para mostrar modal
function showModal(type, message) {
    const modal = document.getElementById('game-modal');
    const modalIcon = document.getElementById('modal-icon');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const finalScore = document.getElementById('final-score');
    const continueBtn = document.getElementById('modal-continue');
    
    // Configurar contenido según el tipo
    if (type === 'win') {
        modal.classList.remove('game-over');
        modalIcon.textContent = '🎉';
        modalTitle.textContent = '¡Victoria!';
        modalMessage.textContent = message;
        continueBtn.style.display = 'block';
    } else {
        modal.classList.add('game-over');
        modalIcon.textContent = '😢';
        modalTitle.textContent = 'Game Over';
        modalMessage.textContent = message;
        continueBtn.style.display = 'none';
    }
    
    finalScore.textContent = score;
    modal.classList.add('show');
}

// Función para cerrar modal
function closeModal() {
    const modal = document.getElementById('game-modal');
    modal.classList.remove('show');
}

function init(){
    console.log('Inicializar el juego');
    score = 0;
    gameEnded = false;
    closeModal();
    updateScoreDisplay();
    initGrid();
    renderGrid();
}

// Array de la cuadricula
let grid_array = [];

// Función para inicializar el tablero
function initGrid(){
    grid_array = [];
    
    for (let i = 0; i < 4; i++)
        grid_array.push([0, 0, 0, 0]);

    addRandomTile();
    addRandomTile();

    renderGrid();
    console.log(grid_array);
}

// Variable global para trackear posiciones nuevas
let newTilePosition = null;

function addRandomTile(){
    let aux_array = [];
    
    for (let r = 0; r < 4; r++){
        for (let c = 0; c < 4; c++)
            if (grid_array[r][c] === 0) 
                aux_array.push([r, c]);
    }
    
    if (aux_array.length === 0) 
        return false;
    
    let [row, col] = aux_array[Math.floor(Math.random() * aux_array.length)];
    grid_array[row][col] = Math.random() < 0.9 ? 2 : 4;
    
    // Guardar posición de la nueva ficha
    newTilePosition = { row, col };
    
    return true;
}

// Modificar renderGrid para aplicar clase merge
function renderGrid(){
    const gridDiv = document.getElementById('grid');
    
    // Si el grid está vacío, crear todas las celdas
    if (gridDiv.children.length === 0) {
        for (let i = 0; i < 16; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            gridDiv.appendChild(cell);
        }
    }
    
    // Actualizar contenido de cada celda
    let index = 0;
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            const valor = grid_array[r][c];
            const cell = gridDiv.children[index];
            
            // Limpiar clases anteriores excepto 'cell'
            cell.className = 'cell';
            
            if (valor > 0) {
                cell.classList.add('tile', `tile-${valor}`);
                cell.textContent = valor;
                
                // Aplicar animación a ficha nueva
                if (newTilePosition && newTilePosition.row === r && newTilePosition.col === c) {
                    cell.classList.add('new-tile');
                }
            } else {
                cell.textContent = '';
            }
            
            index++;
        }
    }
    
    // Resetear posición de nueva ficha
    newTilePosition = null;
}

// Variable global para trackear fusiones
let mergedPositions = [];

function collapseRowLeft(row) {
    let filtered = row.filter(num => num !== 0);
    let merged = [];
    let skip = false;
    
    for (let i = 0; i < filtered.length; i++) {
        if (skip) {
            skip = false;
            continue;
        }
        
        if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
            skip = true;
            const mergedValue = filtered[i] * 2;
            merged.push(mergedValue);
            mergedPositions.push(merged.length - 1);
            
            // Añadir puntos por fusión
            addScore(mergedValue);
        } else {
            merged.push(filtered[i]);
        }
    }
    
    while (merged.length < 4) {
        merged.push(0);
    }
    return merged;
}

// Desplaza todos los números a la izquierda
    // procesa línea x línea
function moveLeft(){
    let changed = false;
    mergedPositions = [];

    for (let r = 0; r < 4; r++){
        let original = grid_array[r].slice();
        grid_array[r] = collapseRowLeft(grid_array[r]);

        if (JSON.stringify(original) !== JSON.stringify(grid_array[r]))
            changed = true;
    }
    return changed;
}

// Función auxiliar para colapsar una fila hacia la derecha
function collapseRowRight(row) {
    let filtered = row.filter(num => num !== 0);
    let merged = [];
    let skip = false;
    
    // Recorrer de derecha a izquierda
    for (let i = filtered.length - 1; i >= 0; i--) {
        if (skip) {
            skip = false;
            continue;
        }
        
        if (i - 1 >= 0 && filtered[i] === filtered[i - 1]) {
            skip = true;
            const mergedValue = filtered[i] * 2;
            merged.unshift(mergedValue); // Añadir al inicio
            mergedPositions.push(merged.length - 1);
            
            // Añadir puntos por fusión
            addScore(mergedValue);
        } else {
            merged.unshift(filtered[i]); // Añadir al inicio
        }
    }
    
    // Rellenar con ceros a la izquierda
    while (merged.length < 4) {
        merged.unshift(0);
    }
    return merged;
}

// Desplaza todos los números a la derecha
function moveRight() {
    let changed = false;
    mergedPositions = [];

    for (let r = 0; r < 4; r++) {
        let original = grid_array[r].slice();
        grid_array[r] = collapseRowRight(grid_array[r]);
        
        if (JSON.stringify(original) !== JSON.stringify(grid_array[r]))
            changed = true;
    }
    return changed;
}

// Desplaza todos los números hacia arriba
function moveUp() {
    let changed = false;
    mergedPositions = [];

    for (let c = 0; c < 4; c++) {
        // Extraer columna
        let col = [];
        for (let r = 0; r < 4; r++)
            col.push(grid_array[r][c]);
        
        let original = col.slice();
        col = collapseRowLeft(col); // Reutilizar función de colapso izquierda
        
        // Escribir columna de vuelta
        for (let r = 0; r < 4; r++)
            grid_array[r][c] = col[r];
        
        if (JSON.stringify(original) !== JSON.stringify(col))
            changed = true;
    }
    return changed;
}

// Desplaza todos los números hacia abajo
function moveDown() {
    let changed = false;
    mergedPositions = [];

    for (let c = 0; c < 4; c++) {
        // Extraer columna
        let col = [];
        for (let r = 0; r < 4; r++)
            col.push(grid_array[r][c]);
        
        let original = col.slice();
        col = collapseRowRight(col); // Reutilizar función de colapso derecha
        
        // Escribir columna de vuelta
        for (let r = 0; r < 4; r++)
            grid_array[r][c] = col[r];
        
        if (JSON.stringify(original) !== JSON.stringify(col))
            changed = true;
    }
    return changed;
}

// Verifica si el jugador ha ganado (alcanzó 2048)
function checkWin() {
    if (gameEnded) return false;
    
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (grid_array[r][c] === 2048) {
                gameEnded = true;
                setTimeout(() => {
                    showModal('win', '¡Has alcanzado 2048!');
                }, 300);
                return true;
            }
        }
    }
    return false;
}

// Verifica si el juego ha terminado (sin movimientos posibles)
function checkGameOver() {
    if (gameEnded) return false;
    
    // 1. Si hay celdas vacías, el juego continúa
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (grid_array[r][c] === 0) {
                return false;
            }
        }
    }
    
    // 2. Comprobar fusiones horizontales
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 3; c++) {
            if (grid_array[r][c] === grid_array[r][c + 1]) {
                return false;
            }
        }
    }
    
    // 3. Comprobar fusiones verticales
    for (let c = 0; c < 4; c++) {
        for (let r = 0; r < 3; r++) {
            if (grid_array[r][c] === grid_array[r + 1][c]) {
                return false;
            }
        }
    }
    
    // Game Over
    gameEnded = true;
    setTimeout(() => {
        showModal('gameover', 'No hay más movimientos posibles');
    }, 300);
    return true;
}

// Event listeners para botones del modal
document.getElementById('modal-continue').addEventListener('click', function() {
    closeModal();
    gameEnded = false; // Permitir continuar jugando
});

document.getElementById('modal-restart').addEventListener('click', function() {
    init();
});

// Escuchar las teclas del teclado
document.addEventListener('keydown', function(event) {
    if (gameEnded) return; // No permitir movimientos si el juego terminó
    
    let moved = false;
    
    switch (event.key) {
        case 'ArrowLeft':
            event.preventDefault();
            moved = moveLeft();
            break;
        case 'ArrowRight':
            event.preventDefault();
            moved = moveRight();
            break;
        case 'ArrowUp':
            event.preventDefault();
            moved = moveUp();
            break;
        case 'ArrowDown':
            event.preventDefault();
            moved = moveDown();
            break;
        default:
            return;
    }
    
    if (moved) {
        addRandomTile();
        renderGrid();
        
        if (checkWin()) {
            return;
        }
        
        if (checkGameOver()) {
            return;
        }
    }
});

// Llama a la ft initGrid al cargar la página
window.addEventListener('load', function() {
    loadBestScore();
    initGrid();
});