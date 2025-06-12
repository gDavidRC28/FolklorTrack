/*import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import funcionesEventos from '../viewmodels/funcionesEventos'; 
import EventComponent from '../models/EvComponent'; 

export default function Eventos({ navigation }) {
  const { eventos, cargarEventos, loading, fetchError } = funcionesEventos();
  const [refreshing, setRefreshing] = React.useState(false);

  const handleLoadEventos = React.useCallback(() => {
    cargarEventos();
  }, [cargarEventos]);

  useFocusEffect(handleLoadEventos);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await cargarEventos();
    setRefreshing(false);
  }, [cargarEventos]);

  if (loading && !refreshing && eventos.length === 0) { 
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text>Cargando eventos...</Text>
      </View>
    );
  }

  if (fetchError && eventos.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>Error al cargar eventos: {fetchError}</Text>
        <TouchableOpacity style={styles.buttonRetry} onPress={handleLoadEventos}>
            <Text style={styles.buttonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {eventos.length === 0 && !loading ? (
        <View style={styles.centered}>
            <Text style={styles.noEventsText}>No hay eventos disponibles en este momento.</Text>
            <Text style={styles.noEventsSubText}>¡Crea uno nuevo!</Text>
        </View>
      ) : (
        <FlatList
          data={eventos}
          renderItem={({ item }) => <EventComponent evento={item} navigation={navigation} />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContentContainer}
          refreshControl={ 
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#007BFF"]}/>
          }
        />
      )}
      <TouchableOpacity
        style={styles.buttonAgregar}
        onPress={() => navigation.navigate("CrearEvento")}
      >
        <Text style={styles.buttonText}>+ Agregar Evento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  noEventsText: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  noEventsSubText: {
    fontSize: 14,
    color: '#95a5a6',
  },
  listContentContainer: {
    paddingBottom: 80, 
  },
  buttonAgregar: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007BFF',
    width: 160, 
    height: 50,
    borderRadius: 25, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
  },
  buttonRetry: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginTop:10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});*/