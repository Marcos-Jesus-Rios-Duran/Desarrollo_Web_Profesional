// ==========================================
// 🧪 SCRIPT DE PRUEBAS DE EFECTIVIDAD (QA)
// ==========================================

const testSuite = [
    // ==========================================
    // ✅ GRUPO 1: CLIENTES REALES (Deberían pasar)
    // ==========================================
    { text: "Hola, me gustaría cotizar una aplicación móvil para iOS y Android.", expected: true, type: "Normal Formal" },
    { text: "Necesito un sistema de inventario con Python y React.", expected: true, type: "Técnico Estándar" },
    { text: "Busco experto en C++ y Rust para arquitectura de software.", expected: true, type: "Técnico Hardcore" },
    { text: "Hola, ¿cuánto cuesta una página web básica?", expected: true, type: "Cliente Preguntón" },
    { text: "Requiero integración de API Rest con base de datos MongoDB.", expected: true, type: "Full Stack" },
    { text: "El proyecto es para la empresa de transportes del norte.", expected: true, type: "Palabra 'Transporte' (Test Consonantes)" },
    { text: "Estamos en la etapa de construcción del sitio.", expected: true, type: "Palabra 'Construcción' (Test Consonantes)" },
    { text: "Saludos cordiales, quedo a la espera de su respuesta.", expected: true, type: "Saludo Formal" },
    { text: "Quiero migrar mi e-commerce de WordPress a Shopify.", expected: true, type: "Plataformas" },
    { text: "Necesito factura.", expected: true, type: "Frase Corta Válida" },
    { text: "Hola.", expected: true, type: "Palabra Única Válida" },
    { text: "Soy Jeff Bezos y quiero invertir.", expected: true, type: "Nombres Propios (Mayúsculas)" },
    { text: "Me interesa usar Docker y Kubernetes en AWS.", expected: true, type: "DevOps Lingo" },
    { text: "Diseño UX/UI con Figma y Adobe XD.", expected: true, type: "Diseño Lingo" },
    { text: "La base de datos está en SQL Server.", expected: true, type: "SQL Lingo" },

    // ==========================================
    // ❌ GRUPO 2: BASURA OBVIA (Keyboard Smash)
    // ==========================================
    { text: "asdf asdf asdf", expected: false, type: "Repetición Basura" },
    { text: "lksjd fkljs dflk", expected: false, type: "Teclazo Aleatorio" },
    { text: "poiuy trewq mnbvc", expected: false, type: "Patrón Teclado" },
    { text: "Hola quiero asdf ghjkl", expected: false, type: "Mitad bien / Mitad mal" },
    { text: "1234 5678 9012", expected: false, type: "Solo Números (Spam telefónico)" }, // Ojo: A veces esto se quiere permitir
    { text: "ñlkj ñlkj ñlkj", expected: false, type: "Teclazo con Ñ" },

    // ==========================================
    // ❌ GRUPO 3: REGLAS ESPECÍFICAS (Tu Lógica)
    // ==========================================
    { text: "qiero saber precios", expected: false, type: "Regla Q (sin U)" },
    { text: "porqe no me contestan", expected: false, type: "Regla Q (qe sin u)" },
    { text: "bcdfgh jklmnp", expected: false, type: "Exceso Consonantes (5+)" },
    { text: "tengo muxa ambre", expected: false, type: "Mala Ortografía (x por ch)" },
    { text: "kiero una web", expected: false, type: "Mala Ortografía (k por q)" },

    // ==========================================
    // ❌ GRUPO 4: TRAMPAS DE PALABRAS CORTAS (Tu nueva regla)
    // ==========================================
    { text: "sl jk wp xl", expected: false, type: "Cortas Inventadas" },
    { text: "Hola fv gb hn", expected: false, type: "Cortas Raras entre texto" },
    { text: "ux yz ab cd", expected: false, type: "Abecedario Roto" },

    // ==========================================
    // ❌ GRUPO 5: SPAM EN INGLÉS O LOREM IPSUM
    // ==========================================
    { text: "Lorem ipsum dolor sit amet consectetur", expected: false, type: "Lorem Ipsum" },
    { text: "Buy cheap watches now free shipping", expected: false, type: "Spam Inglés" },
    { text: "Click here for free bitcoin", expected: false, type: "Crypto Spam" },

    // ==========================================
    // ⚠️ GRUPO 6: ZONA DE RIESGO (Edge Cases)
    // ==========================================
    // Estos son los que suelen fallar si la config es muy estricta
    { text: "El backend esta hecho en Go.", expected: true, type: "Palabra corta 'Go' (Lenguaje)" },
    { text: "Uso C# para todo.", expected: true, type: "Símbolos en Tech" },
    { text: "Mi nombre es X Æ A-12", expected: false, type: "Nombre Elon Musk (Difícil)" }, // Probablemente falle, y está bien
    { text: "Holaaaaaaaaaaa", expected: false, type: "Caracteres repetidos" }, // Tu detector no tiene regla para esto aun, pasará como True
    { text: "Instrucción de transferencia", expected: true, type: "Palabra con 4 consonantes (nstr)" },
    // ==========================================
    // 🇲🇽 GRUPO 7: LATINOAMÉRICA Y MODISMOS
    // ==========================================
    { text: "Ocupo una pagina web para mi negocio.", expected: true, type: "Modismo 'Ocupo' (Mx)" },
    { text: "Cuanto sale el desarrollo de una app?", expected: true, type: "Pregunta directa (Mx)" },
    { text: "Me urge la cotizacion para mañana.", expected: true, type: "Urgencia Real" },
    { text: "Quisiera informes sobre sus servicios.", expected: true, type: "Formalidad básica" },
    { text: "Echenme la mano con el precio.", expected: true, type: "Informal pero válido" },

    // ==========================================
    // 🧠 GRUPO 8: INTELIGENCIA ARTIFICIAL (Nuevos Nichos)
    // ==========================================
    { text: "Quiero integrar ChatGPT en mi sitio.", expected: true, type: "IA Lingo" },
    { text: "Busco una solución con IA generativa.", expected: true, type: "IA Lingo" },
    { text: "Necesito un chatbot entrenado con mis datos.", expected: true, type: "Chatbot Lingo" },

    // ==========================================
    // 🕸️ GRUPO 9: ATAQUES DE SPAM AVANZADO
    // ==========================================
    { text: "Viagra cheap online pharmacy.", expected: false, type: "Spam Farma" },
    { text: "Make money fast working from home.", expected: false, type: "Spam Dinero" },
    { text: "H0la qu1er0 una w3b.", expected: true, type: "Leet Speak (Difícil)" }, // Reto: ¿Debería pasar? Probablemente NO porque parece spam, pero es legible.
    { text: "http://www.sitio-malicioso.com", expected: false, type: "Solo URL (Posible riesgo)" },

    // ==========================================
    // ⌨️ GRUPO 10: ERRORES DE DEDO ACEPTABLES
    // ==========================================
    { text: "Hla quiero contizar.", expected: true, type: "Error leve (Hla)" },
    { text: "Necesito desaollo web.", expected: true, type: "Error medio (come letras)" },
    { text: "Busco progamador java.", expected: true, type: "Error común (progamador)" },

    // ==========================================
    // 🛡️ GRUPO 11: INTENTOS DE INYECCIÓN (XSS/SQL)
    // ==========================================
    { text: "<script>alert('hack')</script>", expected: false, type: "XSS Attack" },
    { text: "SELECT * FROM users;", expected: false, type: "SQL Injection" },

    // ==========================================
    // 🏢 GRUPO 12: EMPRESARIAL SERIO
    // ==========================================
    { text: "Solicito presupuesto para ERP empresarial.", expected: true, type: "ERP Lingo" },
    { text: "Requerimos consultoría en ciberseguridad.", expected: true, type: "Seguridad Lingo" },
    { text: "Buscamos partner tecnológico para startup.", expected: true, type: "Startup Lingo" },
    { text: "Implementación de CRM Salesforce.", expected: true, type: "CRM Lingo" },
    { text: "Mantenimiento de legacy code en Cobol.", expected: true, type: "Legacy Lingo" },
    // ==========================================
    // 💼 GRUPO 13: RECLUTAMIENTO Y RRHH (Validar que es texto real)
    // ==========================================
    { text: "Busco chamba de programador junior.", expected: true, type: "Búsqueda empleo (Mx)" },
    { text: "Adjunto mi CV para la vacante de frontend.", expected: true, type: "Candidato Formal" },
    { text: "Tienen practicas profesionales para estudiantes?", expected: true, type: "Estudiante" },
    { text: "Necesito un sistema de control de nomina y asistencia.", expected: true, type: "Software RRHH" },
    { text: "Busco desarrollador freelance para apoyo.", expected: true, type: "Outsourcing" },

    // ==========================================
    // 🏥 GRUPO 14: NICHOS (Médico, Inmobiliaria, Edu)
    // ==========================================
    { text: "Plataforma de telemedicina con videollamada.", expected: true, type: "Nicho Médico" },
    { text: "App para agendar citas medicas y expediente.", expected: true, type: "Nicho Médico" },
    { text: "Sitio web para inmobiliaria con recorridos virtuales.", expected: true, type: "Nicho Real Estate" },
    { text: "Sistema de gestion escolar para universidad.", expected: true, type: "Nicho EdTech" },
    { text: "Tienda de cursos online tipo Udemy.", expected: true, type: "Nicho E-learning" },

    // ==========================================
    // 🆘 GRUPO 15: SOPORTE Y EMERGENCIAS
    // ==========================================
    { text: "Mi sitio web se cayo, error 504.", expected: true, type: "Soporte Técnico" },
    { text: "Hackearon mi pagina, necesito ayuda urgente.", expected: true, type: "Ciberseguridad Real" },
    { text: "No puedo acceder al panel de administrador.", expected: true, type: "Problema Acceso" },
    { text: "El certificado SSL caduco y sale sitio no seguro.", expected: true, type: "Problema SSL" },
    { text: "Necesito recuperar un respaldo de la base de datos.", expected: true, type: "Backup Restore" },

    // ==========================================
    // 🇺🇸 GRUPO 16: SPANGLISH Y TECH MODERNO (Muy común)
    // ==========================================
    { text: "Hacer deploy a produccion en Vercel.", expected: true, type: "DevOps Spanglish" },
    { text: "El dashboard no carga los analytics.", expected: true, type: "Analytics Spanglish" },
    { text: "Queremos una landing page para leads.", expected: true, type: "Marketing Spanglish" },
    { text: "Integrar pasarela de pagos Stripe y PayPal.", expected: true, type: "FinTech Lingo" },
    { text: "Bug en el login de la app iOS.", expected: true, type: "QA Spanglish" },

    // ==========================================
    // 🤖 GRUPO 17: SPAM ROBÓTICO / SEO (Debe fallar)
    // ==========================================
    { text: "Best seo ranking services google #1.", expected: false, type: "SEO Spam (Inglés)" },
    { text: "Investment opportunity partnership sir.", expected: false, type: "Estafa Nigeriana" },
    { text: "Crytp0 currencY inv3stment.", expected: false, type: "Crypto Obvio" },
    { text: "Haga dinero rapido trabajando desde casa.", expected: false, type: "Spam MLM (Español)" }, // Reto: Puede que pase si está bien escrito, pero es spam de contenido.
    { text: "http://viagra-free.com/buy-now", expected: false, type: "Link Spam" },

    // ==========================================
    // 🗣️ GRUPO 18: CONVERSACIONAL CORTO (Difícil)
    // ==========================================
    { text: "Info.", expected: true, type: "Ultra Corto" }, // Reto: Palabra única válida
    { text: "Precio?", expected: true, type: "Ultra Corto" },
    { text: "Me interesa.", expected: true, type: "Frase mínima" },
    { text: "Aceptan tarjeta de credito?", expected: true, type: "Pregunta pago" },
    { text: "Donde estan ubicados?", expected: true, type: "Pregunta ubicación" },
    // ==========================================
    // 🏗️ GRUPO 19: SAAS, LOGÍSTICA Y RETAIL (Nuevos Nichos)
    // ==========================================
    { text: "Necesito un punto de venta para mi tienda de ropa.", expected: true, type: "Retail/POS" },
    { text: "Desarrollo de plugins personalizados para Shopify.", expected: true, type: "E-commerce Pro" },
    { text: "Me intersa mucho su trbajo.", expected: true, type: "Error de dedo (intersa/trbajo)" },
    { text: "Que onda carnal, ocupo un paro con una pagina.", expected: true, type: "Jerga Informal Mx" },
    { text: "Busco crear un modelo de negocio tipo SaaS.", expected: true, type: "Negocios Tech" },
    { text: "Integracion con Bitso para pagos en crypto.", expected: true, type: "Fintech Mx" },
    { text: "Quedo al pendiente de su resuesta.", expected: true, type: "Typo (resuesta)" },
    { text: "Discount viagra now limited time offer.", expected: false, type: "Spam Inglés Agresivo" },
    { text: "zxcv bnm qwert asdfg.", expected: false, type: "Keyboard Smash Lineal" },
    { text: "!!! ??? !!!", expected: false, type: "Solo Símbolos" },
    { text: "Gestion de mis redes sociales y ADS.", expected: true, type: "Marketing Digital" },
    { text: "App estilo Uber Eats para mi restaurante.", expected: true, type: "Nicho Delivery" },
    { text: "Sistema de rastreo GPS para flotillas de camiones.", expected: true, type: "Logística" },
    { text: "LMS para impartir clases de ingles online.", expected: true, type: "EdTech" },
    { text: "Aviso de privacidad y terminos y condiciones.", expected: true, type: "Legal Web" },
    { text: "spam spam spam spam spam.", expected: false, type: "Repetición de palabra" },
    { text: "  .", expected: false, type: "Caracteres Rotos" },
    { text: "Estrategia de SEO y SEM con Google Ads.", expected: true, type: "Marketing Pro" },
    { text: "CRM para agentes inmobiliarios independientes.", expected: true, type: "Inmobiliaria" },
    { text: "Migracion de servidores fisicos a la nube de AWS.", expected: true, type: "Infraestructura" }
];

