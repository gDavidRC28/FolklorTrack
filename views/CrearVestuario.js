import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import funcionesCrearVestuario from '../viewmodels/funcionesCrearVestuario';

const CrearVestuario = ({ navigation, route }) => {
  const { estado: estadoParam } = route.params || {}; // Fallback al estado vacío si no existe en los parámetros
  const {
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
  } = funcionesCrearVestuario(estadoParam);

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
};

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

export default CrearVestuario;
