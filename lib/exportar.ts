import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
} from 'docx';
import { jsPDF } from 'jspdf';
import type { GuionSesion, SesionAula, Grupo } from '@/lib/tipos';
import { formatearFechaLarga, formatearFechaNumerica } from '@/lib/calendar';
import { materiaDe } from '@/lib/curriculum';
import type { ProgramacionRow, SituacionRow } from '@/lib/db';

// Modelo intermedio: una "línea" del documento, reutilizable por los tres formatos.
export type Linea =
  | { kind: 'titulo'; texto: string }
  | { kind: 'seccion'; texto: string }
  | { kind: 'parrafo'; texto: string }
  | { kind: 'punto'; texto: string };

// -------------------- Generadores de contenido --------------------

export function sesionALineas(sesion: SesionAula, grupo: Grupo | null): Linea[] {
  const g = sesion.guion;
  const lineas: Linea[] = [];
  lineas.push({ kind: 'titulo', texto: g.titulo });
  lineas.push({ kind: 'parrafo', texto: `${g.materia} · ${grupo?.nombre ?? g.grupo} · ${formatearFechaLarga(g.fecha)} · ${g.duracionMin} min` });
  lineas.push({ kind: 'seccion', texto: 'Objetivo' });
  lineas.push({ kind: 'parrafo', texto: g.objetivo });
  lineas.push({ kind: 'seccion', texto: 'Saberes básicos' });
  for (const s of g.saberes) lineas.push({ kind: 'punto', texto: s });
  lineas.push({ kind: 'seccion', texto: 'Criterios de evaluación' });
  for (const c of g.criterios) lineas.push({ kind: 'punto', texto: c });
  lineas.push({ kind: 'seccion', texto: 'Desarrollo de la sesión' });
  for (const m of g.secuencia) {
    lineas.push({ kind: 'parrafo', texto: `${m.momento.toUpperCase()} · ${m.titulo} (${m.duracionMin} min)` });
    lineas.push({ kind: 'parrafo', texto: m.descripcion });
    if (m.texto) {
      lineas.push({ kind: 'parrafo', texto: `Texto para el aula: ${m.texto}` });
    }
    if (m.preguntas) {
      for (const p of m.preguntas) lineas.push({ kind: 'punto', texto: p });
    }
  }
  lineas.push({ kind: 'seccion', texto: 'Materiales' });
  for (const m of g.materiales) lineas.push({ kind: 'punto', texto: m });
  lineas.push({ kind: 'seccion', texto: 'Evaluación' });
  for (const e of g.evaluacion) lineas.push({ kind: 'punto', texto: `${e.instrumento} — ${e.evidencia} (${e.momento})` });
  lineas.push({ kind: 'seccion', texto: 'Atención a la diversidad' });
  for (const a of g.atencionDiversidad) lineas.push({ kind: 'punto', texto: a });
  lineas.push({ kind: 'seccion', texto: 'Tarea para casa' });
  lineas.push({ kind: 'parrafo', texto: g.tareaCasa });
  return lineas;
}

interface DatosPD {
  identificacion?: {
    centro?: string;
    docente?: string;
    cursoEscolar?: string;
    materia?: string;
    curso?: string;
    etapa?: string;
    caracter?: string;
    horasSemanales?: number;
  };
  justificacion?: string;
  contextualizacion?: string;
  objetivos?: string[];
  competencias?: string[];
  saberesPorBloque?: { bloque: string; saberes: string[] }[];
  criterios?: { bloque: string; descripcion: string; codigo?: string }[];
  metodologia?: string;
  atencionDiversidad?: string;
  evaluacion?: { instrumentos?: string[]; criteriosCalificacion?: string };
  temporalizacion?: string;
}

