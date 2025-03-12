import { useState } from 'react';
import { Alert } from 'react-native';
import ModeloCrearCategoria from '../models/ModeloCrearCategoria';
import { ServicioCrearCategoria } from '../services/ServicioCrearCategoria';

export default function funcionesCrearCategoria() {
  const [nuevoEstado, setNuevoEstado] = useState('');

  const handleAddCategory = async () => {
    if (!nuevoEstado) {
      Alert.alert('Error', 'Por favor, ingrese un nombre para el estado.');
      return;
    }

    const estado = new ModeloCrearCategoria(nuevoEstado);
    const result = await ServicioCrearCategoria.addEstado(estado);
    if (result) {
      Alert.alert('Éxito', 'Estado agregado correctamente');
    } else {
      Alert.alert('Error', 'Hubo un problema al agregar el estado');
    }
    setNuevoEstado(''); // Limpiar el campo de texto
  };

  return {
    nuevoEstado,
    setNuevoEstado,
    handleAddCategory,
  };
}
