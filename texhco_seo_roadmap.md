# Análisis y Roadmap SEO — Texh Co.
**Documento estratégico de posicionamiento orgánico | Abril 2026**

---

## Resumen Ejecutivo

Texh Co. tiene un branding sólido, un copy orientado a conversión y una propuesta de valor diferenciada para negocios locales. Sin embargo, el contenedor técnico actual (SPA React sin SSR/SSG) y la arquitectura de una sola página frenan activamente el potencial de posicionamiento orgánico. El objetivo de este roadmap es transformar la infraestructura digital de Texh Co. en un activo SEO de primer nivel sin comprometer la estética ni la experiencia de usuario.

**Situación actual:**
- La web es prácticamente invisible para Google más allá del nombre de marca.
- No existen páginas transaccionales por servicio ni por industria.
- No hay metadatos dinámicos, Schema Markup ni internacionalización SEO-compatible.
- El stack React SPA retrasa el rastreo e indexación de Googlebot.

**Objetivo a 90 días:** tener la base técnica sólida, las primeras 5-8 landing pages activas y un sistema replicable para escalar a nuevas industrias y ciudades.

---

## 1. Diagnóstico Técnico del Estado Actual

### 1.1 Stack y Renderizado

La web usa React con Vite como Single Page Application (SPA). En una SPA, el HTML inicial que recibe el crawler de Google está prácticamente vacío: el contenido real lo inyecta JavaScript después de que el navegador lo ejecuta. Aunque Googlebot puede ejecutar JavaScript, este proceso es más lento y los resultados de indexación son menos predecibles que con HTML estático o SSR [cite:42].

Para una marca nueva como Texh Co. — donde cada día sin indexación correcta es una oportunidad perdida —, este es el mayor bloqueante técnico a resolver antes de invertir en contenido.

### 1.2 Arquitectura de Rutas Actual

| Ruta existente | Tipo | Estado SEO |
|---|---|---|
| `/` | Home SPA | Sin metadatos únicos, todo el contenido en un solo HTML |
| `/about` | Página | Sin meta title propio |
| `/estimator` | Herramienta | Sin indexación controlada |
| `/audit` | CTA | Sin contenido optimizado |
| `/portal` | Área privada | Debe excluirse del sitemap |
| `/es/*` | Idioma | No existe como ruta URL, solo cambia el estado interno |

**Lo que falta:** páginas por servicio, páginas por industria, casos de estudio, FAQ pages y páginas locales por ciudad.

### 1.3 Metadatos y Schema

- **No hay `react-helmet` o equivalente:** el `<title>` y la `<meta description>` son los mismos en todas las rutas.
- **No hay datos estructurados (JSON-LD):** Google y las IAs no pueden entender de forma estructurada qué es Texh Co., qué servicios ofrece ni para quién.
- **No hay Open Graph** optimizado por página: si alguien comparte `/services/local-seo` en LinkedIn, no se muestra el thumbnail ni el texto correctos.

### 1.4 Internacionalización

El sistema de traducciones actual (i18n.jsx) funciona en el cliente: cambia el texto de la página sin cambiar la URL. Para Google, `texhco.com` en inglés y `texhco.com` en español son la misma URL, lo que significa que:

- Solo un idioma se indexa correctamente.
- Se pierde todo el potencial de posicionamiento en búsquedas en español.
- Sin etiquetas `hreflang`, Google no puede ofrecer la versión correcta según el idioma del usuario.

---

## 2. Roadmap por Fases

### Fase 1 — Base Técnica (Semanas 1–3)

Esta fase es la más crítica. Sin una base técnica correcta, todo el contenido que se cree después será menos efectivo.

#### Opción A (Recomendada): Migrar a Astro

Astro es actualmente el framework más adecuado para webs corporativas con fuerte orientación SEO. Genera HTML estático por defecto (0 JS en cliente si no se necesita), admite componentes de React tal como están en el proyecto, es extremadamente rápido (Core Web Vitals excelentes de base) y tiene soporte nativo para sitemap, robots, hreflang y metadatos por ruta.

La migración de los componentes React existentes a Astro es directa: Astro los importa con `client:load` o `client:visible` solo donde hay interactividad real.

**Coste de migración estimado:** 2-4 días de trabajo si los componentes están bien estructurados.

#### Opción B: Migrar a Next.js App Router

