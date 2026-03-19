import { createClient } from '@supabase/supabase-js'

// Variables de entorno para Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validación de seguridad para debug en consola
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Error: VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY no están definidas en el entorno.")
}

// Exportamos como 'supabase' para que coincida con todos los componentes
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
