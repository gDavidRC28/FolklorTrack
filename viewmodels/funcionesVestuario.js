/*import { useState, useCallback } from 'react';
import { supabase } from '../supabaseClient'; 
import ModeloVestuario from '../models/ModeloVestuario';

const obtenerVestuarios = async (regionId) => {
  if (!regionId) {
    console.warn("obtenerVestuarios llamado sin regionId");
    return [];
  }
  try {
    const { data, error } = await supabase
      .from('vestuarios')
      .select('id, tipo, talla, genero, disponible, region_id, vestuario_img_url, folio') 
      .eq('region_id', regionId) 
      .order('tipo', { ascending: true });

    if (error) {
      console.error('Error al obtener vestuarios por región:', error.message);
      throw error;
    }

    return (data || []).map((item) => new ModeloVestuario(item));
  } catch (error) {
    throw error;
  }
};

const actualizarDisponibilidad = async (vestuarioId, nuevaDisponibilidad) => {
  try {
    const { data, error } = await supabase
      .from('vestuarios')
      .update({ disponible: nuevaDisponibilidad })
      .eq('id', vestuarioId)
      .select() 
      .single(); 

    if (error) {
      console.error('Error al actualizar disponibilidad', error.message);
      throw error;
    }
    return data; 
  } catch (error) {
    throw error;
  }
};

export default function FuncionesVestuarios(regionIdParam) { 
  const [vestuarios, setVestuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const cargarVestuarios = useCallback(async () => {
    if (!regionIdParam) {
        setVestuarios([]);
        setFetchError("ID de región no proporcionado.");
        return;
    }
    if (loading && vestuarios.length > 0) return;
    setLoading(true);
    setFetchError(null);
    try {
      const vestuariosData = await obtenerVestuarios(regionIdParam);
      setVestuarios(vestuariosData);
    } catch (error) {
      console.error(`Error cargando vestuarios para region ${regionIdParam}:`, error.message);
      setFetchError(error.message);
      setVestuarios([]);
    } finally {
      setLoading(false);
    }
  }, [regionIdParam, loading, vestuarios.length]); 

  const toggleDisponibilidadVestuario = async (vestuarioId, currentDisponibilidad) => {
    try {
      const nuevaDisponibilidad = !currentDisponibilidad;
      const vestuarioActualizado = await actualizarDisponibilidad(vestuarioId, nuevaDisponibilidad);
      if (vestuarioActualizado) {
        setVestuarios((prevVestuarios) =>
          prevVestuarios.map((v) =>
            v.id === vestuarioId ? { ...v, disponible: nuevaDisponibilidad } : v
          )
        );
      }
    } catch (error) {
      console.error('Error en toggleDisponibilidadVestuario:', error.message);
    }
  };

  return {
    vestuarios,
    loading,
    fetchError,
    cargarVestuarios,
    toggleDisponibilidadVestuario,
  };
}*/