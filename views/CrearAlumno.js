import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, Platform, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'; 
import FuncionesCrearAlumno from '../viewmodels/funcionesCrearAlumno'; 

export default function CrearAlumno({ navigation }) {
  const {
    email, setEmail,
    password, setPassword,
    nombreAlumno, setNombreAlumno,
    genero, setGenero,
    talla, setTalla,
    fechaNacimiento, setFechaNacimiento,
    fechaInicio, setFechaInicio,
    imageUri, pickImage,
    showNacimientoPicker, setShowNacimientoPicker,
    showInicioPicker, setShowInicioPicker,
    onFechaNacimientoChange, onFechaInicioChange,
    loading,
    handleCrearAlumnoCompleto,
  } = FuncionesCrearAlumno(navigation); 

  const GENDER_OPTIONS = ['Hombre', 'Mujer', 'Otro'];
  const TALLA_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Registrar Nuevo Alumno</Text>

        <Text style={styles.sectionTitle}>Datos de Cuenta</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo Electrónico del Alumno"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña (mín. 6 caracteres)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#888"
        />

        <Text style={styles.sectionTitle}>Datos Personales</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre Completo del Alumno"
          value={nombreAlumno}
          onChangeText={setNombreAlumno}
          placeholderTextColor="#888"
        />

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={genero}
            onValueChange={(itemValue) => setGenero(itemValue)}
            style={styles.picker}
            prompt="Selecciona Género"
          >
            <Picker.Item label="Selecciona Género" value="" style={styles.pickerItemDefault}/>
            {GENDER_OPTIONS.map(opt => <Picker.Item key={opt} label={opt} value={opt} style={styles.pickerItem}/>)}
          </Picker>
        </View>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={talla}
            onValueChange={(itemValue) => setTalla(itemValue)}
            style={styles.picker}
            prompt="Selecciona Talla"
          >
            <Picker.Item label="Selecciona Talla" value="" style={styles.pickerItemDefault}/>
            {TALLA_OPTIONS.map(opt => <Picker.Item key={opt} label={opt} value={opt} style={styles.pickerItem}/>)}
          </Picker>
        </View>

        <Text style={styles.label}>Fecha de Nacimiento:</Text>
        <TouchableOpacity onPress={() => setShowNacimientoPicker(true)} style={styles.dateDisplay}>
            <Text style={styles.dateText}>
                {fechaNacimiento ? fechaNacimiento.toLocaleDateString('es-ES') : 'Seleccionar Fecha'}
            </Text>
        </TouchableOpacity>
        {showNacimientoPicker && (
          <DateTimePicker
            value={fechaNacimiento || new Date(new Date().setFullYear(new Date().getFullYear() - 12))} 
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onFechaNacimientoChange}
            maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 5))} 
          />
        )}
        {Platform.OS === 'ios' && showNacimientoPicker && <Button title="Confirmar Fecha" onPress={() => setShowNacimientoPicker(false)} />}

        <Text style={styles.label}>Fecha de Inicio en el Grupo:</Text>
         <TouchableOpacity onPress={() => setShowInicioPicker(true)} style={styles.dateDisplay}>
            <Text style={styles.dateText}>
                {fechaInicio.toLocaleDateString('es-ES')}
            </Text>
        </TouchableOpacity>
        {showInicioPicker && (
          <DateTimePicker
            value={fechaInicio}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onFechaInicioChange}
          />
        )}
        {Platform.OS === 'ios' && showInicioPicker && <Button title="Confirmar Fecha" onPress={() => setShowInicioPicker(false)} />}

        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
          <Text style={styles.imagePickerText}>
            {imageUri ? "Cambiar Foto del Alumno" : "Seleccionar Foto del Alumno"}
          </Text>
        </TouchableOpacity>
        {imageUri && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: imageUri }} style={styles.imagePreview} resizeMode="cover"/>
          </View>
        )}

        <TouchableOpacity
          style={[styles.buttonGuardar, loading && styles.buttonDisabled]}
          onPress={handleCrearAlumnoCompleto}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Registrar Alumno</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F9F9F9',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginTop: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
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
    height: Platform.OS === 'ios' ? 120 : 50, 
    width: '100%',
  },
  pickerItem: {},
  pickerItemDefault: { color: '#A0A0A0' },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    marginTop: 10,
  },
  dateDisplay: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 5, 
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  imagePickerButton: {
    backgroundColor: '#5C6BC0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
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
    width: 120, 
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E0E0E0',
    borderWidth: 2,
    borderColor: '#5C6BC0',
  },
  buttonGuardar: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 25,
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