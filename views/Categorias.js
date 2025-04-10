import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import funcionesCategorias from '../viewmodels/funcionesCategorias';
import GridComponent from '../models/GridComponent'; 

export default function Categorias({ navigation }) {
  const { categorias, cargarCategorias } = funcionesCategorias();

  useFocusEffect(
    React.useCallback(() => {
      cargarCategorias();
    }, [])
  );

  return (
    <View style={styles.container}>
      <GridComponent categorias={categorias} navigation={navigation} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CrearEstado")}
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
  },
});