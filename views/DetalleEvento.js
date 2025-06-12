/*import React from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, Linking, Platform } from 'react-native';
import FuncionesDetalleEvento from '../viewmodels/funcionesDetalleEvento';

export default function DetalleEvento({ route, navigation }) {
  const detalleEventoLogic = React.useMemo(() => new FuncionesDetalleEvento(), []);
  const evento = React.useMemo(() => {
    if (route.params) {
      return detalleEventoLogic.crearEvento(route.params);
    }
    return null; 
  }, [route.params, detalleEventoLogic]);


  if (!evento || !evento.id) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>No se pudo cargar la información del evento o el ID es inválido.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.buttonVolver}>
            <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleOpenURL = async (url) => {
    if (!url) return;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", `No se puede abrir esta URL: ${url}`);
    }
  };

  const handleEliminarEvento = () => {
    if (!evento.id) return;
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          onPress: () => {
            detalleEventoLogic.eliminarEvento(
              evento.id,
              (message) => {
                Alert.alert('Éxito', message);
                navigation.goBack();
              },
              (message) => {
                Alert.alert('Error al eliminar', message);
              }
            );
          },
          style: "destructive"
        }
      ],
      { cancelable: true } 
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContentContainer}>
      <View style={styles.card}>
        <Text style={styles.mainTitle}>{evento.Titulo}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Fecha:</Text>
          <Text style={styles.value}>{evento.getFormattedFecha()}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Lugar:</Text>
          <Text style={styles.value}>{evento.LugarNombre}</Text>
        </View>

        {evento.LugarURL && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Mapa:</Text>
            <TouchableOpacity onPress={() => handleOpenURL(evento.LugarURL)}>
              <Text style={[styles.value, styles.linkText]}>Ver en mapa</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.detailsTitle}>Detalles:</Text>
        <Text style={styles.detailsValue}>{evento.Detalles}</Text>
      </View>

      <TouchableOpacity style={styles.buttonEliminar} onPress={handleEliminarEvento}>
        <Text style={styles.buttonText}>Eliminar Evento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8', 
  },
  scrollContentContainer: {
    paddingBottom: 30,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 17,
    color: '#D32F2F', 
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#2C3E50',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 16,
    fontWeight: '600', 
    color: '#555F61',
    marginRight: 8,
    minWidth: 75,
  },
  value: {
    fontSize: 16,
    color: '#2C3E50',
    flex: 1,
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: Platform.OS === 'ios' ? 'underline' : 'none', 
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495E',
    marginTop: 20,
    marginBottom: 8,
    borderTopWidth: 1,
    borderTopColor: '#EAECEE',
    paddingTop: 15,
  },
  detailsValue: {
    fontSize: 16,
    color: '#34495E',
    lineHeight: 24, 
  },
  buttonEliminar: {
    backgroundColor: '#E74C3C', 
    paddingVertical: 14,
    borderRadius: 8,
    marginHorizontal: 15,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.20,
    shadowRadius: 2.5,
    elevation: 3,
  },
  buttonVolver: { 
    backgroundColor: '#3498DB',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});*/