/**
 * MOTOR DE BÚSQUEDA DEVAGENCY
 * Maneja: Autocompletado, Historial (LocalStorage) y Filtros por Categoría.
 */

let searchData = [];       // Aquí se cargará el JSON
let currentFilter = 'all'; // Filtro por defecto: 'all', 'Servicios', 'Blog', etc.

document.addEventListener('DOMContentLoaded', () => {
    // IMPORTANTE: Como usas ui-loader, el Navbar no existe al instante.
    // Usamos un intervalo para esperar a que aparezca el input antes de iniciar.
    const waitForNavbar = setInterval(() => {
        const input = document.getElementById('searchInput');
        if (input) {
            clearInterval(waitForNavbar); // ¡Ya existe! Detener espera.
            initSearchSystem();           // Iniciar sistema.
        }
    }, 100); // Revisa cada 100ms
});

async function initSearchSystem() {
    // 1. Referencias al DOM (Elementos del HTML del Navbar)
    const input = document.getElementById('searchInput');
    const dropdown = document.getElementById('searchResults');
    const list = document.getElementById('resultsList');
    const filtersBox = document.getElementById('searchFilters');
    const closeBtn = document.getElementById('searchClear');
    const chips = document.querySelectorAll('.filter-chip');

    // 2. Cargar la "Base de Datos" (JSON)
    try {
        const response = await fetch('/src/common/data/search-index.json');
        searchData = await response.json();
    } catch (error) {
        console.error("Error cargando índice de búsqueda:", error);
        return; // Si falla, no hacemos nada más
    }

    // 3. Lógica de los Filtros (CHIPS)
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            // A. Visual: Cambiar color azul
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            // B. Lógica: Actualizar variable global
            currentFilter = chip.dataset.filter;
            
            // C. Acción: Si ya hay texto escrito, volver a filtrar al momento
            const query = input.value.toLowerCase().trim();
            if(query.length > 0) runFilter(query, list);
        });
    });

    // 4. Evento: Al hacer FOCUS (Clic en la caja) -> Ver Historial
    input.addEventListener('focus', () => {
        if (input.value.trim().length === 0) {
            renderHistory(list);
            dropdown.style.display = 'block';
            filtersBox.style.display = 'none'; // En historial no mostramos filtros
        }
    });

    // 5. Evento: Al ESCRIBIR (Keyup) -> Buscar
    input.addEventListener('keyup', (e) => {
        const query = input.value.toLowerCase().trim();

        // Mostrar u ocultar la "X"
        closeBtn.style.display = query.length > 0 ? 'block' : 'none';

        // Si presiona ENTER: Guardar y cerrar
        if (e.key === 'Enter' && query.length > 0) {
            saveToHistory(input.value.trim()); 
            dropdown.style.display = 'none';
            // Aquí podrías redirigir: window.location.href = `/buscar?q=${query}`
            return;
        }

        // Si hay texto: Mostrar Filtros y Resultados
        if (query.length > 0) {
            dropdown.style.display = 'block';
            filtersBox.style.display = 'block'; // ¡Aquí aparecen los filtros!
            runFilter(query, list);
        } else {
            // Si borró todo: Volver a Historial
            renderHistory(list);
            filtersBox.style.display = 'none';
        }
    });

    // 6. Evento: Botón Limpiar (X)
    closeBtn.addEventListener('click', () => {
        input.value = '';
        closeBtn.style.display = 'none';
        filtersBox.style.display = 'none';
        renderHistory(list); // Volver al historial
        input.focus();
    });

    // 7. Cerrar si hace clic fuera del buscador
    document.addEventListener('click', (e) => {
        // Si el clic NO fue en el input Y NO fue en el dropdown...
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}

/**
 * FUNCIÓN CORE: Filtra los datos combinando TEXTO + CATEGORÍA
 */
function runFilter(query, container) {
    const results = searchData.filter(item => {
        // 1. ¿Coincide el texto? (Título o Tags)
        const matchText = item.title.toLowerCase().includes(query) || 
                          (item.tags && item.tags.toLowerCase().includes(query));
        
        // 2. ¿Coincide el filtro? (Si es 'all', pasa todo. Si no, debe ser exacto)
        const matchCategory = currentFilter === 'all' || item.category === currentFilter;

        // AMBOS deben ser verdaderos
        return matchText && matchCategory;
    });

    // Renderizar (Pintar) resultados
    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = '<div style="padding:20px; text-align:center; color:#94a3b8;">No encontramos coincidencias 😕</div>';
        return;
    }

    results.forEach(item => {
        const link = document.createElement('a');
        link.href = item.url;
        link.className = 'result-item'; // Clase definida en tu CSS
        
        // Al hacer clic, guardamos en historial porque fue un resultado útil
        link.addEventListener('click', () => saveToHistory(item.title));

        link.innerHTML = `
            <span class="item-icon">🔍</span>
            <div style="display:flex; flex-direction:column;">
                <span style="font-size:10px; font-weight:700; color:#0ea5e9; text-transform:uppercase;">${item.category}</span>
                <span class="item-text">${item.title}</span>
            </div>
        `;
        container.appendChild(link);
    });
}

/**
 * FUNCIONES DE HISTORIAL (LocalStorage)
 */
function renderHistory(container) {
    const history = JSON.parse(localStorage.getItem('devAgency_history')) || [];
    container.innerHTML = '';

    if (history.length === 0) return;

    // Etiqueta "Recientes"
    const label = document.createElement('div');
    label.className = 'history-header'; 
    label.innerText = 'Búsquedas recientes';
    container.appendChild(label);

    history.forEach(term => {
        const div = document.createElement('div');
        div.className = 'result-item';
        div.innerHTML = `
            <span class="item-icon" style="color:#94a3b8;">🕒</span>
            <span class="item-text" style="color:#64748b;">${term}</span>
        `;
        // Al hacer clic en historial, llenamos el input y buscamos
        div.addEventListener('click', () => {
            const input = document.getElementById('searchInput');
            input.value = term;
            input.dispatchEvent(new Event('keyup')); // Simulamos que el usuario escribió
        });
        container.appendChild(div);
    });
}

function saveToHistory(term) {
    let history = JSON.parse(localStorage.getItem('devAgency_history')) || [];
    // Evitar duplicados: Si ya existe, lo borramos para ponerlo al principio
    history = history.filter(h => h !== term);
    history.unshift(term); // Agregar al inicio
    if (history.length > 5) history.pop(); // Solo guardar los últimos 5
    localStorage.setItem('devAgency_history', JSON.stringify(history));
}