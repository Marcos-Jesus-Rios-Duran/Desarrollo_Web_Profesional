/* src/common/scripts/ui-loader.js */

// 1. Función genérica para cargar componentes HTML
async function loadComponent(containerId, filePath) {
    const container = document.getElementById(containerId);
    if (!container) return false;

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Error ${response.status}: ${filePath}`);

        const htmlContent = await response.text();
        container.innerHTML = htmlContent;
        return true; // Retornamos éxito
    } catch (error) {
        console.error('UI-Loader Error:', error);
        return false;
    }
}

// 2. Función para inyectar el CEREBRO del buscador
function loadSearchEngine() {
    // Evitamos cargar el script dos veces si ya existe
    if (document.querySelector('script[src*="search-engine.js"]')) return;

    const script = document.createElement('script');
    script.src = '/src/common/scripts/search-engine.js';
    script.defer = true; // Importante: carga en paralelo pero ejecuta al final
    document.body.appendChild(script);
    // console.log("🔍 Motor de búsqueda inyectado correctamente.");
}

// 3. Función inteligente de Breadcrumbs
async function loadBreadcrumbs() {
    const containerId = 'breadcrumb-container';
    const loaded = await loadComponent(containerId, '/src/common/components/layout/breadcrumbs.html');

    if (loaded) {
        const container = document.getElementById(containerId);

        // A. Leer datos
        const pageName = container.getAttribute("data-page") || "Sección Actual";
        const parentName = container.getAttribute("data-parent");
        const parentLink = container.getAttribute("data-parent-link");

        // B. Referencias DOM
        const nav = container.querySelector(".breadcrumb-nav");
        const currentSpan = document.getElementById("breadcrumb-text");

        // C. Inyectar Padre (Si existe)
        if (parentName && parentLink) {
            const parentNode = document.createElement("a");
            parentNode.href = parentLink;
            parentNode.textContent = parentName;

            const separatorNode = document.createElement("span");
            separatorNode.className = "breadcrumb-separator";
            separatorNode.innerHTML = "›";

            nav.insertBefore(separatorNode, currentSpan);
            nav.insertBefore(parentNode, separatorNode);
        }

        // D. Actualizar página actual
        if (currentSpan) currentSpan.innerText = pageName;
    }
}

// === 4. EJECUCIÓN MAESTRA (Aquí está el cambio clave) ===
document.addEventListener('DOMContentLoaded', async () => {

    // A. Cargar NAVBAR y luego activar el BUSCADOR
    const navbarLoaded = await loadComponent('navbar-container', '/src/common/components/layout/Navbar.html');

    if (navbarLoaded) {
        loadSearchEngine();
    }

    // B. Cargar Breadcrumbs
    loadBreadcrumbs();

    // C. Cargar Footer
    loadComponent('footer-container', '/src/common/components/layout/Footer.html');
});