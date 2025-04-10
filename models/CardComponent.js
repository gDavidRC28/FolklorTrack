import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CardComponent = ({ estado, navigation }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => navigation.navigate('Vestuario', { estado })}
  >
    <View style={styles.circle}>
      <Text></Text>
    </View>
    <Text style={styles.text}>{estado}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
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
});

export default CardComponent;