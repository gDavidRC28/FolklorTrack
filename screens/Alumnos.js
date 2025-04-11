import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useFocusEffect } from '@react-navigation/native';
import appFirebase from '../firebaseConfig'; // Asegúrate de tener la configuración de Firebase correctamente importada.

export default function Alumnos (props) {
    const [alumnos, setAlumnos] = useState([]);

    useFocusEffect(
      React.useCallback(() => {
        const fetchAlumnos = async () => {
          try {
            const db = getFirestore(appFirebase);
            const alumnosCollection = collection(db, 'Alumnos');
            const snapshot = await getDocs(alumnosCollection);
    
            const alumnosData = snapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                id: doc.id,
                nombre: data.nombre || 'Sin nombre',
                edad: data.edad || 'sin edad',
                talla: data.talla || 'sin talla',
                genero: data.genero || 'sin genero',
                fecha_inicio: data.fecha_inicio || 'sin fecha'
              };
            });
    
            setAlumnos(alumnosData);
          } catch (error) {
            console.error('Error al obtener datos:', error.message);
            Alert.alert('Error', 'No se pudieron obtener los alumnos.');
          }
        };
    
        fetchAlumnos();
      }, []) // Dependencias del callback
    );

    // Componente de tarjeta individual
    const CardComponent = ({ alumno }) => {
      return (
        <TouchableOpacity style={styles.card} onPress={() => {
          props.navigation.navigate('detalleAlumno',{alumnoId: alumno.id});
        }}
      >
          <View style={styles.circle}>
            <Text></Text>
          </View>
          <Text style={styles.text}>{alumno.nombre}</Text>
        </TouchableOpacity>
      );
    };
  
    // Componente para mostrar las categorías en una cuadrícula
    const GridComponent = () => {
      return (
        <View style={styles.grid}>
          {alumnos.map((alumno) => (
            <CardComponent key={alumno.id} alumno={alumno} />
          ))}
        </View>
      );
    };
      
    return (
      <View style={styles.container}>
        <GridComponent />
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.navigation.navigate("CrearAlumno")}
        >
          <Text style={styles.buttonText}>Agregar alumno</Text>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  }
});
