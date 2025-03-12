import { getFirestore, collection, addDoc } from 'firebase/firestore';
import appFirebase from '../firebaseConfig';
import ModeloCrearAlumno from '../models/ModeloCrearAlumno';

class ServicioCrearAlumno {
  constructor() {
    this.db = getFirestore(appFirebase);
  }

  async agregarAlumno(alumnoData) {
    try {
      const alumno = new ModeloCrearAlumno(alumnoData);
      await addDoc(collection(this.db, 'Alumnos'),  { ...alumno });
    } catch (error) {
      console.error('Error al agregar alumno:', error);
      throw error;
    }
  }
}

export default new ServicioCrearAlumno();