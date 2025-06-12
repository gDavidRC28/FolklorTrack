/*import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const EventComponent = ({ evento, navigation }) => {
  if (!evento) return null; 

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('DetalleEvento', { 
        eventoId: evento.id,
        Titulo: evento.Titulo,
        Fecha: evento.Fecha instanceof Date ? evento.Fecha.toISOString() : evento.Fecha,
        LugarNombre: evento.LugarNombre,
        Detalles: evento.Detalles,
        LugarURL: evento.LugarURL,
      })}
    >
      <Text style={styles.titulo}>{evento.Titulo || 'Sin título'}</Text>
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
    elevation: 3,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  fecha: {
    fontSize: 14,
    color: '#636e72',
    marginBottom: 5,
  },
  lugar: {
    fontSize: 13,
    color: '#7f8c8d',
  }
});

export default EventComponent;*/