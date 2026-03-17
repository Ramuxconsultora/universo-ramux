import { createClient } from '@supabase/supabase-js'

// Usando la llave pública (anon) correcta para el navegador para evitar el error de "Forbidden use of secret API key"
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Error: VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY no están definidas en el entorno.")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
