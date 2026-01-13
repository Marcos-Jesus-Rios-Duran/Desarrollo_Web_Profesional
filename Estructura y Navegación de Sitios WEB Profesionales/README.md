# Estructura de Navegación (Breadcrumbs)

Este documento define la jerarquía de navegación ("migas de pan") basada en el mapa de sitio del proyecto. El objetivo es permitir al usuario identificar su ubicación actual y retroceder niveles fácilmente.

## 1. Definición de Rutas

A continuación se detallan los recorridos de navegación para tres escenarios clave de la arquitectura: Servicios, Portafolio y Área de Usuario.

### Escenario A: Navegación de Servicios (Público)
*Contexto: El usuario explora los servicios específicos ofrecidos.*

> **Ruta Visual:** `Inicio` / `Servicios` / **Apps Móviles**

* **Nivel 0:** [Inicio] (Link al Home)
* **Nivel 1:** [Servicios] (Link a la lista de servicios)
* **Nivel 2:** **Apps Móviles** (Texto estático - Página Actual)

### Escenario B: Navegación de Portafolio (Público)
*Contexto: El usuario revisa la evidencia de trabajos anteriores.*

> **Ruta Visual:** `Inicio` / `Portafolio` / **Casos de Éxito**

* **Nivel 0:** [Inicio] (Link al Home)
* **Nivel 1:** [Portafolio] (Link al índice del portafolio)
* **Nivel 2:** **Casos de Éxito** (Texto estático - Página Actual)

### Escenario C: Dashboard de Usuario (Privado)
*Contexto: El usuario autenticado gestiona sus pagos dentro del sistema.*

> **Ruta Visual:** `Inicio` / `Área de Usuario` / `Dashboard` / **Pagos**

* **Nivel 0:** [Inicio] (Link a Landing Page)
* **Nivel 1:** [Área de Usuario] (Link al Hub de acceso)
* **Nivel 2:** [Dashboard] (Link al Resumen Principal)
* **Nivel 3:** **Pagos** (Texto estático - Página Actual)

---

## 2. Reglas de Diseño e Implementación

Para asegurar una buena Experiencia de Usuario (UX), los breadcrumbs deben cumplir con las siguientes directrices:

1.  **Estado Activo:** El último elemento de la lista (la página actual) debe estar visualmente destacado (negrita o color diferente) y **no debe tener enlace**.
2.  **Separadores:** Se utilizará el carácter `/` o el símbolo `>` (chevron-right) para separar los niveles.
3.  **Jerarquía:** Siempre deben colocarse en la parte superior del contenedor principal, debajo del menú de navegación (Header).

### Ejemplo de Estructura de Datos (JSON)

Para la implementación dinámica en el frontend:

```json
[
  {
    "label": "Inicio",
    "url": "/",
    "active": false
  },
  {
    "label": "Servicios",
    "url": "/servicios",
    "active": false
  },
  {
    "label": "Apps Móviles",
    "url": null,
    "active": true
  }
]