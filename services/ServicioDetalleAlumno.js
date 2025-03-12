import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
import appFirebase from '../firebaseConfig';
import ModeloDetalleAlumno from '../models/ModeloDetalleAlumno';

class ServicioDetalleAlumno {
  constructor() {
    this.db = getFirestore(appFirebase);
  }

  async obtenerAlumno(alumnoId) {
    try {
      const alumnoDoc = doc(this.db, 'Alumnos', alumnoId);
      const docSnap = await getDoc(alumnoDoc);

      if (docSnap.exists()) {
        return new ModeloDetalleAlumno(docSnap.data());
      } else {
        console.log('No existe el documento');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener los detalles:', error);
      throw error;
    }
  }

  async eliminarAlumno(alumnoId) {
    try {
      const alumnoDoc = doc(this.db, 'Alumnos', alumnoId);
      await deleteDoc(alumnoDoc);
    } catch (error) {
      console.error('Error al eliminar el alumno:', error);
      throw error;
    }
  }
}

export default new ServicioDetalleAlumno();