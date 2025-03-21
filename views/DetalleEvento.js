import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import funcionesDetalleEvento from '../viewmodels/funcionesDetalleEvento';

export default function DetalleEvento({ route, navigation }) {
  const obtenerDetalleEvento = new funcionesDetalleEvento();
  const evento = obtenerDetalleEvento.crearEvento(route.params);

  if (!evento.id) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>No se pudo obtener el ID del evento</Text>
      </View>
    );
  }

  const eliminarEvento = () => {
    obtenerDetalleEvento.eliminarEvento(
      evento.id,
      (message) => {
        Alert.alert('Éxito', message);
        navigation.goBack();
      },
      (message) => {
        Alert.alert('Error', message);
      }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título: {evento.Titulo}</Text>
      <Text style={styles.label}>Fecha: {obtenerDetalleEvento.formatFecha(evento.Fecha)}</Text>
      <Text style={styles.label}>Lugar: {evento.Lugar}</Text>
      <Text style={styles.label}>Detalles: {evento.Detalles}</Text>

      <TouchableOpacity style={styles.button} onPress={eliminarEvento}>
        <Text style={styles.buttonText}>Eliminar Evento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FF4C4C',
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
