# Filosofía 360 — Preparador de clases (Canarias, 2026/2027)

Aplicación **local** para un docente de Filosofía de secundaria en Canarias.
Genera la programación didáctica, las situaciones de aprendizaje y las **sesiones de aula
impartibles** (guion con texto incluido, materiales y evaluación), con exportación a
**DOCX / PDF / Markdown**. Sin login, sin nube: todos los datos viven en un SQLite local.

## Requisitos

- **Windows** (también funciona en macOS/Linux).
- **Node.js 20+** (recomendado 22 o 24). Descárgalo de https://nodejs.org
- npm (se instala con Node). No hace falta ninguna clave de API.

## Puesta en marcha en Windows

```bash
# 1. Dentro de la carpeta del proyecto
npm install

# 2. Arrancar la app
npm run dev
```

Abre **http://localhost:3000**. La primera ejecución crea `data/app.db` y siembra
automáticamente un departamento de Filosofía real (grupos, horario, calendario 26/27,
PD y SA esqueleto).

> Nota sobre `better-sqlite3`: npm instala binarios precompilados para la versión de
> Node habitual, por lo que **no** suele necesitarse Visual Studio Build Tools. Si tu
> versión de Node es muy nueva y no hay binario, instala las *Build Tools* de Visual
> Studio o actualiza Node.

## Uso diario

- **Hoy** → pulsa **«Preparar el día»** (10–25 min): genera las sesiones de todas las clases de hoy.
- **Semana** (finde) → pulsa **«Preparar toda la semana»**: prepara de lunes a viernes.
- Cada sesión se puede **editar** (JSON), **regenerar** o **marcar como impartida**.
- **Pack export** descarga cualquier documento en MD / DOCX / PDF y un **backup JSON** completo.

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo en http://localhost:3000 |
| `npm run build` | Compila para producción (debe pasar sin errores) |
| `npm run start` | Sirve la compilación de producción |
| `npm test` | Ejecuta los tests del dominio (Vitest) |
| `npm run seed:reset` | Borra `data/app.db` y vuelve a sembrar al arrancar |

## Currículo (no negociable)

Filosofía **NO** se imparte en 1.º ESO.

| Código | Materia | Etapa | Curso | Carácter |
| --- | --- | --- | --- | --- |
| FIL4 | Filosofía | ESO | 4.º | Optativa |
| FIL1B | Filosofía | Bachillerato | 1.º | Común |
| HDF2B | Historia de la Filosofía | Bachillerato | 2.º | Común |
| EVCE1 | Educación en Valores Cívicos y Éticos | ESO | 1.º | Obligatoria (afín) |
| PSI | Psicología | Bachillerato | según oferta | Optativa |

Anclado a LOMLOE, RD 217/2022, RD 243/2022, Decreto 30/2023 de Canarias (anexos 1–4 y 8)
y Decreto 78/2025 (optativas de Bachillerato). Los **códigos oficiales de criterio de
evaluación no se inventan**: figuran como `pendiente_oficial` hasta incorporar el anexo
correspondiente.

## Estructura

```
app/            páginas (App Router) + server actions + rutas API de export/backup
components/     UI (nav, tarjetas de sesión, editores, botones de acción)
lib/
  calendar.ts   dominio de calendario (Europe/Canary)
  horario.ts    dominio de horario
  db.ts         SQLite (better-sqlite3) + helpers
  seed.ts       seed del departamento (idempotente)
  sesiones.ts   generador determinista de sesiones
  llm.ts        capa LLM opcional con fallback
  exportar.ts   MD / DOCX / PDF
  backup.ts     backup/restore JSON
  curriculum/   banco curricular (saberes, criterios, unidades y actividades)
data/           SQLite local (no se versiona)
tests/          tests del dominio (Vitest)
```

## IA opcional

En **Ajustes** puedes activar un proveedor LLM (OpenAI-compatible u Ollama local) para
enriquecer los guiones. **Sin clave** la app funciona igual con plantillas deterministas.