export function pdALineas(pd: ProgramacionRow): Linea[] {
  const d = JSON.parse(pd.datos) as DatosPD;
  const lineas: Linea[] = [];
  lineas.push({ kind: 'titulo', texto: pd.titulo });
  if (d.identificacion) {
    lineas.push({ kind: 'parrafo', texto: `${d.identificacion.materia ?? ''} · ${d.identificacion.curso ?? ''} · ${d.identificacion.cursoEscolar ?? ''}`.replace(/^ · | · $/g, '') });
    lineas.push({ kind: 'parrafo', texto: `${d.identificacion.centro ?? ''} · ${d.identificacion.docente ?? ''}`.replace(/^ · | · $/g, '') });
  }
  lineas.push({ kind: 'seccion', texto: 'Justificación' });
  lineas.push({ kind: 'parrafo', texto: d.justificacion ?? '' });
  lineas.push({ kind: 'seccion', texto: 'Contextualización' });
  lineas.push({ kind: 'parrafo', texto: d.contextualizacion ?? '' });
  lineas.push({ kind: 'seccion', texto: 'Objetivos y competencias' });
  for (const o of d.objetivos ?? d.competencias ?? []) lineas.push({ kind: 'punto', texto: o });
  lineas.push({ kind: 'seccion', texto: 'Saberes básicos' });
  for (const b of d.saberesPorBloque ?? []) {
    lineas.push({ kind: 'parrafo', texto: b.bloque });
    for (const s of b.saberes) lineas.push({ kind: 'punto', texto: s });
  }
  lineas.push({ kind: 'seccion', texto: 'Criterios de evaluación' });
  for (const c of d.criterios ?? []) lineas.push({ kind: 'punto', texto: `${c.descripcion}${c.codigo && c.codigo !== 'pendiente_oficial' ? ` (${c.codigo})` : ''}` });
  lineas.push({ kind: 'seccion', texto: 'Metodología' });
  lineas.push({ kind: 'parrafo', texto: d.metodologia ?? '' });
  lineas.push({ kind: 'seccion', texto: 'Atención a la diversidad' });
  lineas.push({ kind: 'parrafo', texto: d.atencionDiversidad ?? '' });
  lineas.push({ kind: 'seccion', texto: 'Evaluación' });
  for (const i of d.evaluacion?.instrumentos ?? []) lineas.push({ kind: 'punto', texto: i });
  lineas.push({ kind: 'parrafo', texto: d.evaluacion?.criteriosCalificacion ?? '' });
  lineas.push({ kind: 'seccion', texto: 'Temporalización' });
  lineas.push({ kind: 'parrafo', texto: d.temporalizacion ?? '' });
  return lineas;
}

interface DatosSA {
  titulo?: string;
  descripcion?: string;
  fundamentacion?: { saberes?: string[]; criterios?: string[] };
  metodologia?: string;
  instrumentos?: string[];
  sesionesEstimadas?: number;
  productoFinal?: string;
}

export function saALineas(sa: SituacionRow): Linea[] {
  const d = JSON.parse(sa.datos) as DatosSA;
  const lineas: Linea[] = [];
  lineas.push({ kind: 'titulo', texto: sa.titulo });
  lineas.push({ kind: 'parrafo', texto: `${materiaDe(sa.materiaCodigo).nombre} · ${sa.curso}` });
  lineas.push({ kind: 'seccion', texto: 'Descripción' });
  lineas.push({ kind: 'parrafo', texto: d.descripcion ?? '' });
  lineas.push({ kind: 'seccion', texto: 'Fundamentación curricular' });
  lineas.push({ kind: 'parrafo', texto: 'Saberes básicos:' });
  for (const s of d.fundamentacion?.saberes ?? []) lineas.push({ kind: 'punto', texto: s });
  lineas.push({ kind: 'parrafo', texto: 'Criterios de evaluación:' });
  for (const c of d.fundamentacion?.criterios ?? []) lineas.push({ kind: 'punto', texto: c });
  lineas.push({ kind: 'seccion', texto: 'Metodología' });
  lineas.push({ kind: 'parrafo', texto: d.metodologia ?? '' });
  lineas.push({ kind: 'seccion', texto: 'Instrumentos de evaluación' });
  for (const i of d.instrumentos ?? []) lineas.push({ kind: 'punto', texto: i });
  lineas.push({ kind: 'seccion', texto: 'Producto final' });
  lineas.push({ kind: 'parrafo', texto: d.productoFinal ?? '' });
  lineas.push({ kind: 'parrafo', texto: `Sesiones estimadas: ${d.sesionesEstimadas ?? '-'}` });
  return lineas;
}

