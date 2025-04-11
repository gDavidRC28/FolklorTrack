import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import appFirebase from '../firebaseConfig';

export default function Vestuario({ route, navigation }) {
  const { estado } = route.params;
  const [vestuarios, setVestuarios] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchVestuarios = async () => {
        try {
          const db = getFirestore(appFirebase);
          const vestuariosCollection = collection(db, 'Vestuario');
          const q = query(vestuariosCollection, where('estado', '==', estado)); // Filtrar por estado
          const snapshot = await getDocs(q);

          const vestuariosData = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              disponibilidad: data.disponibilidad || false,
              genero: data.genero || 'Sin género',
              talla: data.talla || 'Sin talla',
              tipo: data.tipo || 'Sin tipo',
            };
          });

          setVestuarios(vestuariosData);
        } catch (error) {
          console.error('Error al obtener vestuarios:', error.message);
          Alert.alert('Error', 'No se pudieron obtener los vestuarios.');
        }
      };

      fetchVestuarios();
    }, [estado])
  );

  const toggleDisponibilidad = async (id, currentDisponibilidad) => {
    try {
      const db = getFirestore(appFirebase);
      const vestuarioRef = doc(db, 'Vestuario', id);
      const newDisponibilidad = !currentDisponibilidad;

      await updateDoc(vestuarioRef, { disponibilidad: newDisponibilidad });

      setVestuarios((prevVestuarios) =>
        prevVestuarios.map((vestuario) =>
          vestuario.id === id
            ? { ...vestuario, disponibilidad: newDisponibilidad }
            : vestuario
        )
      );
    } catch (error) {
      console.error('Error al actualizar disponibilidad:', error.message);
      Alert.alert('Error', 'No se pudo actualizar la disponibilidad.');
    }
  };

  const CardComponent = ({ vestuario }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.textBold}>{vestuario.tipo}</Text>
        <Text style={styles.text}>Género: {vestuario.genero}</Text>
        <Text style={styles.text}>Talla: {vestuario.talla}</Text>
        <TouchableOpacity
          onPress={() => toggleDisponibilidad(vestuario.id, vestuario.disponibilidad)}
        >
          <Text
            style={[
              styles.disponibilidadText,
              { color: vestuario.disponibilidad ? '#4CAF50' : '#F44336' },
            ]}
          >
            {vestuario.disponibilidad ? 'Disponible' : 'Ocupado'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const GridComponent = () => {
    return (
      <View style={styles.grid}>
        {vestuarios.map((vestuario) => (
          <CardComponent key={vestuario.id} vestuario={vestuario} />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vestuario en {estado}</Text>
      <GridComponent />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CrearVestuario',{estado: estado})}
      >
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
