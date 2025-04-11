import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useFocusEffect } from '@react-navigation/native';
import appFirebase from '../firebaseConfig'; // Asegúrate de tener la configuración de Firebase correctamente importada.

export default function Estados(props) {
    const [categorias, setCategorias] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchCategorias = async () => {
        try {
          const db = getFirestore(appFirebase);
          const categoriasCollection = collection(db, 'Categorias');
          const snapshot = await getDocs(categoriasCollection);

          const categoriasData = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              estado: data.estado || 'Sin estado',
            };
          });

          setCategorias(categoriasData);
        } catch (error) {
          console.error('Error al obtener datos:', error.message);
          Alert.alert('Error', 'No se pudieron obtener las categorías.');
        }
      };

      fetchCategorias();
    }, [])
  );

  const CardComponent = ({ estado }) => {
    return (
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => props.navigation.navigate('Vestuario', { estado })}>
        <View style={styles.circle}>
            <Text></Text>
        </View>
        <Text style={styles.text}>{estado}</Text>
      </TouchableOpacity>
    );
  };

  const GridComponent = () => {
    return (
      <View style={styles.grid}>
        {categorias.map((categoria) => (
          <CardComponent key={categoria.id} estado={categoria.estado} />
        ))}
      </View>
    );
  };

  return (

    <View style={styles.container}>
      <GridComponent />
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate("CrearEstado")}
      >
        <Text style={styles.buttonText}>Agregar categoría</Text>
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