import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import funcionesVestuario from '../viewmodels/funcionesVestuario';
import VestComponent from '../models/VestComponent'; 

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
          <VestComponent key={vestuario.id} vestuario={vestuario} actualizarDisponibilidad={actualizarDisponibilidad} />
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