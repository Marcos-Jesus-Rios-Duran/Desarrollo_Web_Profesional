/* src/common/scripts/ui-loader.js */

// Función genérica para cargar cualquier componente HTML externo
async function loadComponent(containerId, filePath) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Error: No encontré el contenedor con id "${containerId}"`);
        return;
    }

    try {
        // 1. Pedimos el archivo al servidor (fetch)
        const response = await fetch(filePath);
        
        // 2. Si hay error (ej. 404), avisamos
        if (!response.ok) {
            throw new Error(`No se pudo cargar ${filePath}: ${response.statusText}`);
        }

        // 3. Convertimos la respuesta a texto HTML
        const htmlContent = await response.text();

        // 4. Inyectamos el HTML dentro del div
        container.innerHTML = htmlContent;

        // Opcional: Si el componente tiene scripts internos, aquí habría que ejecutarlos,
        // pero para HTML/CSS puro esto es suficiente.

    } catch (error) {
        console.error('Error cargando componente:', error);
        container.innerHTML = `<p style="color:red">Error cargando componente: ${filePath}</p>`;
    }
}

// === EJECUCIÓN AL CARGAR LA PÁGINA ===
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Cargar el Navbar (Usando la ruta relativa desde el index.html)
    loadComponent('navbar-container', '/src/common/components/layout/Navbar.html');

    // 2. Cargar el Dashboard (o el contenido principal)
    // Supongamos que creas un archivo dashboard.html en 'features/user_dashboard'
    // loadComponent('dashboard-container', '/src/features/user_dashboard/dashboard.html');
    
    // 3. Cargar el Footer (Que vamos a crear ahora)
    loadComponent('footer-container', '/src/common/components/layout/Footer.html');
});