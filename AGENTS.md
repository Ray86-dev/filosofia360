# AGENTS.md — Docente 26/27 (Filosofía Canarias)

Leen este archivo TODOS los agentes (orquestador, planificador, editor, revisor).
Proyecto de una sola persona. App local 100% funcional. Sin mocks, sin TODO, sin lorem.
El agente DEBE generar el repositorio completo (código, seed, README, scripts).

## Usuario y uso

Docente de Filosofía en secundaria (Canarias), curso 2026/2027.
- Flujo A (diario, 10–25 min): preparar TODAS las clases de HOY.
- Flujo B (finde): preparar TODA la semana lectiva (lun–vie).
Salidas: Programación Didáctica, Situación de Aprendizaje, sesión de aula (guion + materiales + evaluación). Export DOCX/PDF/MD.
UI y documentos en español. Código en inglés. Zona horaria: Europe/Canary.

## Currículo (NO negociable)

Filosofía NO es de 1.º ESO.

| Código | Materia | Etapa | Curso | Carácter |
|--------|---------|-------|-------|----------|
| FIL4 | Filosofía | ESO | 4.º | Optativa |
| FIL1B | Filosofía | Bachillerato | 1.º | Común |
| HDF2B | Historia de la Filosofía | Bachillerato | 2.º | Común |
| EVCE1 | Educación en Valores Cívicos y Éticos | ESO | 1.º | Obligatoria (afín) |
| PSI | Psicología | Bachillerato | según oferta | Optativa |

Anclar a: LOMLOE, RD 217/2022, RD 243/2022, Decreto 30/2023 Canarias (anexos 1–4 y 8), Decreto 78/2025 (optativas Bach.), plantillas Brújula20 PD y SA.
No inventar códigos de criterio. Huecos: `fuente: pendiente_oficial`.

## Producto

Next.js App Router + TypeScript + Tailwind + SQLite local (drizzle o better-sqlite3).
App personal, sin auth/SaaS. LLM opcional (OpenAI-compatible + Ollama). Sin API key debe funcionar con plantillas deterministas.
Pantallas: Hoy, Semana, Grupos/Horario, Programaciones, SA, Banco curricular, Calendario 26/27, Ajustes, Pack export.
Seed: grupos reales de un dpto. de Filosofía + horario semanal + PD/SA esqueleto + calendario editable.

Entidades: UserSettings, Grupo, HorarioSlot, CalendarioDia, ProgramacionDidactica, SituacionAprendizaje, SesionAula, RecursoGenerado, FuenteCurricular.

## Orden de trabajo de agentes

1. Crear repo local completo (package.json, app, lib, data, README).
2. Dominio calendario/horario + tests.
3. Pantallas Hoy y Semana PRIMERO.
4. Generar sesión + export.
5. Editores PD/SA.
6. Capa LLM + fallback.
7. `npm run build` debe pasar.

## Aceptación

- `npm install && npm run dev` en Windows.
- Filosofía nunca en 1.º ESO.
- Preparar día / preparar semana producen materiales IMPARTIBLES (texto incluido).
- Datos 100% locales. Backup JSON.

## Primera tarea al arrancar en carpeta vacía

Genera TODO el repositorio de la app. No preguntes confirmaciones de producto. Empieza por seed + Hoy/Semana.
