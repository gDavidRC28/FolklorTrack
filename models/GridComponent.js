import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native'; 
import CardComponent from './CardComponent';

const GridComponent = ({ regiones, navigation }) => { 
  if (!regiones || regiones.length === 0) {
    return null; 
  }

  return (
    <FlatList
      data={regiones}
      renderItem={({ item }) => (
        <CardComponent region={item} navigation={navigation} /> 
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2} 
      columnWrapperStyle={styles.row} 
      contentContainerStyle={styles.gridContainer}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    paddingHorizontal: 5, 
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
  },
});

export default GridComponent;