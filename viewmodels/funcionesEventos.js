import { useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import appFirebase from '../firebaseConfig';
import ModeloEvento from '../models/ModeloEvento';

const db = getFirestore(appFirebase);

export const obtenerEventos = async () => {
  try {
    const eventosCollection = collection(db, 'Eventos');
    const snapshot = await getDocs(eventosCollection);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      const fecha = data.Fecha && data.Fecha.seconds ? data.Fecha : null; 
      return new ModeloEvento({
        id: doc.id,
        Titulo: data.Titulo || 'Título no disponible',
        Fecha: fecha ? fecha : 'Fecha no disponible', 
        Lugar: data.Lugar || 'Lugar no disponible',
        Detalles: data.Detalles || 'Descripción no disponible',
      });
    });
  } catch (error) {
    console.error('Error al obtener eventos:', error.message);
    throw error;
  }
};

export default function FuncionesEventos() {
  const [eventos, setEventos] = useState([]);

  const cargarEventos = async () => {
    try {
      const datosEventos = await obtenerEventos();
      setEventos(datosEventos);
    } catch (error) {
      console.error('Error en Eventos:', error.message);
    }
  };

  return { eventos, cargarEventos };
}
