import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import appFirebase from '../firebaseConfig';

export default function DetalleEvento({ route, navigation }) {
  const { eventoId, Titulo, Fecha, Lugar, Detalles } = route.params;

  // Función para formatear la fecha
  const formatFecha = (timestamp) => {
    if (!timestamp || !timestamp.seconds) {
      return 'Fecha no disponible';
    }
    const date = new Date(timestamp.seconds * 1000); 
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  // Función para eliminar el evento de Firestore
  const eliminarEvento = async () => {
    try {
      const db = getFirestore(appFirebase);
      const eventoRef = doc(db, 'Eventos', eventoId); // Referencia al documento del evento
      await deleteDoc(eventoRef); // Elimina el evento de Firestore
      Alert.alert('Éxito', 'El evento ha sido eliminado'); // Notificación de éxito
      navigation.goBack(); // Regresar a la pantalla anterior
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
      Alert.alert('Error', 'No se pudo eliminar el evento');
    }
  };

  // Verificar que el eventoId esté presente
  if (!eventoId) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>No se pudo obtener el ID del evento</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título: {Titulo}</Text>
      <Text style={styles.label}>Fecha: {formatFecha(Fecha)}</Text>
      <Text style={styles.label}>Lugar: {Lugar}</Text>
      <Text style={styles.label}>Detalles: {Detalles}</Text>

      {/* Botón para eliminar el evento */}
      <TouchableOpacity
        style={styles.button}
        onPress={eliminarEvento} // Llama a la función eliminarEvento al presionar
      >
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
