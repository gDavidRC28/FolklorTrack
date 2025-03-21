import { useState } from 'react';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import appFirebase from '../firebaseConfig';
import ModeloVestuario from '../models/ModeloVestuario';

const db = getFirestore(appFirebase);

const obtenerVestuario = async (estado) => {
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

const obtenerVestuarioDisponible = async (id, disponibilidad) => {
  try {
    const vestuarioRef = doc(db, 'Vestuario', id);
    await updateDoc(vestuarioRef, { disponibilidad: !disponibilidad });
    return !disponibilidad;
  } catch (error) {
    console.error('Error al actualizar disponibilidad:', error.message);
    throw error;
  }
};

export default function funcionesVestuario(estado) {
  const [vestuarios, setVestuarios] = useState([]);

  const cargarVestuario = async () => {
    try {
      const data = await obtenerVestuario(estado);
      setVestuarios(data.map(v => new ModeloVestuario(v)));
    } catch (error) {
      console.error('Error al obtener vestuario:', error.message);
    }
  };

  const actualizarDisponibilidad = async (id, currentDisponibilidad) => {
    try {
      const newDisponibilidad = await obtenerVestuarioDisponible(id, currentDisponibilidad);
      setVestuarios(prev => prev.map(v => v.id === id ? { ...v, disponibilidad: newDisponibilidad } : v));
    } catch (error) {
      console.error('Error al actualizar disponibilidad:', error.message);
    }
  };

  return { vestuarios, cargarVestuario, actualizarDisponibilidad };
}
