/*import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, ActivityIndicator, Switch, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FuncionesCrearVestuario from '../viewmodels/funcionesCrearVestuario';

const CrearVestuario = ({ navigation, route }) => {
  const { regionId: initialRegionId, nombreRegion: initialRegionName } = route.params || {};

  const {
    tipo, setTipo,
    talla, setTalla, 
    genero, setGenero,
    disponible, setDisponible,
    folio, setFolio,
    imageUri, pickImage,
    loading, handleGuardarVestuario,
  } = FuncionesCrearVestuario(initialRegionId);

  const GENDER_OPTIONS = ['Hombre', 'Mujer', 'Niño', 'Niña', 'Unisex'];
  const TALLA_OPTIONS = ['Extra Chico', 'Chico', 'Mediano', 'Grande', 'Extra Grande', 'Unitalla'];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Nuevo Vestuario {initialRegionName ? `para ${initialRegionName}` : '(Región no especificada)'}
        </Text>

        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
          <Text style={styles.imagePickerText}>
            {imageUri ? "Cambiar Imagen" : "Seleccionar Imagen de Vestuario"}
          </Text>
        </TouchableOpacity>
        {imageUri && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: imageUri }} style={styles.imagePreview} resizeMode="contain"/>
          </View>
        )}

       <TextInput style={styles.input} placeholder="Tipo de Vestuario (Ej: Gala, Ranchero)" value={tipo} onChangeText={setTipo} />
        <TextInput style={styles.input} placeholder="Folio" value={folio} onChangeText={setFolio} />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={talla}
            onValueChange={(itemValue) => setTalla(itemValue)}
            style={styles.picker}
            prompt="Selecciona Talla"
          >
            <Picker.Item label="Selecciona Talla..." value="" style={styles.pickerItemDefault}/>
            {TALLA_OPTIONS.map(opt => <Picker.Item key={opt} label={opt} value={opt} style={styles.pickerItem}/>)}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={genero}
            onValueChange={(itemValue) => setGenero(itemValue)}
            style={styles.picker}
            prompt="Selecciona Género"
          >
            <Picker.Item label="Selecciona Género..." value="" style={styles.pickerItemDefault}/>
            {GENDER_OPTIONS.map(opt => <Picker.Item key={opt} label={opt} value={opt} style={styles.pickerItem}/>)}
          </Picker>
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Disponible:</Text>
          <Switch
            trackColor={{ false: "#e0e0e0", true: "#81c784" }}
            thumbColor={disponible ? "#4caf50" : "#f5f5f5"}
            ios_backgroundColor="#e0e0e0"
            onValueChange={setDisponible}
            value={disponible}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleGuardarVestuario}
          disabled={loading || !initialRegionId} 
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Guardar Vestuario</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F9F9F9',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 12,
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  pickerContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
  },
  picker: {
    height: Platform.OS === 'ios' ? 180 : 50, 
    width: '100%',
    color: '#333', 
  },
  pickerItem: { 
   fontSize: 16,
   color: '#333',
  },
  pickerItemDefault: { 
    color: '#A0A0A0',
  },
  imagePickerButton: {
    backgroundColor: '#5C6BC0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePickerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePreview: {
    width: 150,
    height: 200,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 15,
    paddingHorizontal: 5, 
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#A4CFFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CrearVestuario;
*/