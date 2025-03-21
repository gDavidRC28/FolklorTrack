import { useState } from 'react';
import { Alert } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import appFirebase from '../firebaseConfig';
import ModeloEvento from '../models/ModeloEvento';

const db = getFirestore(appFirebase);

const ServicioCrearEvento = {
  addEvento: async (evento) => {
    try {
      const eventosCollection = collection(db, 'Eventos');
      await addDoc(eventosCollection, {
        Titulo: evento.titulo,
        Detalles: evento.detalles,
        Fecha: evento.fecha,
        Lugar: evento.lugar,
      });
      return true;
    } catch (error) {
      console.error('Error al guardar evento:', error.message);
      return false;
    }
  },
};

export default function FuncionesCrearEvento() {
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

    const evento = new ModeloEvento({ titulo, detalles, fecha: date, lugar });
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
