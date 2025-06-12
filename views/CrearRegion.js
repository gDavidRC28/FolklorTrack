import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, ScrollView } from 'react-native';
import FuncionesCrearRegion from '../viewmodels/funcionesCrearRegion'; 

export default function CrearRegion() { 
  const {
    nombreRegion,
    setNombreRegion,
    imageUri,
    pickImage, 
    handleAddRegion,
    loading,
  } = FuncionesCrearRegion();

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
            <Text style={styles.title}>Agregar Nueva Región</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre de la Región"
                value={nombreRegion}
                onChangeText={setNombreRegion}
                placeholderTextColor="#888"
            />

            <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                <Text style={styles.imagePickerButtonText}>
                {imageUri ? "Cambiar Imagen" : "Seleccionar Imagen"}
                </Text>
            </TouchableOpacity>

            {imageUri && (
                <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                </View>
            )}

            <TouchableOpacity
                style={[styles.buttonAgregar, loading && styles.buttonDisabled]}
                onPress={handleAddRegion}
                disabled={loading}
            >
                {loading ? (
                <ActivityIndicator color="#FFFFFF" />
                ) : (
                <Text style={styles.buttonText}>Agregar Región</Text>
                )}
            </TouchableOpacity>
        </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  imagePickerButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#5C6BC0', 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
  },
  imagePickerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  imagePreviewContainer: {
    width: 150,
    height: 150,
    borderRadius: 75, 
    overflow: 'hidden',
    marginBottom: 25,
    borderWidth: 2,
    borderColor: '#5C6BC0',
    backgroundColor: '#E0E0E0',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
  },
  buttonAgregar: {
    width: '90%',
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: "#A4CFFF",
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});