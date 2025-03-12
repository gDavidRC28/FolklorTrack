import { useState } from 'react';
import { Alert } from 'react-native';
import ModeloCrearVestuario from '../models/ModeloCrearVestuario';
import { ServicioCrearVestuario } from '../services/ServicioCrearVestuario';

export default function funcionesCrearVestuario(estadoParam) {
  const [disponibilidad, setDisponibilidad] = useState(false);
  const [genero, setGenero] = useState('');
  const [talla, setTalla] = useState('');
  const [tipo, setTipo] = useState('');
  const [estado, setEstado] = useState(estadoParam || '');

  const handleGuardarVestuario = async () => {
    if (!genero || !talla || !tipo || !estado) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    const vestuario = new ModeloCrearVestuario(disponibilidad, genero, talla, tipo, estado);
    const result = await ServicioCrearVestuario.addVestuario(vestuario);

    if (result) {
      Alert.alert('Éxito', 'Vestuario guardado correctamente');
    } else {
      Alert.alert('Error', 'No se pudo guardar el vestuario.');
    }

    setDisponibilidad(false);
    setGenero('');
    setTalla('');
    setTipo('');
    setEstado('');
  };

  return {
    disponibilidad,
    setDisponibilidad,
    genero,
    setGenero,
    talla,
    setTalla,
    tipo,
    setTipo,
    estado,
    setEstado,
    handleGuardarVestuario,
  };
}
