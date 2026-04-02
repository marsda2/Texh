# Texh Co. - Project Context & Brand Guidelines

## 1. Misión Visionaria y Propósito de la Marca
**Nuestra Voz Local, Tu Transformación Global.**
Texh Co. existe para cerrar la brecha entre los negocios locales tradicionales y las soluciones digitales de vanguardia. Unimos la visión humana de nuestros fundadores (Ingeniería + Diseño) para ofrecer "Sistemas Omnicanal Premium" que automatizan el crecimiento y elevan el posicionamiento de nuestros clientes. No somos proveedores; somos socios tecnológicos locales.

## 2. Target Audience
- **Enterprises & Local Businesses:** Seeking robust, scalable technical infrastructures and modernized digital platforms.
- **Individual Creators/Entrepreneurs:** Looking for elite UI/UX design and MVP development to launch their ideas with impact.

## 3. Tono de Voz y Comunicación
Nuestra comunicación debe ser un reflejo de nuestro enfoque dual: técnico pero inspirador, profesional pero visionario.
- **Inspirador y Visionario:** No vendemos características técnicas (ej. "integración de API"). Vendemos el futuro y el resultado (ej. "tu recepcionista virtual 24/7 y escaparate premium").
- **Técnico-Premium y Educativo:** Mostramos autoridad técnica (mencionando IA, APIs, backend, omnicanalidad) pero lo explicamos de manera simple y sofisticada, elevando la comprensión del cliente.
- **Estratégico:** Hablamos de soluciones de negocio y socios, no de servicios aislados. Nuestra venta presencial (Xiuny) debe usar este tono para establecer relaciones a largo plazo.
- **Ejemplo de Cambio:**
  - *Antes:* "Hacemos tu sitio web y redes sociales."
  - *Texh Co.:* "Construimos tu infraestructura digital completa: desde el desarrollo web premium hasta el ecosistema omnicanal de IA que automatiza tu crecimiento local."

## 4. Identidad Visual y Diseño (UI/UX)
**Logotipo y Uso Correcto:**
- **Stacking y Jerarquía:** El logotipo debe usarse siempre en su formato apilado: TEXH (titular principal) sobre CO. (secundario). Esta disposición simboliza la estructura (CO.) que sostiene la visión (TEXH).
- **El Símbolo Central de la 'X':** Representa la fusión de ingeniería y diseño, y la conexión entre fundadores. Es el único elemento con el Color de Acento (Chartreuse Eléctrico).
- **Contraste y Fondo:** Preferiblemente sobre fondos neutros (Gris Neutro Claro) para un contraste máximo. Texto principal en Carbón Obsidiana.

**Tipografía:**
- **Titulares (H1, H2):** Tipografía Sans-serif moderna, limpia, de peso medio o pesado (ej. Inter o PP Neue Montreal). Visualmente editorial y directa.
- **Cuerpo y Subtítulos:** Tipografía Sans-serif más técnica, espaciada y limpia (ej. Space Grotesk o Heebo). Comunica precisión y rigor técnico.

**Paleta de Colores (Minimalista con un solo acento):**
- **Fondo Principal:** Gris Neutro Claro (`#F0F0F0`). Transmite sofisticación y aire.
- **Texto Principal:** Carbón Obsidiana (`#212121`). Sólido y profesional.
- **Color de Acento (El "Shock"):** Chartreuse Eléctrico (`#C9FF1F`). Comunica innovación, energía y tecnología de vanguardia.

**Reglas de Aplicación de Fondo y Contraste:**
- **Fondos Blancos (`bg-white`):**
  - **Uso:** Tarjetas (Cards), contenedores de inputs, barras superiores fijas. Funcionan como elemento elevado/activo.
  - **Textos:** SIEMPRE usar Carbón Obsidiana (`text-obsidian`) o Grises oscuros (`text-gray-dark`).
  - **Bordes/Contornos:** Gris claro (`border-gray-200`) e interacciones `hover/focus` en Obsidiana o Chartreuse de alta intensidad (shadows).
  - **⚠️ REGLA DE ORO:** NUNCA usar texto Chartreuse sobre fondo blanco. El amarillo limón sobre blanco no tiene contraste y perjudica la legibilidad. Si el texto debe ser interactivo, usa Obsidiana, o en su defecto, usa el Chartreuse como fondo sólido de un botón/etiqueta con texto negro.
- **Fondos Negros / Carbón Obsidiana (`bg-obsidian`):**
  - **Uso:** Hero sections, footers o "llamados a la acción" (CTAs) de máximo impacto visual.
  - **Textos:** Blanco claro o gris. Aquí **SÍ** se permite usar el texto en Chartreuse Eléctrico (`text-chartreuse`) para titulares o acentos fuertes, ya que el contraste es perfecto.
- **Fondos Gris Neutro (`bg-[#F8F9FA]` / `bg-neutral`):**
  - **Uso:** El "lienzo" base de la pantalla entera. Separa los fondos blancos y da profundidad.

**Jerarquía Visual y Maquetación:**
- **Espacio en Blanco (Aire):** Obligatorio para dar un aspecto premium, editorial y sofisticado (estilo revista). No se permite la saturación.
- **Contraste Extremo:** Uso del Carbón Obsidiana y Chartreuse Eléctrico sobre el fondo Gris Neutro.
- **Símbolo como Guía:** Usar la estructura geométrica de la 'X' para guiar la información.

## 5. Information Architecture & Content
1. **Hero:** High-impact initial impression emphasizing "Tu Ecosistema Omnicanal Premium".
2. **The Team (About - Separate Page):** 
   - Managed by **Xiunellys Huerta** (Lead Project Manager).
   - Focused on Full-Stack expertise and versatile B2B/B2C solution delivery.
   - Purpose: To establish human trust and showcase the brains behind the code.
3. **Expertise (Services):** Detailed breakdown of technical capabilities.
   - **Ingeniería & Automatización (70%):** Web Premium, App, Mantenimiento con IA. (Tipografía técnica).
   - **Branding & Omnicanalidad (30%):** Retainer Mensual de Contenido. (Tipografía moderna/editorial).
4. **Portfolio (Selected Works):** 
   - **Varoncare:** Health & Wellness (E-commerce/Booking).
   - **Striki Onboarding:** Interactive User Experience.
   - **Melodica:** Educational Mobile App.
   - **Isabelle Moreau:** High-end visual portfolio for a Makeup Artist.
5. **Contact (Footer):** Clean, professional call-to-action ("Aceptar Propuesta" / "Agendar Sesión Estratégica") using extreme border-radius buttons (`--radius-extreme`).

## 6. Technical Stack
- **Framework:** React.js (via Vite).
- **Navigation:** Multi-page routing via `react-router-dom`.
- **Icons:** Custom SVGs (e.g. ArrowRight, CodeIcon, MegaphoneIcon) / Lucide-React.
- **Styling:** Global CSS / Tailwind utility classes with overriding theme colors (`--color-neutral`, `--color-obsidian`, `--color-chartreuse`), utilizing `.radius-extreme` for UI elements.
