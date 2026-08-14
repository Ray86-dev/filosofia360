import { NextResponse } from 'next/server';
import {
  getSesion,
  getGrupo,
  getProgramacion,
  getSituacion,
  getSesionesRango,
} from '@/lib/db';
import {
  sesionALineas,
  pdALineas,
  saALineas,
  lineasAMarkdown,
  lineasADocxBuffer,
  lineasAPdfBuffer,
  nombreArchivo,
  type Linea,
} from '@/lib/exportar';
import { rangoSemana, formatearFechaLarga } from '@/lib/calendar';

export const dynamic = 'force-dynamic';

type Tipo = 'sesion' | 'pd' | 'sa' | 'semana';
type Formato = 'md' | 'docx' | 'pdf';

const CONTENT_TYPE: Record<Formato, string> = {
  md: 'text/markdown; charset=utf-8',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  pdf: 'application/pdf',
};

function respuesta(texto: string, formato: Formato, nombre: string): NextResponse {
  const headers: Record<string, string> = {
    'Content-Type': CONTENT_TYPE[formato],
    'Content-Disposition': `attachment; filename="${nombre}.${formato}"`,
  };
  return new NextResponse(texto, { headers });
}

function respuestaBinaria(buf: Buffer, formato: Formato, nombre: string): NextResponse {
  const headers: Record<string, string> = {
    'Content-Type': CONTENT_TYPE[formato],
    'Content-Disposition': `attachment; filename="${nombre}.${formato}"`,
  };
  return new NextResponse(new Uint8Array(buf), { headers });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const tipo = (url.searchParams.get('tipo') ?? 'sesion') as Tipo;
  const formato = (url.searchParams.get('formato') ?? 'md') as Formato;
  const id = Number(url.searchParams.get('id') ?? '0');
  const fecha = url.searchParams.get('fecha') ?? '';

  try {
    if (tipo === 'sesion') {
      const sesion = getSesion(id);
      if (!sesion) return NextResponse.json({ error: 'Sesión no encontrada' }, { status: 404 });
      const grupo = getGrupo(sesion.grupoId);
      const lineas = sesionALineas(sesion, grupo);
      const nombre = nombreArchivo(`${fecha ? fecha + '-' : ''}sesion-${grupo?.codigo ?? id}`);
      return construir(lineas, formato, nombre, sesion.titulo);
    }

    if (tipo === 'pd') {
      const pd = getProgramacion(id);
      if (!pd) return NextResponse.json({ error: 'Programación no encontrada' }, { status: 404 });
      const lineas = pdALineas(pd);
      return construir(lineas, formato, nombreArchivo(pd.codigo), pd.titulo);
    }

    if (tipo === 'sa') {
      const sa = getSituacion(id);
      if (!sa) return NextResponse.json({ error: 'Situación no encontrada' }, { status: 404 });
      const lineas = saALineas(sa);
      return construir(lineas, formato, nombreArchivo(sa.codigo), sa.titulo);
    }

    if (tipo === 'semana') {
      if (!fecha) return NextResponse.json({ error: 'Falta la fecha' }, { status: 400 });
      const { lunes, viernes } = rangoSemana(fecha);
      const sesiones = getSesionesRango(lunes, viernes);
      const lineas: Linea[] = [{ kind: 'titulo', texto: `Planificación de la semana: ${formatearFechaLarga(lunes)}` }];
      for (const s of sesiones) {
        const grupo = getGrupo(s.grupoId);
        lineas.push({ kind: 'seccion', texto: `${formatearFechaLarga(s.fecha)} · ${grupo?.nombre ?? s.guion.grupo}` });
        for (const l of sesionALineas(s, grupo)) {
          if (l.kind === 'titulo') continue;
          lineas.push(l);
        }
      }
      if (sesiones.length === 0) lineas.push({ kind: 'parrafo', texto: 'No hay sesiones generadas en esta semana.' });
      return construir(lineas, formato, nombreArchivo(`semana-${lunes}`), `Semana del ${lunes}`);
    }

    return NextResponse.json({ error: 'Tipo no válido' }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'Error' }, { status: 500 });
  }
}

async function construir(lineas: Linea[], formato: Formato, nombre: string, titulo: string): Promise<NextResponse> {
  if (formato === 'md') {
    return respuesta(lineasAMarkdown(lineas), formato, nombre);
  }
  if (formato === 'docx') {
    const buf = await lineasADocxBuffer(lineas);
    return respuestaBinaria(buf, formato, nombre);
  }
  const buf = lineasAPdfBuffer(lineas, titulo);
  return respuestaBinaria(buf, formato, nombre);
}
