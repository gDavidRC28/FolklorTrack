import { useState, useEffect, useCallback } from "react";
import { supabase } from '../supabaseClient'; 
import Alumno from "../models/ModeloAlumno";

const obtenerAlumnosSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('alumnos')
      .select('id, nombre_alumno, talla, genero, fecha_inicio, fecha_nacimiento, foto_url, user_id')
      .order('nombre_alumno', { ascending: true });

    if (error) {
      console.error("Error al obtener alumnos de Supabase:", error.message);
      throw error;
    }
    return (data || []).map((item) => new Alumno(item));
  } catch (error) {
    throw error;
  }
};

export default function UseAlumnos() { 
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [fetchError, setFetchError] = useState(null);

  const cargarAlumnos = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const datosAlumnos = await obtenerAlumnosSupabase();
      setAlumnos(datosAlumnos); 
    } catch (error) {
      console.error("Error cargando alumnos:", error.message);
      setFetchError(error.message);
      setAlumnos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarAlumnos(); 
  }, [cargarAlumnos]); 

  return { 
    alumnos,
    loading,
    fetchError,
    refrescarAlumnos: cargarAlumnos }; 
}