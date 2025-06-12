/*import { useState, useCallback } from 'react';
import { supabase } from '../supabaseClient'; 
import ModeloEvento from '../models/ModeloEvento';

export const obtenerEventos = async () => {
  try {
    const { data: eventosData, error } = await supabase
      .from('eventos')
      .select('*')
      .order('fecha', { ascending: false });

    if (error) {
      console.error('Error al obtener eventos de Supabase:', error.message);
      throw error;
    }

    return eventosData ? eventosData.map((eventoDb) => new ModeloEvento({
      id: eventoDb.id,
      titulo: eventoDb.titulo,
      fecha: eventoDb.fecha,
      lugar_nombre: eventoDb.lugar_nombre,
      detalles: eventoDb.detalles,
      lugar_url: eventoDb.lugar_url, 
    })) : [];
  } catch (error) {
    throw error;
  }
};

export default function FuncionesEventos() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const cargarEventos = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const datosEventos = await obtenerEventos();
      setEventos(datosEventos);
    } catch (error) {
      console.error('Error en FuncionesEventos al cargar:', error.message);
      setFetchError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { eventos, cargarEventos, loading, fetchError };
}*/