Next.js es más complejo que Astro para una web corporativa estática, pero es la opción más adecuada si en el futuro el portal de clientes (`/portal`) necesita funcionalidades de SSR dinámico, autenticación o API routes integradas. El App Router de Next.js 15 tiene soporte nativo para `generateMetadata` por página, que es la solución ideal para los metadatos dinámicos.

#### Opción C (Parche temporal): Vite + SSG Plugin

Si la migración no es viable a corto plazo, se puede instalar `vite-plugin-ssr` o configurar `vite-ssg` para prerenderizar las rutas estáticas en el build. Esta opción es más frágil y tiene limitaciones con el sistema de traducciones actual, pero permite lanzar las mejoras de metadatos y Schema sin cambiar el framework.

#### Checklist técnico de la Fase 1

- [ ] Elegir framework destino (Astro recomendado).
- [ ] Migrar componentes actuales al nuevo stack.
- [ ] Implementar `<title>` y `<meta description>` únicos por ruta.
- [ ] Añadir Open Graph y Twitter Cards por página.
- [ ] Generar `sitemap.xml` automático en el build.
- [ ] Configurar `robots.txt` (excluir `/portal`, `/estimator` si procede).
- [ ] Verificar la web en Google Search Console.
- [ ] Activar Core Web Vitals en Search Console y apuntar a LCP < 2s.
- [ ] Añadir `canonical` URL en cada página.

---

### Fase 2 — Arquitectura de URLs y Contenido (Semanas 3–8)

Una vez la base técnica es sólida, se expande la arquitectura de rutas. El objetivo es tener páginas indexables y transaccionales para cada servicio e industria objetivo.

#### Estructura de URLs recomendada

```
texhco.com/
├── services/
│   ├── premium-web-design
│   ├── local-seo
│   ├── google-business-optimization
│   ├── booking-lead-systems
│   ├── business-automation
│   └── client-portal
├── industries/
│   ├── barbershops-salons
│   ├── roofing-contractors
│   ├── cleaning-services
│   ├── restaurants-cafes
│   ├── hvac-plumbing
│   └── lawyers-accountants
├── case-studies/
│   └── [slug-del-caso]
├── about/
├── audit/
├── blog/ (futuro)
└── portal/ (privado, excluido del sitemap)
```

Para la versión en español:

```
texhco.com/es/
├── servicios/
│   ├── diseño-web-premium
│   ├── seo-local
│   └── ...
├── industrias/
│   └── ...
```

#### Template de landing por servicio

Cada página de servicio debe seguir esta estructura de contenido:

1. **H1:** Nombre del servicio + beneficio principal (ej. "Local SEO for Small Businesses that Need More Calls")
2. **Problema:** Qué está fallando sin este servicio.
3. **Sistema Texh Co.:** Cómo se resuelve, con qué metodología.
4. **Resultados y prueba:** Métricas, caso de estudio embebido o testimonial.
5. **FAQ Section:** 5-8 preguntas frecuentes (vital para AI Overviews).
6. **CTA:** Solicitar Auditoría / Agendar Sesión.
7. **Internal links:** A industrias relacionadas y a otros servicios.

#### Template de landing por industria

1. **H1:** Servicio + Industria + Intención (ej. "Web Design & Local SEO for Barbershops")
2. **Dolores específicos de esa industria** (reservas perdidas, llamadas sin contestar, etc.)
3. **Sistema adaptado:** Qué incluye el sistema Texh Co. para ese sector.
4. **Antes / Después / Sistema / Resultado:** Caso de estudio real o simulado con datos.
5. **FAQ:** Preguntas específicas del sector.
6. **CTA:** "Solicita tu Auditoría para [Industria]"

---

### Fase 3 — SEO Internacional y Hreflang (Semanas 6–10)

Para posicionar tanto en inglés como en español, las rutas deben ser independientes y estar correctamente enlazadas con etiquetas `hreflang`.

#### Implementación de hreflang

En el `<head>` de cada página, añadir:

```html
<link rel="alternate" hreflang="en" href="https://texhco.com/services/local-seo" />
<link rel="alternate" hreflang="es" href="https://texhco.com/es/servicios/seo-local" />
<link rel="alternate" hreflang="x-default" href="https://texhco.com/services/local-seo" />
```

La URL con `hreflang="x-default"` le indica a Google qué versión mostrar a usuarios en idiomas no especificados o en búsquedas globales.

#### Prioridad de idioma para Texh Co.

Dado que el mercado objetivo principal es EE.UU. (NJ) con comunidades hispanohablantes y angloparlantes, se recomienda:

- **Inglés como idioma principal** (`/`) para mayor volumen de búsquedas en el mercado local americano.
- **Español como idioma secundario** (`/es/`) para nichos de alto valor: dueños de negocios hispanohablantes en NJ, NY y el noreste americano.

---

### Fase 4 — Schema Markup JSON-LD (Semana 4 en adelante)

El Schema Markup es la palanca más infrautilizada en webs de agencias y servicios. Permite que Google y las IAs (AI Overviews, Perplexity, ChatGPT) entiendan con precisión qué es el negocio, qué servicios ofrece y con qué autoridad.

#### Schema de Organization (en el Home y Footer)

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Texh Co.",
  "url": "https://texhco.com",
  "logo": "https://texhco.com/assets/logo.svg",
  "description": "Local Growth Systems: web premium, local SEO, automation and lead capture for local businesses and contractors.",
  "areaServed": ["Bergen County, NJ", "New Jersey", "New York"],
  "serviceType": ["Web Design", "Local SEO", "Business Automation", "Google Business Optimization"],
  "sameAs": [
    "https://www.linkedin.com/company/texhco",
    "https://www.instagram.com/texhco"
  ]
}
```

#### Schema de Service (en cada página de servicio)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Local SEO for Small Businesses",
  "provider": {
    "@type": "ProfessionalService",
    "name": "Texh Co."
  },
  "description": "Local SEO strategy to rank in Google Maps and local search results for service-based businesses.",
  "areaServed": "New Jersey",
  "serviceOutput": "Increased local visibility, calls, and leads"
}
```

