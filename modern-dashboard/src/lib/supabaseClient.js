import { createClient } from '@supabase/supabase-js'

// Usando la llave pública (anon) correcta para el navegador para evitar el error de "Forbidden use of secret API key"
const supabaseUrl = "https://gwqjgddgadljotrwcmde.supabase.co"
const supabaseAnonKey = "sb_publishable_ssk19Kx5DDUgVOd-Y7tmYQ_6-_S_VvY"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
