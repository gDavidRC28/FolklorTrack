import { getFirestore, collection, addDoc } from 'firebase/firestore';
import appFirebase from '../firebaseConfig';

const db = getFirestore(appFirebase);

export const ServicioCrearVestuario = {
  addVestuario: async (vestuario) => {
    try {
      const vestuariosCollection = collection(db, 'Vestuario');
      await addDoc(vestuariosCollection, {
        disponibilidad: vestuario.disponibilidad,
        genero: vestuario.genero,
        talla: vestuario.talla,
        tipo: vestuario.tipo,
        estado: vestuario.estado,
      });
      return true;
    } catch (error) {
      console.error('Error al guardar vestuario:', error.message);
      return false;
    }
  },
};
