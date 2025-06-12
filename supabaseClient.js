import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Validación de variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Error: No es posible conectar con la url o la key agregadas");
  console.error("Verifica que tu .env contenga los REACT_APP_SUPABASE_URL y REACT_APP_SUPABASE_ANON_KEY correctos.");
  throw new Error("La configuración de SUPABASE no es correcta, revise la información requerida.");
}

// Creación y exportación de la instancia del cliente Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);