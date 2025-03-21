import { useState } from 'react';
import { Alert } from 'react-native';
import { getFirestore, collection, addDoc, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import appFirebase from '../firebaseConfig';
import ModeloVestuario from '../models/ModeloVestuario';

const db = getFirestore(appFirebase);

export default function funcionesVestuario(estadoParam) {
  const [vestuarios, setVestuarios] = useState([]);
  const [disponibilidad, setDisponibilidad] = useState(false);
  const [genero, setGenero] = useState('');
  const [talla, setTalla] = useState('');
  const [tipo, setTipo] = useState('');
  const [estado, setEstado] = useState(estadoParam || '');

  const cargarVestuario = async (estado) => {
    try {
      const vestuariosCollection = collection(db, 'Vestuario');
      const q = query(vestuariosCollection, where('estado', '==', estado));
      const snapshot = await getDocs(q);
      setVestuarios(snapshot.docs.map((doc) => new ModeloVestuario({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error al obtener vestuario:', error.message);
    }
  };

  const actualizarDisponibilidad = async (id, currentDisponibilidad) => {
    try {
      const vestuarioRef = doc(db, 'Vestuario', id);
      await updateDoc(vestuarioRef, { disponibilidad: !currentDisponibilidad });
      setVestuarios((prev) => prev.map((v) => (v.id === id ? { ...v, disponibilidad: !currentDisponibilidad } : v)));
    } catch (error) {
      console.error('Error al actualizar disponibilidad:', error.message);
    }
  };

  const handleGuardarVestuario = async () => {
    if (!genero || !talla || !tipo || !estado) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      const vestuariosCollection = collection(db, 'Vestuario');
      await addDoc(vestuariosCollection, { disponibilidad, genero, talla, tipo, estado });
      Alert.alert('Éxito', 'Vestuario guardado correctamente');
      setDisponibilidad(false);
      setGenero('');
      setTalla('');
      setTipo('');
      setEstado('');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el vestuario.');
      console.error('Error al guardar vestuario:', error.message);
    }
  };

  return {
    vestuarios,
    cargarVestuario,
    actualizarDisponibilidad,
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