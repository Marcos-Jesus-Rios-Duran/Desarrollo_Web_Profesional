/**
 * MOTOR DE BÚSQUEDA DEVAGENCY
 */

let searchData = [];
let currentFilter = 'all';

// Iniciamos directamente porque ui-loader ya garantizó que el HTML existe
initSearchSystem();

async function initSearchSystem() {
    const input = document.getElementById('searchInput');
    const dropdown = document.getElementById('searchResults');
    const list = document.getElementById('resultsList');
    const filtersBox = document.getElementById('searchFilters');
    const closeBtn = document.getElementById('searchClear');
    const chips = document.querySelectorAll('.filter-chip');

    // Validación de seguridad
    if (!input) {
        console.error("No se encontró el input de búsqueda");
        return;
    }

    // 1. Cargar la Base de Datos JSON
    try {
        const response = await fetch('/src/common/data/search-index.json');
        if (!response.ok) throw new Error("No se pudo cargar el JSON");
        searchData = await response.json();
    } catch (error) {
        console.error("Error cargando índice:", error);
        return;
    }

    // 2. Lógica de Filtros (Chips)
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentFilter = chip.dataset.filter;

            const query = input.value.toLowerCase().trim();
            if(query.length > 0) runFilter(query, list);
        });
    });

    // 3. Eventos del Input
    input.addEventListener('focus', () => {
        if (input.value.trim().length === 0) {
            renderHistory(list);
            dropdown.style.display = 'block';
            filtersBox.style.display = 'none';
        }
    });

    input.addEventListener('keyup', (e) => {
        const query = input.value.toLowerCase().trim();
        closeBtn.style.display = query.length > 0 ? 'block' : 'none';

        if (e.key === 'Enter' && query.length > 0) {
            saveToHistory(input.value.trim());
            dropdown.style.display = 'none';
            // window.location.href = `/buscar?q=${query}`; // Opcional
            return;
        }

        if (query.length > 0) {
            dropdown.style.display = 'block';
            filtersBox.style.display = 'block';
            runFilter(query, list);
        } else {
            renderHistory(list);
            filtersBox.style.display = 'none';
        }
    });

    // 4. Botón Cerrar (X)
    closeBtn.addEventListener('click', () => {
        input.value = '';
        closeBtn.style.display = 'none';
        filtersBox.style.display = 'none';
        renderHistory(list);
        input.focus();
    });

    // 5. Clic fuera para cerrar
    document.addEventListener('click', (e) => {
        if (!input.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
}

function runFilter(query, container) {
    const results = searchData.filter(item => {
        const matchText = item.title.toLowerCase().includes(query) ||
                          (item.tags && item.tags.toLowerCase().includes(query));
        const matchCategory = currentFilter === 'all' || item.category === currentFilter;
        return matchText && matchCategory;
    });

    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = '<div style="padding:20px; text-align:center; color:#94a3b8;">No encontramos coincidencias 😕</div>';
        return;
    }

    results.forEach(item => {
        const link = document.createElement('a');
        link.href = item.url;
        link.className = 'result-item';
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

function renderHistory(container) {
    const history = JSON.parse(localStorage.getItem('devAgency_history')) || [];
    container.innerHTML = '';
    if (history.length === 0) return;

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
        div.addEventListener('click', () => {
            const input = document.getElementById('searchInput');
            input.value = term;
            input.dispatchEvent(new Event('keyup'));
        });
        container.appendChild(div);
    });
}

function saveToHistory(term) {
    let history = JSON.parse(localStorage.getItem('devAgency_history')) || [];
    history = history.filter(h => h !== term);
    history.unshift(term);
    if (history.length > 5) history.pop();
    localStorage.setItem('devAgency_history', JSON.stringify(history));
}