import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import appFirebase from '../firebaseConfig'; // Asegúrate de tener la configuración de Firebase correctamente importada.

const db = getFirestore(appFirebase);

export default function CrearEstado(props) {
  const [nuevoEstado, setNuevoEstado] = useState('');

  // Función para agregar el estado
  const handleAddCategory = async () => {
    if (!nuevoEstado) {
      Alert.alert('Error', 'Por favor, ingrese un nombre para el estado.');
      return;
    }

    try {
      // Agregar el estado a Firestore
      await addDoc(collection(db, 'Categorias'), { estado: nuevoEstado });
      Alert.alert('Éxito', 'Estado agregado correctamente');
      setNuevoEstado(''); // Limpiar el campo de texto
      props.navigation.goBack(); // Regresar a la pantalla anterior
    } catch (error) {
      console.error('Error al agregar estado:', error.message);
      Alert.alert('Error', `Hubo un problema al agregar el estado: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nuevo Estado"
        value={nuevoEstado}
        onChangeText={setNuevoEstado}
      />
      
      <TouchableOpacity style={styles.botonEnviar} onPress={handleAddCategory}>
        <Text style={styles.textoEnviar}>Agregar Estado</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
    width: '80%',
  },
  botonEnviar: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  textoEnviar: {
    color: 'white',
    fontSize: 18,
  },
});
