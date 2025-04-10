import React from 'react';
import { View, StyleSheet } from 'react-native';
import CardComponent from './CardComponent'; 

const GridComponent = ({ categorias, navigation }) => (
  <View style={styles.grid}>
    {categorias.map((categoria) => (
      <CardComponent key={categoria.id} estado={categoria.estado} navigation={navigation} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
});

export default GridComponent;