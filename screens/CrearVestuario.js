import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Importar Firestore
import appFirebase from '../firebaseConfig'; // Asegúrate de tener la configuración de Firebase

export default function CrearVestuario({ navigation, route }) {
  // Obtener 'estado' desde los parámetros de la navegación
  const { estado: estadoParam } = route.params || {}; // Si no hay valor, usamos un objeto vacío como fallback

  const [disponibilidad, setDisponibilidad] = useState(false);
  const [genero, setGenero] = useState('');
  const [talla, setTalla] = useState('');
  const [tipo, setTipo] = useState('');
  const [estado, setEstado] = useState(estadoParam || ''); // Establecer el valor de 'estado' con el valor recibido

  const handleGuardarVestuario = async () => {
    if (!genero || !talla || !tipo || !estado) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    try {
      const db = getFirestore(appFirebase);
      const vestuariosCollection = collection(db, 'Vestuario');

      // Crea un nuevo vestuario en Firestore
      await addDoc(vestuariosCollection, {
        disponibilidad,
        genero,
        talla,
        tipo,
        estado,
      });

      Alert.alert('Éxito', 'Vestuario guardado correctamente');
      setDisponibilidad(true);
      setGenero('');
      setTalla('');
      setTipo('');
      setEstado('');
      navigation.goBack(); // Regresar a la pantalla anterior
    } catch (error) {
      console.error('Error al guardar el vestuario:', error);
      Alert.alert('Error', 'No se pudo guardar el vestuario.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Vestuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Género"
        placeholderTextColor="#A0A0A0"
        value={genero}
        onChangeText={setGenero}
      />

      <TextInput
        style={styles.input}
        placeholder="Talla"
        placeholderTextColor="#A0A0A0"
        value={talla}
        onChangeText={setTalla}
      />

      <TextInput
        style={styles.input}
        placeholder="Estado de origen"
        placeholderTextColor="#A0A0A0"
        value={estado}
        onChangeText={setEstado}
      />

      <TextInput
        style={styles.input}
        placeholder="Tipo"
        placeholderTextColor="#A0A0A0"
        value={tipo}
        onChangeText={setTipo}
      />

      <TouchableOpacity style={styles.button} onPress={handleGuardarVestuario}>
        <Text style={styles.buttonText}>Guardar Vestuario</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    color: '#000',
  },
  button: {
    backgroundColor: '#4DA8F7',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
