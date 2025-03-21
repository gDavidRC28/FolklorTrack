import { useState } from 'react';
import { Alert } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import appFirebase from '../firebaseConfig';
import ModeloCategoria from '../models/ModeloCategoria';

const db = getFirestore(appFirebase);

const addEstado = async (estado) => {
  try {
    await addDoc(collection(db, 'Categorias'), { ...estado });
    return true;
  } catch (error) {
    console.error('Error al agregar estado:', error.message);
    return false;
  }
};

export default function funcionesCrearCategoria() {
  const [nuevoEstado, setNuevoEstado] = useState('');

  const handleAddCategory = async () => {
    if (!nuevoEstado) {
      Alert.alert('Error', 'Por favor, ingrese un nombre para el estado.');
      return;
    }

    const nuevaCategoria = new ModeloCategoria({ estado: nuevoEstado }); 
    const result = await addEstado(nuevaCategoria);
    
    if (result) {
      Alert.alert('Éxito', 'Estado agregado correctamente');
    } else {
      Alert.alert('Error', 'Hubo un problema al agregar el estado');
    }
    
    setNuevoEstado(''); 
  };

  return {
    nuevoEstado,
    setNuevoEstado,
    handleAddCategory,
  };
}