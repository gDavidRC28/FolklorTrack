import React from 'react';
import { View, Text, StyleSheet, TextInput, Alert, TouchableOpacity } from 'react-native';
import funcionesCrearCategoria from '../viewmodels/funcionesCrearCategoria';

export default function CrearCategorias(props) {
  const {
    nuevoEstado,
    setNuevoEstado,
    handleAddCategory,
  } = funcionesCrearCategoria();

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
