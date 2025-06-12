import { useState, useCallback } from 'react';
import { supabase } from '../supabaseClient'; 
import ModeloRegion from '../models/ModeloRegion';

const obtenerRegionesSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('regiones')
      .select('id, nombre_region, img_region_url')
      .order('nombre_region', { ascending: true });

    if (error) {
      console.error('Error al obtener regiones de Supabase:', error.message);
      throw error;
    }

    return (data || []).map((item) => new ModeloRegion({
      id: item.id,
      nombre: item.nombre_region,
      img_region_url: item.img_region_url, 
    }));

  } catch (error) {
    throw error;
  }
};

export default function FuncionesRegiones() { 
  const [regiones, setRegiones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const cargarRegiones = useCallback(async () => {
    if (loading && regiones.length > 0) return; 
    setLoading(true);
    setFetchError(null);
    try {
      const regionesData = await obtenerRegionesSupabase();
      setRegiones(regionesData);
    } catch (error) {
      console.error('Error al cargar:', error.message);
      setFetchError(error.message);
      setRegiones([]);
    } finally {
      setLoading(false);
    }
  }, [loading, regiones.length]); 

  return { regiones, loading, fetchError, cargarRegiones };
}