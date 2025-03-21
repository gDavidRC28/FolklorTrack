import React from 'react'; 
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import funcionesCrearAlumno from '../viewmodels/funcionesCrearAlumno';

export default function CrearAlumno({ navigation }) {
  const {
    nombre, genero, edad, talla, fechaInicio, fotoUrl, show, setShow,
    handleChangeText, handleDateChange, seleccionarImagen, promptAsync,
    agregarAlumno
  } = funcionesCrearAlumno(navigation);

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={(value) => handleChangeText(value, 'nombre')} />
      <TextInput style={styles.input} placeholder="Género" value={genero} onChangeText={(value) => handleChangeText(value, 'genero')} />
      <TextInput style={styles.input} placeholder="Edad" value={edad} onChangeText={(value) => handleChangeText(value, 'edad')} />
      <TextInput style={styles.input} placeholder="Talla" value={talla} onChangeText={(value) => handleChangeText(value, 'talla')} />

      <View style={styles.inputFecha}>
        <TextInput style={styles.textoFecha} placeholder="Fecha de Inicio" value={fechaInicio} editable={false} />
        <TouchableOpacity style={styles.botonFecha} onPress={() => setShow(true)}>
          <Text style={styles.subtitulo}>Seleccionar Fecha</Text>
        </TouchableOpacity>
      </View>
      {show && <DateTimePicker value={new Date(fechaInicio)} mode="date" display="default" onChange={handleDateChange} />}

      <TouchableOpacity style={styles.botonEnviar} onPress={agregarAlumno}>
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
