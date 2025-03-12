import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import funcionesCategorias from '../viewmodels/funcionesCategorias';

const CardComponent = ({ estado, navigation }) => (
  <TouchableOpacity 
    style={styles.card} 
    onPress={() => navigation.navigate('Vestuario', { estado })}>
    <View style={styles.circle}>
        <Text></Text>
    </View>
    <Text style={styles.text}>{estado}</Text>
  </TouchableOpacity>
);

const GridComponent = ({ categorias, navigation }) => (
  <View style={styles.grid}>
    {categorias.map((categoria) => (
      <CardComponent key={categoria.id} estado={categoria.estado} navigation={navigation} />
    ))}
  </View>
);

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
