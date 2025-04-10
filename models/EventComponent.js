import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EventComponent = ({ evento, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetalleEvento', {
        eventoId: evento.id,
        Titulo: evento.Titulo,
        Fecha: evento.getFormattedFecha(),
        Lugar: evento.Lugar,
        Detalles: evento.Detalles,
      })}
    >
      <Text style={styles.titulo}>Título: {evento.Titulo}</Text>
      <Text style={styles.fecha}>Fecha: {evento.getFormattedFecha()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fecha: {
    fontSize: 14,
    color: '#636e72',
  },
});

export default EventComponent;