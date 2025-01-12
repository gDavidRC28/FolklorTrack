import React, { useState, useEffect } from "react";
import { Alert } from 'react-native';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as ImagePicker from 'expo-image-picker';
import Login from "./screens/Login";
import Catalogo from "./screens/Catalogo";
import CrearEvento from "./screens/CrearEvento";
import CrearVestuario from "./screens/CrearVestuario";
import CrearAlumno from "./screens/CrearAlumno";
import Eventos from "./screens/Eventos";
import Alumnos from "./screens/Alumnos";
import Vestuario from "./screens/Vestuario";
import Estados from "./screens/Estados";
import CrearEstado from "./screens/CrearEstado";
import detalleAlumno from "./screens/DetalleAlumno";
import detalleEvento from "./screens/DetalleEvento";

export default function App() {

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se requiere acceso a la galería para seleccionar una imagen');
      }
    };
    getPermissions();
  }, []); 

  const Stack = createStackNavigator();

  function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{
              title: "LOGIN", headerTitleAlign: "center"}}/>
            <Stack.Screen name="Catalogo" component={Catalogo} options={{
              title: "CATALOGO", headerTitleAlign: "center",  headerLeft: () => null}}/>
            <Stack.Screen name="Eventos" component={Eventos} options={{
              title: "EVENTOS", headerTitleAlign: "center" }}/>
            <Stack.Screen name="Alumnos" component={Alumnos} options={{
              title: "ALUMNOS", headerTitleAlign: "center"}}/>
            <Stack.Screen name="Categorias" component={Estados} options={{
              title: "CATEGORIAS", headerTitleAlign: "center"}}/>
            <Stack.Screen name="Vestuario" component={Vestuario} options={{
              title: "VESTUARIO", headerTitleAlign: "center"}}/>
            <Stack.Screen name="CrearEvento" component={CrearEvento} options={{
            title: "AGREGAR EVENTO", headerTitleAlign: "center"}}/>
            <Stack.Screen name="CrearVestuario" component={CrearVestuario} options={{
            title:"AGREGAR VESTUARIO"}}/>
            <Stack.Screen name="CrearEstado" component={CrearEstado} options={{
            title:"AGREGAR CATEGORIA"}}/>
            <Stack.Screen name="CrearAlumno" component={CrearAlumno} options={{
            title:"AGREGAR ALUMNO", headerTitleAlign: "center"}}/>
            <Stack.Screen name="detalleAlumno" component={detalleAlumno} options={{
            title:"INFORMACIÓN ALUMNO", headerTitleAlign: "center"}}/>
            <Stack.Screen name="detalleEvento" component={detalleEvento} options={{
            title:"INFORMACION EVENTO", headerTitleAlign: "center"}}/>
          </Stack.Navigator>
    );
  }

  return (
    //Se retorna el stack al contenedor para que navegue entre las ventanas importadas y agregadas
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});