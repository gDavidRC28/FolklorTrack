import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const VestComponent = ({ vestuario, actualizarDisponibilidad }) => (
  <View style={styles.vest}>
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

const styles = StyleSheet.create({
  vest: {
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
});

export default VestComponent;