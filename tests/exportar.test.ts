import { describe, it, expect } from 'vitest';
import type { GuionSesion } from '@/lib/tipos';
import { lineasAMarkdown, lineasADocxBuffer, lineasAPdfBuffer, sesionALineas } from '@/lib/exportar';

const guion: GuionSesion = {
  titulo: '1. ¿Qué es la filosofía? — El mito de la caverna',
  materia: 'Filosofía',
  materiaCodigo: 'FIL4',
  grupo: '4.º ESO A',
  curso: '4.º ESO',
  fecha: '2026-09-14',
  duracionMin: 55,
  objetivo: 'Comprender el paso del mito al logos.',
  saberes: ['El paso del mito al logos.'],
  criterios: ['Reconocer problemas filosóficos.'],
  secuencia: [
    { momento: 'inicio', titulo: 'Activación', duracionMin: 8, descripcion: 'Saludo y lluvia de ideas.' },
    {
      momento: 'desarrollo',
      titulo: 'Lectura del mito',
      duracionMin: 25,
      descripcion: 'Lectura comentada.',
      texto: 'Imagina unos prisioneros encadenados en una cueva…',
      preguntas: ['¿Qué representan las sombras?'],
    },
    { momento: 'cierre', titulo: 'Síntesis', duracionMin: 7, descripcion: 'Recapitulación.', preguntas: ['¿Qué te ha hecho pensar?'] },
  ],
  materiales: ['Cuaderno', 'Proyector'],
  evaluacion: [{ instrumento: 'Diálogo', evidencia: 'Intervenciones', momento: 'Durante la sesión' }],
  atencionDiversidad: ['Lectura guiada'],
  tareaCasa: 'Responder por escrito: ¿Qué te ha hecho pensar?',
};

const lineas = sesionALineas({ id: 1, grupoId: 1, fecha: guion.fecha, saId: null, titulo: guion.titulo, guion, estado: 'generada', creada: '', actualizada: '' }, null);

describe('exportar', () => {
  it('genera Markdown', () => {
    const md = lineasAMarkdown(lineas);
    expect(md).toContain('# 1. ¿Qué es la filosofía?');
    expect(md).toContain('## Objetivo');
  });

  it('genera DOCX (binario no vacío)', async () => {
    const buf = await lineasADocxBuffer(lineas);
    expect(buf.length).toBeGreaterThan(1000);
    // firma PK (ZIP)
    expect(buf.subarray(0, 2).toString('ascii')).toBe('PK');
  });

  it('genera PDF (binario no vacío con cabecera %PDF)', () => {
    const buf = lineasAPdfBuffer(lineas, guion.titulo);
    expect(buf.length).toBeGreaterThan(500);
    expect(buf.subarray(0, 4).toString('ascii')).toBe('%PDF');
  });
});