#### Schema de FAQPage (en cada sección de preguntas frecuentes)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How long does it take to see results with local SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most local businesses start seeing measurable improvements in Google Maps visibility within 60-90 days of consistent optimization."
      }
    }
  ]
}
```

El FAQPage Schema es especialmente valioso en 2026 porque alimenta directamente los AI Overviews de Google y las respuestas de búsquedas asistidas por IA [cite:42].

---

## 3. Estrategia de Contenido SEO

### 3.1 Términos de alta prioridad por intención

| Término | Intención | Página destino | Volumen estimado |
|---|---|---|---|
| `local seo for small businesses` | Transaccional | /services/local-seo | Alto |
| `web design for barbershops` | Transaccional | /industries/barbershops-salons | Medio |
| `google business optimization service` | Transaccional | /services/google-business | Medio-alto |
| `roofing company website design` | Transaccional | /industries/roofing-contractors | Medio |
| `booking system for local business` | Transaccional | /services/booking-lead-systems | Medio |
| `digital marketing for contractors NJ` | Local | /industries/roofing-contractors + city page | Bajo-medio |
| `web design agency NJ` | Local | Home + página geográfica | Medio |

### 3.2 Páginas locales por ciudad (Fase 5, a partir del mes 3)

Una vez la arquitectura de servicios e industrias esté activa, el siguiente nivel de escala es crear páginas geográficas:

- `/bergen-county-nj/local-seo`
- `/new-jersey/web-design-for-contractors`
- `/new-york/google-business-optimization`

Estas páginas combinan el servicio con la zona geográfica y capturan búsquedas de muy alta intención transaccional. No se deben crear antes de tener el contenido core listo, para evitar que Google perciba thin content.

### 3.3 FAQ por industria (para AI Overviews)

Las búsquedas con respuesta directa y los AI Overviews de Google dependen cada vez más de contenido bien estructurado con respuestas claras. Para Texh Co., las FAQs por industria y por servicio son una ventaja diferencial porque los competidores locales raramente las tienen bien trabajadas.

Ejemplos de preguntas que deben estar respondidas en el contenido:

- "How much does a website cost for a barbershop?"
- "Does a plumber need a website in 2026?"
- "What is local SEO and how does it help contractors?"
- "How do I get more calls from Google Maps?"

---

## 4. Google Business Profile

El Google Business Profile (GBP) de Texh Co. debe reflejar exactamente la misma información que la web, con la misma NAP (Nombre, Dirección, Teléfono) en ambos sitios.

**Checklist GBP:**

- [ ] Nombre exacto: "Texh Co." (sin variaciones).
- [ ] Categoría principal: "Web Design Company" o "Marketing Agency".
- [ ] Categorías secundarias: "Search Engine Optimization Service", "Internet Marketing Service".
- [ ] Descripción de 750 caracteres con palabras clave naturales.
- [ ] Fotos profesionales del equipo, logo y trabajo.
- [ ] Publicaciones semanales o quincenales con enlace a la web.
- [ ] Responder a todas las reseñas.
- [ ] Activar mensajes y preguntas/respuestas.
- [ ] Añadir servicios con descripción y precio orientativo.

---

## 5. LinkedIn como Amplificador SEO

LinkedIn no transmite autoridad de dominio directamente a la web de Texh Co., pero actúa como canal de distribución que genera tráfico cualificado, búsquedas de marca y posibles backlinks naturales [cite:42][cite:56].

**Flujo recomendado:**

1. Publicar un insight o caso en LinkedIn (problema real de un cliente objetivo).
2. Enlazar al final a la página de industria o servicio correspondiente.
3. Si el post genera interacción, reutilizarlo como sección de una landing page.
4. Monitorear en Search Console si esa URL recibe más impresiones tras el post.

**Tipos de contenido que funcionan mejor para Texh Co. en LinkedIn:**

- Antes / después de una web de barbería o contratista.
- "Por qué el 80% de los HVAC no aparecen en Google Maps y cómo solucionarlo".
- Métricas reales de un cliente (anonimizadas si es necesario).
- Insights sobre AI Overviews y cómo afectan a los negocios locales.

---

## 6. Métricas y Seguimiento

### Herramientas imprescindibles (todas gratuitas)

| Herramienta | Para qué |
|---|---|
| Google Search Console | Posiciones reales, impresiones, errores de indexación |
| Google Analytics 4 | Tráfico, fuentes, conversiones (formularios, llamadas) |
| Google Business Insights | Vistas del perfil, llamadas, clics en dirección |
| PageSpeed Insights | Core Web Vitals por URL |
| Bing Webmaster Tools | Segundo motor, especialmente importante para búsquedas desde Copilot/Bing AI |

### KPIs a revisar cada mes

- Impresiones y posición media en Search Console para las URLs de servicios e industrias.
- Número de páginas indexadas (debe crecer cada mes).
- Tráfico orgánico por página de destino en GA4.
- Tasa de conversión de `/audit` (el CTA principal).
- Llamadas y clics en dirección desde Google Business.

---

## 7. Tabla de Prioridades

| Prioridad | Acción | Impacto SEO | Esfuerzo | Semana |
|---|---|---|---|---|
| 🔴 Crítica | Migrar a Astro/Next.js (SSR/SSG) | Muy alto | Alto | 1-3 |
| 🔴 Crítica | Metadatos únicos por ruta (title, description, OG) | Muy alto | Bajo | 1-2 |
| 🔴 Crítica | Sitemap.xml + robots.txt | Alto | Bajo | 1 |
| 🟠 Alta | Schema JSON-LD (Organization + Service) | Alto | Medio | 2-4 |
| 🟠 Alta | Crear 3 páginas de servicio | Alto | Medio | 3-5 |
| 🟠 Alta | Crear 3 páginas de industria | Alto | Medio | 4-6 |
| 🟡 Media | Hreflang + rutas por idioma | Medio | Alto | 6-10 |
| 🟡 Media | FAQPage Schema | Medio | Bajo | 3-5 |
| 🟡 Media | Google Business Profile optimizado | Medio | Bajo | 1-2 |
| 🟢 Baja | Páginas locales por ciudad | Alto (largo plazo) | Medio | 10+ |
| 🟢 Baja | Blog / contenido editorial | Medio (largo plazo) | Alto | 8+ |

---

## 8. Conclusión y Siguientes Pasos

El mayor error que puede cometer Texh Co. ahora mismo es crear 20 páginas de contenido antes de resolver la base técnica. Un contenido excelente en una SPA sin SSR es un contenido que Google lee tarde, mal o no lee [cite:42].

**El orden correcto es:**

1. Resolver el renderizado (Astro o Next.js).
2. Añadir metadatos y Schema básico.
3. Crear las primeras páginas transaccionales de servicio.
4. Crear las primeras páginas de industria.
5. Activar Google Business Profile correctamente.
6. Expandir a más industrias, ciudades e idiomas.

Con este orden, Texh Co. puede tener una base SEO sólida y páginas activas en 6-8 semanas, y empezar a ver tráfico orgánico cualificado en 60-90 días desde el lanzamiento de las primeras landings [cite:42][cite:44].

---

*Documento generado en abril de 2026. Revisar y actualizar trimestralmente conforme evoluciona la arquitectura y el contenido de la web.*
