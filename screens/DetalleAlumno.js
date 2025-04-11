import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
import appFirebase from '../firebaseConfig';

export default function detalleAlumno({  route, navigation }) {
  const { alumnoId } = route.params;

  if (!alumnoId) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>No se pudo obtener el ID del alumno</Text>
      </View>
    );
  }

  const [alumno, setAlumno] = useState(null);

  useEffect(() => {
    const fetchAlumnoDetails = async () => {
      try {
        const db = getFirestore(appFirebase);
        const alumnoDoc = doc(db, 'Alumnos', alumnoId);
        const docSnap = await getDoc(alumnoDoc);

        if (docSnap.exists()) {
          setAlumno(docSnap.data());
        } else {
          console.log('No existe el documento');
        }
      } catch (error) {
        console.error('Error al obtener los detalles:', error);
      }
    };

    fetchAlumnoDetails();
  }, [alumnoId]);

  const handleDelete = async () => {
    try {
      const db = getFirestore(appFirebase);
      const alumnoDoc = doc(db, 'Alumnos', alumnoId);
      await deleteDoc(alumnoDoc); // Elimina el documento
      Alert.alert('Éxito', 'Alumno eliminado correctamente.');
      navigation.goBack(); 
    } catch (error) {
      console.error('Error al eliminar el alumno:', error);
      Alert.alert('Error', 'No se pudo eliminar al alumno.');
    }
  };

  if (!alumno) {
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

      <TouchableOpacity style={styles.button} onPress={handleDelete}>
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