function ejecutarPruebas() {
    console.clear();
    console.log("%c🧪 INICIANDO PRUEBAS DE ROBUSTEZ...", "color: blue; font-weight: bold; font-size: 14px;");

    let tp = 0; // Verdaderos Positivos (Era bueno y dijimos bueno)
    let tn = 0; // Verdaderos Negativos (Era basura y dijimos basura)
    let fp = 0; // Falsos Positivos (Era basura y se nos coló)
    let fn = 0; // Falsos Negativos (Era bueno y lo bloqueamos por error)

    const resultados = [];

    testSuite.forEach((test, index) => {
        // Ejecutamos TU función
        const resultado = GibberishDetector.analizar(test.text);

        // Verificamos si acertamos
        const acierto = resultado.valid === test.expected;

        // Clasificamos el resultado para la Matriz
        let estado = "";
        if (test.expected && resultado.valid) { tp++; estado = "✅ TP"; }
        else if (!test.expected && !resultado.valid) { tn++; estado = "✅ TN"; }
        else if (!test.expected && resultado.valid) { fp++; estado = "❌ FP (Se coló basura)"; }
        else if (test.expected && !resultado.valid) { fn++; estado = "❌ FN (Bloqueo injusto)"; }

        resultados.push({
            "Texto": test.text.substring(0, 30) + "...",
            "Tipo": test.type,
            "Esperado": test.expected ? "Válido" : "Basura",
            "Obtenido": resultado.valid ? "Válido" : "Basura",
            "Estado": estado,
            "Razón (Debug)": resultado.reason || "OK"
        });
    });

    // Mostramos tabla detalle
    console.table(resultados);

    // --- CÁLCULO DE MÉTRICAS (DATA SCIENCE) ---
    const total = testSuite.length;
    const accuracy = ((tp + tn) / total) * 100; // Exactitud general
    const precision = tp + fp > 0 ? (tp / (tp + fp)) * 100 : 0; // ¿Qué tanto confío cuando dice "es válido"?
    const recall = tp + fn > 0 ? (tp / (tp + fn)) * 100 : 0; // Sensibilidad: ¿Atrapamos todos los buenos?

    console.log("%c📊 REPORTE FINAL", "font-weight: bold; font-size: 16px; margin-top: 20px;");
    console.log(`Total Pruebas: ${total}`);
    console.log(`✅ Aciertos: ${tp + tn}`);
    console.log(`❌ Errores: ${fp + fn}`);
    console.log("-----------------------------");

    // Coloreamos la calificación
    const colorAcc = accuracy > 80 ? "green" : "red";
    console.log(`%c🎯 EXACTITUD (Accuracy): ${accuracy.toFixed(2)}%`, `color: ${colorAcc}; font-weight: bold;`);
    console.log(`🔍 SENSIBILIDAD (Recall): ${recall.toFixed(2)}% (Capacidad de aceptar textos buenos)`);
    console.log(`🛡️ PRECISIÓN (Precision): ${precision.toFixed(2)}% (Capacidad de filtrar basura)`);

    if (fn > 0) console.warn("⚠️ ALERTA: Tienes Falsos Negativos. Estás bloqueando usuarios reales. Revisa la tabla.");
    if (fp > 0) console.warn("⚠️ ALERTA: Tienes Falsos Positivos. Se está colando basura.");
}

// Ejecutar automáticamente al pegar
ejecutarPruebas();