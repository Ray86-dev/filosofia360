// Borra la base de datos local. Se vuelve a generar con el seed en el siguiente
// arranque de la app. Útil para volver a los datos de ejemplo.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataDir = path.join(root, 'data');

if (fs.existsSync(dataDir)) {
  for (const f of fs.readdirSync(dataDir)) {
    if (f.startsWith('app.db')) {
      fs.rmSync(path.join(dataDir, f), { force: true });
      console.log(`Borrado: data/${f}`);
    }
  }
}
console.log('Base de datos reiniciada. Ejecuta `npm run dev` para volver a sembrar.');
