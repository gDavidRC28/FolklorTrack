import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import funcionesCrearEvento from '../viewmodels/funcionesCrearEvento';

const CrearEvento = (props) => {
  const {
    titulo,
    setTitulo,
    detalles,
    setDetalles,
    lugar,
    setLugar,
    date,
    showDatePicker,
    setShowDatePicker,
    handleDateChange,
    handleGuardarEvento,
  } = funcionesCrearEvento();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nuevo Evento</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del evento"
        placeholderTextColor="#A0A0A0"
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Detalles del evento"
        placeholderTextColor="#A0A0A0"
        multiline
        value={detalles}
        onChangeText={setDetalles}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Lugar"
        placeholderTextColor="#A0A0A0"
        multiline
        value={lugar}
        onChangeText={setLugar}
      />
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>
          {date.toDateString() || 'Fecha'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleGuardarEvento}>
        <Text style={styles.buttonText}>Guardar Evento</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    color: '#000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateInput: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    marginBottom: 15,
  },
  dateText: {
    color: '#A0A0A0',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4DA8F7',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CrearEvento;