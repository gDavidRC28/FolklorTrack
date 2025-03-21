import { useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import appFirebase from '../firebaseConfig';
import ModeloCategoria from '../models/ModeloCategoria';

const obtenerCategorias = async () => {
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

export default function funcionesCategorias() {
  const [categorias, setCategorias] = useState([]);

  const cargarCategorias = async () => {
    try {
      const categoriasData = await obtenerCategorias();
      setCategorias(categoriasData.map(c => new ModeloCategoria(c))); 
    } catch (error) {
      console.error('Error al cargar categorias:', error.message);
    }
  };

  return { categorias, cargarCategorias };
}