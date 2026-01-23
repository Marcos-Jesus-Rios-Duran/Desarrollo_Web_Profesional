/* src/common/scripts/ui-loader.js */

// Función genérica para cargar cualquier componente HTML externo
async function loadComponent(containerId, filePath) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        // No mostramos error console si no existe, para no ensuciar la consola
        // si una página no requiere un componente específico.
        return false; 
    }

    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`No se pudo cargar ${filePath}: ${response.statusText}`);
        }
        const htmlContent = await response.text();
        container.innerHTML = htmlContent;
        return true; // Retornamos true si cargó bien

    } catch (error) {
        console.error('Error cargando componente:', error);
        container.innerHTML = `<p style="color:red">Error cargando componente: ${filePath}</p>`;
        return false;
    }
}

// src/common/scripts/ui-loader.js (Actualización)

async function loadBreadcrumbs() {
    const filePath = '/src/common/components/layout/breadcrumbs.html'; 
    const containerId = 'breadcrumb-container';

    // 1. Cargar el HTML base
    const loaded = await loadComponent(containerId, filePath);

    if (loaded) {
        const container = document.getElementById(containerId);
        
        // --- NUEVA LÓGICA INTELIGENTE ---
        
        // A. Leer datos de la página actual
        const pageName = container.getAttribute("data-page") || "Sección Actual";
        
        // B. Leer datos del "Padre" (si existen)
        const parentName = container.getAttribute("data-parent"); // Ej: "Servicios"
        const parentLink = container.getAttribute("data-parent-link"); // Ej: "/src/pages/servicios.html"

        // C. Obtener referencias del DOM cargado
        const nav = container.querySelector(".breadcrumb-nav");
        const currentSpan = document.getElementById("breadcrumb-text");
        const separatorHtml = '<span class="breadcrumb-separator">/</span>';

        // D. Si hay padre, inyectarlo ANTES del elemento actual
        if (parentName && parentLink) {
            // Creamos el link del padre
            const parentNode = document.createElement("a");
            parentNode.href = parentLink;
            parentNode.textContent = parentName;
            
            // Creamos el separador
            const separatorNode = document.createElement("span");
            separatorNode.className = "breadcrumb-separator";
            separatorNode.innerHTML = "›"; // Usamos la flechita moderna
            separatorNode.className = "breadcrumb-separator"; // Aseguramos que tenga la clase
            // Insertamos: Padre -> Separador -> (antes del span actual)
            nav.insertBefore(separatorNode, currentSpan);
            nav.insertBefore(parentNode, separatorNode); // El link va antes del separador nuevo
        }

        // E. Poner el nombre de la página actual
        if (currentSpan) {
            currentSpan.innerText = pageName;
        }
    }
}

// === EJECUCIÓN AL CARGAR LA PÁGINA ===
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Cargar el Navbar
    loadComponent('navbar-container', '/src/common/components/layout/Navbar.html');

    // 2. Cargar los Breadcrumbs (Con lógica extra de texto)
    loadBreadcrumbs(); 
    
    // 3. Cargar el Footer
    loadComponent('footer-container', '/src/common/components/layout/Footer.html');
});