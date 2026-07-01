/**
 * set-env.ts
 * ============================================================
 * Script de pre-build que inyecta variables de entorno en los
 * archivos de environment de Angular.
 *
 * Variables de entorno requeridas:
 *   - SUPABASE_URL
 *   - SUPABASE_ANON_KEY
 * ============================================================
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Compatibilidad con ES modules (reemplaza __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Leer variables de entorno ───────────────────────────────
const supabaseUrl = process.env['SUPABASE_URL'];
const supabaseKey = process.env['SUPABASE_ANON_KEY'];

// ─── Validar que existan ──────────────────────────────────────
const missing: string[] = [];
if (!supabaseUrl) missing.push('SUPABASE_URL');
if (!supabaseKey) missing.push('SUPABASE_ANON_KEY');

if (missing.length > 0) {
  console.error('\n❌ ERROR: Variables de entorno faltantes:');
  missing.forEach((v) => console.error(`   - ${v}`));
  console.error('\nConfigúralas en Vercel/Railway o en un archivo .env local.');
  console.error('Copia .env.example → .env y completa los valores reales.\n');
  process.exit(1);
}

// ─── Contenido de los archivos de environment ────────────────
const envContent = (isProd: boolean) =>
  `// ARCHIVO GENERADO AUTOMÁTICAMENTE — NO EDITAR NI SUBIR AL REPO
// Generado por set-env.ts el ${new Date().toISOString()}
export const environment = {
  production: ${isProd},
  supabaseUrl: '${supabaseUrl}',
  supabaseKey: '${supabaseKey}',
};
`;

// ─── Rutas de salida ──────────────────────────────────────────
const envDir = path.join(__dirname, 'src', 'environments');

if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

fs.writeFileSync(path.join(envDir, 'environment.ts'), envContent(false));
fs.writeFileSync(path.join(envDir, 'environment.prod.ts'), envContent(true));

console.log('✅ Variables de entorno inyectadas correctamente en src/environments/');
