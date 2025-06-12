/*import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'; 
import FuncionesVestuarios from '../viewmodels/funcionesVestuario'; 
import VestComponent from '../models/VestComponent';

export default function Vestuario() { 
  const navigation = useNavigation();
  const route = useRoute();

  const { regionId, nombreRegion } = route.params || {};

  const {
    vestuarios,
    loading,
    fetchError,
    cargarVestuarios,
    toggleDisponibilidadVestuario,
  } = FuncionesVestuarios(regionId);

  const [refreshing, setRefreshing] = React.useState(false);

  const handleLoadVestuarios = React.useCallback(() => {
    if (regionId) { 
      cargarVestuarios();
    } else {
      console.warn("Pantalla de Vestuario cargada sin regionId.");
    }
  }, [cargarVestuarios, regionId]); 

  useFocusEffect(handleLoadVestuarios);

  const onRefresh = React.useCallback(async () => {
    if (!regionId) {
        setRefreshing(false); 
        return;
    }
    setRefreshing(true);
    await cargarVestuarios();
    setRefreshing(false);
  }, [cargarVestuarios, regionId]);

  if (!regionId && !loading) {
    return (
        <View style={[styles.container, styles.centered]}>
            <Text style={styles.errorText}>No se especificó una región.</Text>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.buttonGeneric}>
                <Text style={styles.buttonText}>Volver a Regiones</Text>
            </TouchableOpacity>
        </View>
    );
  }

  if (loading && !refreshing && vestuarios.length === 0) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.messageText}>Cargando vestuarios para {nombreRegion || 'la región'}...</Text>
      </View>
    );
  }

  if (fetchError && vestuarios.length === 0 && !loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>Error al cargar vestuarios: {fetchError}</Text>
        <TouchableOpacity style={styles.buttonGeneric} onPress={handleLoadVestuarios}>
            <Text style={styles.buttonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Vestuarios de {nombreRegion || 'Región Desconocida'}
      </Text>
      {vestuarios.length === 0 && !loading && !fetchError ? ( 
        <View style={[styles.centered, styles.fullHeightCentered]}>
            <Text style={styles.messageText}>No hay vestuarios registrados para esta región.</Text>
        </View>
      ) : (
        <FlatList
          data={vestuarios}
          renderItem={({ item }) => (
            <VestComponent
              vestuario={item}
              onToggleDisponibilidad={toggleDisponibilidadVestuario} 
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.rowStyle}
          contentContainerStyle={styles.listContentContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#007BFF"]}/>
          }
        />
      )}
      <TouchableOpacity
        style={styles.buttonAdd}
        onPress={() => {
            if (regionId && nombreRegion) {
                navigation.navigate('CrearVestuario', { regionId, nombreRegion });
            } else {
                Alert.alert("Error de Navegación", "No se pudo determinar la región para crear un nuevo vestuario.");
            }
        }}
      >
        <Text style={styles.buttonText}>+ Agregar Vestuario</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fullHeightCentered: { 
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    paddingVertical: 16, 
    paddingHorizontal: 20,
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  rowStyle: { 
    justifyContent: 'space-between',
    paddingHorizontal: 10, 
  },
  listContentContainer: { 
    paddingTop: 10,
    paddingBottom: 90, 
  },
  messageText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  messageSubText: {
    fontSize: 14,
    color: '#95a5a6',
    textAlign: 'center',
    marginTop: 5,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c', 
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonAdd: {
    position: 'absolute',
    bottom: 25, 
    right: 25,
    backgroundColor: '#007BFF',
    width: 60, 
    height: 60,
    borderRadius: 30, 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonGeneric: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: { 
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});*/