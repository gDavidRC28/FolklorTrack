/*import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import funcionesCrearEvento from '../viewmodels/funcionesCrearEvento'; 

const CrearEvento = () => {
  const {
    titulo, setTitulo,
    detalles, setDetalles,
    lugarNombre, setLugarNombre,
    lugarUrl, setLugarUrl,
    date,
    showDatePicker, setShowDatePicker,
    handleDateChange,
    handleGuardarEvento,
  } = funcionesCrearEvento();

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
    >
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContentContainer}>
            <Text style={styles.title}>Crear Nuevo Evento</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre del evento (Título)"
                placeholderTextColor="#A0A0A0"
                value={titulo}
                onChangeText={setTitulo}
            />

            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Detalles del evento"
                placeholderTextColor="#A0A0A0"
                multiline
                numberOfLines={4}
                value={detalles}
                onChangeText={setDetalles}
            />

            <TextInput
                style={styles.input}
                placeholder="Nombre del Lugar (Ej: Auditorio Municipal)"
                placeholderTextColor="#A0A0A0"
                value={lugarNombre}
                onChangeText={setLugarNombre}
            />

            <TextInput
                style={styles.input}
                placeholder="URL del Lugar en Mapa (Opcional)"
                placeholderTextColor="#A0A0A0"
                value={lugarUrl}
                onChangeText={setLugarUrl}
                keyboardType="url"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
            >
                <Text style={styles.dateText}>
                {date ? date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Seleccionar Fecha'}
                </Text>
            </TouchableOpacity>

            {showDatePicker && (
                <DateTimePicker
                value={date || new Date()} 
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleDateChange}
                />
            )}

            <TouchableOpacity style={styles.button} onPress={handleGuardarEvento}>
                <Text style={styles.buttonText}>Guardar Evento</Text>
            </TouchableOpacity>
        </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#333',
  },
  input: {
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 10, 
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
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  dateText: {
    color: '#333',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CrearEvento;*/