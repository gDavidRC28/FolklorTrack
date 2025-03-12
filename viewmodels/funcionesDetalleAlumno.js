import { useState, useEffect } from 'react';
import ServicioDetalleAlumno from '../services/ServicioDetalleAlumno';

const funcionesDetalleAlumno = (alumnoId, navigation) => {
  const [alumno, setAlumno] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerDetalleAlumno = async () => {
      setCargando(true);
      try {
        const alumnoData = await ServicioDetalleAlumno.obtenerAlumno(alumnoId);
        setAlumno(alumnoData);
      } catch (error) {
        console.error('Error al obtener los detalles:', error);
      }
      setCargando(false);
    };

    obtenerDetalleAlumno();
  }, [alumnoId]);

  const eliminarAlumno = async () => {
    try {
      await ServicioDetalleAlumno.eliminarAlumno(alumnoId);
      navigation.goBack();
    } catch (error) {
      console.error('Error al eliminar el alumno:', error);
    }
  };

  return { alumno, cargando, eliminarAlumno };
};

export default funcionesDetalleAlumno;