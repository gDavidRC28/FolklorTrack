import { getFirestore, collection, getDocs } from 'firebase/firestore';
import appFirebase from '../firebaseConfig';

export const obtenerEventos = async () => {
  try {
    const db = getFirestore(appFirebase);
    const eventosCollection = collection(db, 'Eventos');
    const snapshot = await getDocs(eventosCollection);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        Titulo: data.Titulo || 'Título no disponible',
        Fecha: data.Fecha || 'Fecha no disponible',
        Lugar: data.Lugar || 'Lugar no disponible',
        Detalles: data.Detalles || 'Descripción no disponible',
      };
    });
  } catch (error) {
    console.error('Error al obtener eventos:', error.message);
    throw error;
  }
};
