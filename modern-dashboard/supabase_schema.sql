-- 1. Crear la tabla 'noticias'
CREATE TABLE noticias (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    summary TEXT NOT NULL,
    source_name TEXT DEFAULT 'Fuente Externa',
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Habilitar Row Level Security (RLS) por seguridad
ALTER TABLE noticias ENABLE ROW LEVEL SECURITY;

-- 3. Crear política para permitir acceso público de solo lectura (el frontend necesita leer sin autenticación)
CREATE POLICY "Permitir lectura pública de noticias" 
ON noticias FOR SELECT 
USING (true);

-- 4. Habilitar la tabla para el canal de WebSockets (Supabase Realtime)
ALTER PUBLICATION supabase_realtime ADD TABLE noticias;
