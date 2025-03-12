import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import funcionesDetalleAlumno from '../viewmodels/funcionesDetalleAlumno';

export default function DetalleAlumno({ route, navigation }) {
  const { alumnoId } = route.params;
  const { alumno, cargando, eliminarAlumno } = funcionesDetalleAlumno(alumnoId, navigation);

  if (!alumnoId) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>No se pudo obtener el ID del alumno</Text>
      </View>
    );
  }

  if (cargando) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre: {alumno.nombre}</Text>
      <Text style={styles.label}>Edad: {alumno.edad}</Text>
      <Text style={styles.label}>Género: {alumno.genero}</Text>
      <Text style={styles.label}>Talla: {alumno.talla}</Text>
      <Text style={styles.label}>Fecha de inicio: {alumno.fecha_inicio}</Text>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => {
          Alert.alert(
            'Confirmar',
            '¿Estás seguro de que quieres eliminar este alumno?',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Eliminar', onPress: eliminarAlumno }
            ]
          );
        }}
      >
        <Text style={styles.buttonText}>Eliminar Alumno</Text>
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
  }
});
