import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native'; // Asegúrate de importar useFocusEffect
import appFirebase from '../firebaseConfig';

const EventComponent = ({ Titulo, Fecha, Lugar, Detalles, eventoId, navigation }) => {
  const formatFecha = (timestamp) => {
    if (!timestamp || !timestamp.seconds) {
      return 'Fecha no disponibles';
    }
    const date = new Date(timestamp.seconds * 1000); 
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        navigation.navigate('detalleEvento', {
          eventoId: eventoId, 
          Titulo: Titulo,
          Fecha: Fecha,
          Lugar: Lugar,
          Detalles: Detalles,
        });
      }}
    >
      <Text style={styles.titulo}>Título: {Titulo}</Text>
      <Text style={styles.fecha}>Fecha: {formatFecha(Fecha)}</Text>
    </TouchableOpacity>
  );
};

// Componente que consulta Firestore y muestra los eventos
const EvComponent = ({ navigation }) => {
  const [eventos, setEventos] = useState([]);

  const fetchEventos = async () => {
    try {
      const db = getFirestore(appFirebase);
      const eventosCollection = collection(db, 'Eventos');
      const snapshot = await getDocs(eventosCollection);
      
      const eventosData = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          Titulo: data.Titulo || 'Título no disponible',
          Fecha: data.Fecha || 'Fecha no disponible',
          Lugar: data.Lugar || 'Lugar no disponible',
          Detalles: data.Detalles || 'Descripción no disponible',
        };
      });

      setEventos(eventosData);
    } catch (error) {
      console.error('Error al obtener los eventos:', error.message);
      Alert.alert('Error', 'No se pudieron obtener los eventos.');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchEventos(); 
    }, [])
  );

  return (
    <View style={styles.card}>
      {eventos.map((evento) => (
        <EventComponent
          key={evento.id}
          Titulo={evento.Titulo}
          Fecha={evento.Fecha}
          Lugar={evento.Lugar}
          Detalles={evento.Detalles}
          eventoId={evento.id}
          navigation={navigation} // Pasamos navigation al EventComponent
        />
      ))}
    </View>
  );
};

export default function Eventos(props) {
  return (
    <View style={styles.grid}>
      <EvComponent navigation={props.navigation} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate("CrearEvento")}
      >
        <Text style={styles.buttonText}>Agregar Evento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20, // Espaciado interno
    marginHorizontal: 16, // Espaciado lateral
    marginVertical: 10, // Espaciado vertical
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  fecha: {
    fontSize: 14,
    color: '#636e72',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