// -------------------- Markdown --------------------

export function lineasAMarkdown(lineas: Linea[]): string {
  const out: string[] = [];
  for (const l of lineas) {
    if (l.kind === 'titulo') out.push(`# ${l.texto}`, '');
    else if (l.kind === 'seccion') out.push(`## ${l.texto}`, '');
    else if (l.kind === 'punto') out.push(`- ${l.texto}`);
    else out.push(l.texto, '');
  }
  return out.join('\n').trim() + '\n';
}

// -------------------- DOCX --------------------

export async function lineasADocxBuffer(lineas: Linea[]): Promise<Buffer> {
  const children: Paragraph[] = [];
  for (const l of lineas) {
    if (l.kind === 'titulo') {
      children.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(l.texto)] }));
    } else if (l.kind === 'seccion') {
      children.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(l.texto)] }));
    } else if (l.kind === 'punto') {
      children.push(new Paragraph({ bullet: { level: 0 }, children: [new TextRun(l.texto)] }));
    } else {
      children.push(new Paragraph({ children: [new TextRun(l.texto)] }));
    }
  }
  const doc = new Document({ sections: [{ children }] });
  return Packer.toBuffer(doc);
}

// -------------------- PDF --------------------

function sanitizePdf(texto: string): string {
  // El estándar de jsPDF es WinAnsi; normalizamos lo poco habitual.
  return texto
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\u2014/g, '-')
    .replace(/\u2013/g, '-')
    .replace(/…/g, '...');
}

export function lineasAPdfBuffer(lineas: Linea[], titulo: string): Buffer {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const margenX = 15;
  const margenY = 15;
  const anchoUtil = 210 - margenX * 2;
  let y = margenY;

  const nuevaPagina = () => {
    doc.addPage();
    y = margenY;
  };

  for (const l of lineas) {
    let texto = sanitizePdf(l.texto);
    if (l.kind === 'titulo') {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      const renglones = doc.splitTextToSize(texto, anchoUtil) as string[];
      for (const r of renglones) {
        if (y > 280) nuevaPagina();
        doc.text(r, margenX, y);
        y += 8;
      }
      y += 2;
    } else if (l.kind === 'seccion') {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      const renglones = doc.splitTextToSize(texto, anchoUtil) as string[];
      for (const r of renglones) {
        if (y > 280) nuevaPagina();
        doc.text(r, margenX, y);
        y += 6;
      }
      y += 1;
    } else if (l.kind === 'punto') {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const renglones = doc.splitTextToSize('• ' + texto, anchoUtil) as string[];
      for (const r of renglones) {
        if (y > 280) nuevaPagina();
        doc.text(r, margenX + 2, y);
        y += 5;
      }
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const renglones = doc.splitTextToSize(texto, anchoUtil) as string[];
      for (const r of renglones) {
        if (y > 280) nuevaPagina();
        doc.text(r, margenX, y);
        y += 5;
      }
      y += 1;
    }
  }

  // Pie de página
  const paginas = doc.getNumberOfPages();
  for (let i = 1; i <= paginas; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(`${titulo} · ${i}/${paginas}`, margenX, 290);
  }

  return Buffer.from(doc.output('arraybuffer'));
}

// -------------------- Utilidades de nombre de archivo --------------------

export function nombreArchivo(base: string): string {
  return base
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

export function prefijoFecha(fecha: string): string {
  return formatearFechaNumerica(fecha).replace(/\//g, '-');
}
