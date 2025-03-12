import { getFirestore, collection, addDoc } from 'firebase/firestore';
import appFirebase from '../firebaseConfig';

const db = getFirestore(appFirebase);

export const ServicioCrearCategoria = {
  addEstado: async (estado) => {
    try {
      await addDoc(collection(db, 'Categorias'), { ...estado });
      return true;
    } catch (error) {
      console.error('Error al agregar estado:', error.message);
      return false;
    }
  },
};
