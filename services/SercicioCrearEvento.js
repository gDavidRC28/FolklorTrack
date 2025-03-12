import { getFirestore, collection, addDoc } from 'firebase/firestore';
import appFirebase from '../firebaseConfig';

const db = getFirestore(appFirebase);

export const ServicioCrearEvento = {
  addEvento: async (evento) => {
    try {
      const eventosCollection = collection(db, 'Eventos');
      await addDoc(eventosCollection, {
        Titulo: evento.titulo,
        Detalles: evento.detalles,
        Fecha: evento.fecha,
        Lugar: evento.lugar,
      });
      return true;
    } catch (error) {
      console.error('Error al guardar evento:', error.message);
      return false;
    }
  },
};
