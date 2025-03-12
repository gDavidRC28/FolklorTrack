import { getFirestore, collection, getDocs } from 'firebase/firestore';
import appFirebase from '../firebaseConfig';

export const obtenerCategorias = async () => {
  try {
    const db = getFirestore(appFirebase);
    const categoriasCollection = collection(db, 'Categorias');
    const snapshot = await getDocs(categoriasCollection);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      estado: doc.data().estado || 'Sin estado',
    }));
  } catch (error) {
    console.error('Error al obtener datos:', error.message);
    throw error;
  }
};
