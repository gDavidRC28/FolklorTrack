import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import funcionesEventos from '../viewmodels/funcionesEventos';

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

const EvComponent = ({ eventos, navigation }) => (
  <View style={styles.card}>
    {eventos.map((evento) => (
      <EventComponent key={evento.id} evento={evento} navigation={navigation} />
    ))}
  </View>
);

export default function Eventos({ navigation }) {
  const { eventos, cargarEventos } = funcionesEventos();

  useFocusEffect(
    React.useCallback(() => {
      cargarEventos();
    }, [])
  );

  return (
    <View style={styles.grid}>
      <EvComponent eventos={eventos} navigation={navigation} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CrearEvento")}
      >
        <Text style={styles.buttonText}>Agregar Evento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
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
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
