# 🗺️ Hoja de Ruta: Construcción de AlDía

Este documento define el orden exacto de construcción para la app AlDía, asegurando bases sólidas, diseño responsivo (Móvil + PC) y una experiencia de instalación PWA premium y pasiva.

---

## FASE 1: Fundamentos y Responsive (Desktop Notion Mode) 📱/💻
**Objetivo:** Asegurar que la app se vea perfecta en celular (1 columna) y se expanda elegantemente a múltiples columnas en Escritorio (Opción B), SIN romper el diseño móvil.
- [ ] Configurar el contenedor principal (`.aldia-container`) con CSS Grid responsivo.
- [ ] Evitar desbordamientos horizontales en móvil (`overflow-x: hidden`).
- [ ] Adaptar el `Header` para que se vea bien en pantallas anchas.

## FASE 2: Componentes Core y Estética ✨
**Objetivo:** Darle vida y pulido a los componentes estáticos actuales.
- [ ] Pulir el `BentoGrid` (Ajustar sombras, bordes, tipografías exactas).
- [ ] Diseñar las `UpcomingList` (Cápsulas) con colores dinámicos.
- [ ] Diseñar la `MissionList` (Checklists).

## FASE 3: La Magia Interactiva (Framer Motion) 🪄
**Objetivo:** Que no se sienta como una web, sino como un videojuego.
- [ ] Programar el **Super FAB (Botón Radial)**: Al mantener presionado, deben salir flotando 3-4 burbujas de colores (Ingreso, Gasto, Tarea) con rebote.
- [ ] Transiciones suaves de pantalla: Al cambiar de "Acción" a "Vida" en las pastillas de arriba, el contenido debe desvanecerse y aparecer fluidamente.

## FASE 4: Arquitectura PWA Pasiva 📲
**Objetivo:** Lograr que la gente instale la app sin hartarlos (Algoritmo Pasivo).
- [ ] Migrar el conocimiento de Delva/SelvaFlix: Crear un componente `PWAInstaller`.
- [ ] Algoritmo Pasivo: Mostar un banner discreto (quizá arriba del Bento Grid o en notificaciones) solo después de uso recurrente.
- [ ] Botón de Instalación Fijo: Poner un botón manual en la sección de "Ajustes/Perfil" para quien quiera instalarla directamente.
- [ ] Ocultar todo rastro de instalación si la app ya corre en modo `standalone`.

## FASE 5: Cerebro y Datos (El Backstage) 🧠
**Objetivo:** Conectar la interfaz hermosa con datos reales.
- [ ] Configurar Firebase y autenticación (Google Auth).
- [ ] Lógica para guardar las misiones diarias.
- [ ] Lógica para Finanzas (Suma básica de ingresos/gastos).

## FASE 6: Ecosistema Pro (Versión 2.0) 🪐
- [ ] Conexión oficial con Google Calendar API.
- [ ] Funciones avanzadas de historial y auditoría.
