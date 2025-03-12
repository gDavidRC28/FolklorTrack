import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import funcionesVestuario from '../viewmodels/funcionesVestuario';

const CardComponent = ({ vestuario, actualizarDisponibilidad }) => (
  <View style={styles.card}>
    <Text style={styles.textBold}>{vestuario.tipo}</Text>
    <Text style={styles.text}>Género: {vestuario.genero}</Text>
    <Text style={styles.text}>Talla: {vestuario.talla}</Text>
    <TouchableOpacity onPress={() => actualizarDisponibilidad(vestuario.id, vestuario.disponibilidad)}>
      <Text style={[styles.disponibilidadText, { color: vestuario.disponibilidad ? '#4CAF50' : '#F44336' }]}>
        {vestuario.disponibilidad ? 'Disponible' : 'Ocupado'}
      </Text>
    </TouchableOpacity>
  </View>
);

export default function Vestuario({ route, navigation }) {
  const { estado } = route.params;
  const { vestuarios, cargarVestuario, actualizarDisponibilidad } = funcionesVestuario(estado);

  useFocusEffect(
    React.useCallback(() => {
      cargarVestuario();
    }, [estado])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vestuario en {estado}</Text>
      <View style={styles.grid}>
        {vestuarios.map((vestuario) => (
          <CardComponent key={vestuario.id} vestuario={vestuario} actualizarDisponibilidad={actualizarDisponibilidad} />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CrearVestuario', { estado })}>
        <Text style={styles.buttonText}>Agregar Vestuario</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center',
  },
  textBold: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
    textAlign: 'center',
  },
  disponibilidadText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
