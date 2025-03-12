import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import appFirebase from '../firebaseConfig';

const db = getFirestore(appFirebase);

export const obtenerVestuario = async (estado) => {
  try {
    const vestuariosCollection = collection(db, 'Vestuario');
    const q = query(vestuariosCollection, where('estado', '==', estado));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      disponibilidad: doc.data().disponibilidad || false,
      genero: doc.data().genero || 'Sin género',
      talla: doc.data().talla || 'Sin talla',
      tipo: doc.data().tipo || 'Sin tipo',
    }));
  } catch (error) {
    console.error('Error al obtener vestuarios:', error.message);
    throw error;
  }
};

export const obtenerVestuarioDisponible = async (id, disponibilidad) => {
  try {
    const vestuarioRef = doc(db, 'Vestuario', id);
    await updateDoc(vestuarioRef, { disponibilidad: !disponibilidad });
    return !disponibilidad;
  } catch (error) {
    console.error('Error al actualizar disponibilidad:', error.message);
    throw error;
  }
};
