import React from 'react';
import { View, StyleSheet } from 'react-native';
import EventComponent from './EventComponent';

const EvComponent = ({ eventos, navigation }) => (
  <View style={styles.container}>
    {eventos.map((evento) => (
      <EventComponent key={evento.id} evento={evento} navigation={navigation} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default EvComponent;