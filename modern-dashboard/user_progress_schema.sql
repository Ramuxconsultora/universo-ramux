-- Tabla para rastrear el progreso académico de los usuarios
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES perfiles(id) ON DELETE CASCADE,
    course_title TEXT NOT NULL,
    progress INTEGER DEFAULT 0, -- 0 a 100
    status TEXT DEFAULT 'in-progress', -- 'in-progress', 'completed'
    last_lesson TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, course_title)
);

-- Habilitar RLS
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Política: Los usuarios solo pueden ver su propio progreso
CREATE POLICY "Usuarios pueden ver su propio progreso" 
ON user_progress FOR SELECT 
USING (auth.uid()::text = user_id);

-- Política: Los usuarios pueden actualizar su propio progreso
CREATE POLICY "Usuarios pueden actualizar su propio progreso" 
ON user_progress FOR INSERT 
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Usuarios pueden modificar su propio progreso" 
ON user_progress FOR UPDATE 
USING (auth.uid()::text = user_id);

-- Habilitar tiempo real
ALTER PUBLICATION supabase_realtime ADD TABLE user_progress;
