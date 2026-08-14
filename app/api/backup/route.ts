import { NextResponse } from 'next/server';
import { exportarBackup } from '@/lib/backup';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = exportarBackup();
  const json = JSON.stringify(data, null, 2);
  const fecha = data.exportado.replace(/[:.]/g, '-').slice(0, 19);
  return new NextResponse(json, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': `attachment; filename="backup-filosofia360-${fecha}.json"`,
    },
  });
}
