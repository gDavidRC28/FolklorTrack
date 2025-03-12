import { useState } from 'react';
import { Alert } from 'react-native';
import ModeloCrearEvento from '../models/ModeloCrearEvento';
import { ServicioCrearEvento } from '../services/SercicioCrearEvento';

export default function funcionesCrearEvento() {
  const [titulo, setTitulo] = useState('');
  const [detalles, setDetalles] = useState('');
  const [lugar, setLugar] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleGuardarEvento = async () => {
    if (!titulo || !detalles || !lugar) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    const evento = new ModeloCrearEvento(titulo, detalles, new Date(date), lugar);
    const result = await ServicioCrearEvento.addEvento(evento);
    if (result) {
      Alert.alert('Éxito', 'Evento guardado correctamente');
    } else {
      Alert.alert('Error', 'No se pudo guardar el evento.');
    }

    setTitulo('');
    setLugar('');
    setDetalles('');
    setDate(new Date());
  };

  return {
    titulo,
    setTitulo,
    detalles,
    setDetalles,
    lugar,
    setLugar,
    date,
    showDatePicker,
    setShowDatePicker,
    handleDateChange,
    handleGuardarEvento,
  };
}