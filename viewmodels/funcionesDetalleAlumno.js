import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../supabaseClient';
import Alumno from '../models/ModeloAlumno';

const obtenerAlumnoPorIdSupabase = async (alumnoId) => {
  if (!alumnoId) return null;
  try {
    const { data, error } = await supabase
      .from('alumnos')
      .select('id, nombre_alumno, talla, genero, fecha_inicio, fecha_nacimiento, foto_url, user_id')
      .eq('id', alumnoId)
      .single(); 

    if (error) {
      if (error.code === 'PGRST116') {
        console.log(`Alumno con ID ${alumnoId} no encontrado.`);
        return null;
      }
      console.error('Error al obtener detalle del alumno:', error.message);
      throw error;
    }
    return data ? new Alumno(data) : null;
  } catch (error) {
    throw error;
  }
};

const eliminarPerfilAlumnoSupabase = async (alumno) => {
  if (!alumno || !alumno.id) throw new Error("ID de alumno no válido para eliminar.");

  try {
    if (alumno.foto_url) {
      const urlParts = alumno.foto_url.split('/');
      const bucketNameIndex = urlParts.findIndex(part => part === BUCKET_NAME_ALUMNOS); 
      if (bucketNameIndex !== -1 && bucketNameIndex + 1 < urlParts.length) {
          const filePath = urlParts.slice(bucketNameIndex + 1).join('/');
          console.log("Intentando eliminar foto:", filePath);
          const { error: storageError } = await supabase.storage
              .from(BUCKET_NAME_ALUMNOS)
              .remove([filePath]);
          if (storageError) {
              console.warn("Advertencia: No se pudo eliminar la foto del alumno del storage:", storageError.message);
          } else {
              console.log("Foto del alumno eliminada del storage.");
          }
      } else {
          console.warn("No se pudo determinar el path de la foto para eliminarla del storage:", alumno.foto_url);
      }
    }

    const { error: dbError } = await supabase
      .from('alumnos')
      .delete()
      .eq('id', alumno.id);

    if (dbError) {
      console.error('Error al eliminar alumno de la base de datos:', dbError.message);
      throw dbError;
    }
    return { success: true, message: 'Perfil del alumno eliminado correctamente.' };
  } catch (error) {
    throw error;
  }
};

export default function FuncionesDetalleAlumno(alumnoId, navigation) {
  const [alumno, setAlumno] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BUCKET_NAME_ALUMNOS = 'folklortrack'; 

  const cargarDetalleAlumno = useCallback(async () => {
    if (!alumnoId) {
      setAlumno(null); setLoading(false); setError("ID de alumno no proporcionado.");
      return;
    }
    setLoading(true); setError(null);
    try {
      const alumnoData = await obtenerAlumnoPorIdSupabase(alumnoId);
      setAlumno(alumnoData);
      if (!alumnoData) setError("Alumno no encontrado.");
    } catch (err) {
      console.error('Error en FuncionesDetalleAlumno al cargar:', err.message);
      setError(err.message);
      setAlumno(null);
    } finally {
      setLoading(false);
    }
  }, [alumnoId]);

  useEffect(() => {
    cargarDetalleAlumno();
  }, [cargarDetalleAlumno]);

  const handleEliminarAlumnoCompleto = async () => {
    if (!alumno) {
      Alert.alert("Error", "No hay datos del alumno para eliminar.");
      return;
    }

    Alert.alert(
      'Confirmar Eliminación',
      `¿Estás seguro de que quieres eliminar el perfil de ${alumno.nombre_alumno}? Esta acción eliminará sus datos de la tabla de alumnos y su foto. La cuenta de usuario asociada no se eliminará desde aquí.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar Perfil',
          onPress: async () => {
            setLoading(true);
            try {
              const result = await eliminarPerfilAlumnoSupabase(alumno); 
              Alert.alert('Éxito', result.message);
              if (navigation) navigation.goBack();
            } catch (err) {
              Alert.alert('Error al Eliminar', err.message || 'No se pudo eliminar el perfil del alumno.');
              console.error("Error:", err);
            } finally {
              setLoading(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return { 
    alumno,
    loading,
    error, 
    refrescarDetalle: cargarDetalleAlumno, 
    handleEliminarAlumnoCompleto };
}