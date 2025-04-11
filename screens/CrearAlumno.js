import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import appFirebase from '../firebaseConfig'; // Asegúrate de tener la configuración de Firebase correctamente importada.
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoct } from 'firebase/firestore';
const db=getFirestore(appFirebase)

export default function CrearAlumno(props) {
  const [nombre, setNombre] = useState('');
  const [fechaInicio, setFechaInicio] = useState('');
  const [genero, setGenero] = useState('');
  const [edad, setEdad] = useState('');
  const [talla, setTalla] = useState('');
  
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');
  
  const handleChangeText = (value, field) => {
    if (field === 'nombre') setNombre(value);
    if (field === 'genero') setGenero(value);
    if (field === 'edad') setEdad(value);
    if (field === 'talla') setTalla(value);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    setFechaInicio(fDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const handleAddAlumno = async () => {
    if (!nombre || !fechaInicio || !genero || !edad || !talla) {
      Alert.alert('Error', 'Por favor, complete todos los campos');
      return;
    }

    try {
      const db = getFirestore(appFirebase);
      const alumno = {
        nombre,
        fecha_inicio: fechaInicio,
        genero,
        edad,
        talla
      };
      await addDoc(collection(db, 'Alumnos'), alumno);
      Alert.alert('Éxito', 'Alumno agregado correctamente');
      setNombre('');
      setFechaInicio('');
      setGenero('');
      setEdad('');
      setTalla('');
      props.navigation.goBack();
    } catch (error) {
      console.error('Error al agregar alumno:', error.message);
      Alert.alert('Error', `Hubo un problema al agregar el alumno: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={(value) => handleChangeText(value, 'nombre')}
      />
      <TextInput
        style={styles.input}
        placeholder="Género"
        value={genero}
        onChangeText={(value) => handleChangeText(value, 'genero')}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={(value) => handleChangeText(value, 'edad')}
      />
      <TextInput
        style={styles.input}
        placeholder="Talla"
        value={talla}
        onChangeText={(value) => handleChangeText(value, 'talla')}
      />

      {/* Contenedor para fecha de inicio */}
      <View style={styles.inputFecha}>
        <TextInput
          style={styles.textoFecha}
          placeholder="Fecha de Inicio"
          value={fechaInicio}
        />
        <TouchableOpacity
          style={styles.botonFecha}
          onPress={() => showMode('date')}
        >
          <Text style={styles.subtitulo}>Fecha de Inicio</Text>
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      <TouchableOpacity style={styles.botonEnviar} onPress={handleAddAlumno}>
        <Text style={styles.textoEnviar}>Agregar Alumno</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
    width: '80%',
  },
  inputFecha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '80%',
  },
  textoFecha: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    flex: 1,
    borderRadius: 5,
    fontSize: 16,
    textAlign: 'center',
  },
  botonFecha: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  subtitulo: {
    color: 'white',
    fontSize: 16,
  },
  botonEnviar: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  textoEnviar: {
    color: 'white',
    fontSize: 18,
  },
});