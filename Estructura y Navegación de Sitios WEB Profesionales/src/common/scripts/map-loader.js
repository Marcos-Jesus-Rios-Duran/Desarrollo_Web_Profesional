/**
 * map-loader.js
 * Inyecta un mapa de Google (Iframe gratuito) dentro del contenedor #google-map
 */

document.addEventListener("DOMContentLoaded", function() {
    loadMap();
});

function loadMap() {
    const mapContainer = document.getElementById("google-map");

    if (!mapContainer) {
        // Si no existe el contenedor (ej. en otra página), no hacemos nada
        return;
    }

    // Configuración: Coordenadas o Dirección
    // Usamos encodeURIComponent para asegurar que los espacios y tildes no rompan el link
    const direccion = "Reforma 222, Ciudad de México"; 
    
    // Código HTML del Iframe (Versión Embed Gratuita)
    const iframeHTML = `
        <iframe 
            width="100%" 
            height="100%" 
            frameborder="0" 
            style="border:0; display: block;" 
            src="https://maps.google.com/maps?q=${encodeURIComponent(direccion)}&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            allowfullscreen 
            loading="lazy">
        </iframe>
    `;

    // Inyectar el mapa
    mapContainer.innerHTML = iframeHTML;
}