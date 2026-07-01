/**
 * set-env.js  (CommonJS — Node.js puro, sin TypeScript)
 * ======================================================
 * Script de pre-build que inyecta variables de entorno
 * en los archivos de environment de Angular.
 *
 * Variables requeridas:
 *   SUPABASE_URL       → URL del proyecto Supabase
 *   SUPABASE_ANON_KEY  → anon/public key de Supabase
 *
 * Uso local (PowerShell):
 *   $env:SUPABASE_URL="https://xxx.supabase.co"
 *   $env:SUPABASE_ANON_KEY="eyJ..."
 *   node set-env.js
 * ======================================================
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ── Leer variables de entorno ────────────────────────────────
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

// ── Validar que existan ───────────────────────────────────────
const missing = [];
if (!supabaseUrl) missing.push('SUPABASE_URL');
if (!supabaseKey) missing.push('SUPABASE_ANON_KEY');

if (missing.length > 0) {
  console.error('\n❌ ERROR: Variables de entorno faltantes:');
  missing.forEach(v => console.error('   - ' + v));
  console.error('\nConfigúralas en Vercel/Railway o defínelas localmente.');
  console.error('Copia .env.example -> .env y completa los valores reales.\n');
  process.exit(1);
}

// ── Plantilla del archivo environment ────────────────────────
function envContent(isProd) {
  return (
    '// ARCHIVO GENERADO — NO EDITAR NI SUBIR AL REPO\n' +
    '// Generado por set-env.js el ' + new Date().toISOString() + '\n' +
    'export const environment = {\n' +
    '  production: ' + isProd + ',\n' +
    '  supabaseUrl: \'' + supabaseUrl + '\',\n' +
    '  supabaseKey: \'' + supabaseKey + '\',\n' +
    '};\n'
  );
}

// ── Escribir los archivos ────────────────────────────────────
const envDir = path.join(__dirname, 'src', 'environments');

if (!fs.existsSync(envDir)) {
  fs.mkdirSync(envDir, { recursive: true });
}

fs.writeFileSync(path.join(envDir, 'environment.ts'),      envContent(false));
fs.writeFileSync(path.join(envDir, 'environment.prod.ts'), envContent(true));

console.log('✅  Variables de entorno inyectadas en src/environments/');
