import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
import appFirebase from '../firebaseConfig';
import ModeloAlumno from '../models/ModeloAlumno';

const obtenerAlumno = async (alumnoId) => {
  try {
    const db = getFirestore(appFirebase);
    const alumnoDoc = doc(db, 'Alumnos', alumnoId);
    const docSnap = await getDoc(alumnoDoc);

    if (docSnap.exists()) {
      return new ModeloAlumno(docSnap.data());
    } else {
      console.log('No existe el documento');
      return null;
    }
  } catch (error) {
    console.error('Error al obtener los detalles:', error);
    throw error;
  }
};

const eliminarAlumno = async (alumnoId) => {
  try {
    const db = getFirestore(appFirebase);
    const alumnoDoc = doc(db, 'Alumnos', alumnoId);
    await deleteDoc(alumnoDoc);
  } catch (error) {
    console.error('Error al eliminar el alumno:', error);
    throw error;
  }
};

const funcionesDetalleAlumno = (alumnoId, navigation) => {
  const [alumno, setAlumno] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerDetalleAlumno = async () => {
      setCargando(true);
      try {
        const alumnoData = await obtenerAlumno(alumnoId);
        setAlumno(alumnoData);
      } catch (error) {
        console.error('Error al obtener los detalles:', error);
      }
      setCargando(false);
    };

    obtenerDetalleAlumno();
  }, [alumnoId]);

  const handleEliminarAlumno = async () => {
    try {
      await eliminarAlumno(alumnoId);
      navigation.goBack();
    } catch (error) {
      console.error('Error al eliminar el alumno:', error);
    }
  };

  return { alumno, cargando, handleEliminarAlumno };
};
export default funcionesDetalleAlumno;