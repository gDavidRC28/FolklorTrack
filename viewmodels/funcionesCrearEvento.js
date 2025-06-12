/*import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import { supabase } from '../supabaseClient';

const ServicioCrearEvento = {
  addEvento: async (AgregarEvento) => {
    try {
      const { data, error } = await supabase
        .from('eventos')
        .insert([AgregarEvento]) 
        .select(); 

      if (error) {
        console.error('Error al guardar evento en Supabase:', error.message);
        throw error;
      }
      console.log('Evento guardado:', data);
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default function FuncionesCrearEvento() {
  const [titulo, setTitulo] = useState('');
  const [detalles, setDetalles] = useState('');
  const [lugarNombre, setLugarNombre] = useState('');
  const [lugarUrl, setLugarUrl] = useState(''); 
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleGuardarEvento = async () => {
    if (!titulo || !detalles || !lugarNombre) {
      Alert.alert('Error', 'Por favor, complete título, detalles y nombre del lugar.');
      return;
    }

    const eventoParaGuardar = {
      titulo: titulo,
      fecha: date.toISOString(),
      lugar_nombre: lugarNombre,
      detalles: detalles,
      lugar_url: lugarUrl || null, 
    };

    try {
      const result = await ServicioCrearEvento.addEvento(eventoParaGuardar);
      if (result) {
        Alert.alert('Éxito', 'Evento guardado correctamente');
        setTitulo('');
        setLugarNombre('');
        setDetalles('');
        setLugarUrl(''); 
        setDate(new Date());
      } else {
        Alert.alert('Error', 'No se pudo guardar el evento. Revise la consola.');
      }
    } catch (error) {
        Alert.alert('Error al guardar', error.message || 'Ocurrió un error desconocido.');
    }
  };

  return {
    titulo, setTitulo,
    detalles, setDetalles,
    lugarNombre, setLugarNombre,
    lugarUrl, setLugarUrl, 
    date,
    showDatePicker, setShowDatePicker,
    handleDateChange,
    handleGuardarEvento,
  };
}*/