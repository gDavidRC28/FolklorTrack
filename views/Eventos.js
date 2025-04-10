import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import funcionesEventos from '../viewmodels/funcionesEventos';
import EvComponent from '../models/EvComponent'; 

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
    padding: 20,
    flex: 1, 
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop:20, 
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});