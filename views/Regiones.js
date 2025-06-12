import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import FuncionesRegiones from '../viewmodels/funcionesRegiones';
import GridComponent from '../models/GridComponent'; 

export default function Regiones({ navigation }) {
  const { regiones, loading, fetchError, cargarRegiones } = FuncionesRegiones();
  const [refreshing, setRefreshing] = React.useState(false);

  const handleLoadRegiones = React.useCallback(() => {
    cargarRegiones();
  }, [cargarRegiones]);

  useFocusEffect(handleLoadRegiones);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await cargarRegiones(); 
    setRefreshing(false);
  }, [cargarRegiones]);

  if (loading && !refreshing && regiones.length === 0) {
    return (
      <View style={[styles.containerCentered, styles.fullScreenCentered]}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Cargando regiones...</Text>
      </View>
    );
  }

  if (fetchError && regiones.length === 0) {
    return (
      <View style={[styles.containerCentered, styles.fullScreenCentered]}>
        <Text style={styles.errorText}>Error al cargar regiones: {fetchError}</Text>
        <TouchableOpacity style={styles.buttonRetry} onPress={handleLoadRegiones}>
            <Text style={styles.buttonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {regiones.length === 0 && !loading ? (
          <ScrollView
            contentContainerStyle={[styles.containerCentered, styles.fullScreenCentered]}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#007BFF"]}/>
            }
          >
            <Text style={styles.noDataText}>No hay regiones disponibles.</Text>
          </ScrollView>
      ) : (
        <GridComponent regiones={regiones} navigation={navigation} />
      )}
      <TouchableOpacity
        style={styles.buttonFixedAdd}
        onPress={() => navigation.navigate("CrearRegion")}
      >
        <Text style={styles.buttonText}>+ Agregar Región</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  containerCentered: { 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullScreenCentered: { 
    flex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  noDataText: {
      fontSize: 18,
      color: '#7f8c8d',
      marginBottom: 8,
  },
  noDataSubText: {
      fontSize: 14,
      color: '#95a5a6',
  },
  buttonRetry: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  buttonFixedAdd: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007BFF',
    width: 160,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});