import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../views/Login';
import Catalogo from '../views/Catalogo';
import CrearEvento from '../views/CrearEvento';
import CrearVestuario from '../views/CrearVestuario';
import CrearAlumno from '../views/CrearAlumno';
import Eventos from '../views/Eventos';
import Alumnos from '../views/Alumnos';
import Vestuario from '../views/Vestuario';
import Estados from '../views/Categorias';
import CrearEstado from '../views/CrearCategorias';
import DetalleAlumno from '../views/DetalleAlumno';
import DetalleEvento from '../views/DetalleEvento';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ title: "LOGIN", headerTitleAlign: "center" }} />
      <Stack.Screen name="Catalogo" component={Catalogo} options={{ title: "CATALOGO", headerTitleAlign: "center", headerLeft: () => null }} />
      <Stack.Screen name="Eventos" component={Eventos} options={{ title: "EVENTOS", headerTitleAlign: "center" }} />
      <Stack.Screen name="Alumnos" component={Alumnos} options={{ title: "ALUMNOS", headerTitleAlign: "center" }} />
      <Stack.Screen name="Categorias" component={Estados} options={{ title: "CATEGORIAS", headerTitleAlign: "center" }} />
      <Stack.Screen name="Vestuario" component={Vestuario} options={{ title: "VESTUARIO", headerTitleAlign: "center" }} />
      <Stack.Screen name="CrearEvento" component={CrearEvento} options={{ title: "AGREGAR EVENTO", headerTitleAlign: "center" }} />
      <Stack.Screen name="CrearVestuario" component={CrearVestuario} options={{ title: "AGREGAR VESTUARIO" }} />
      <Stack.Screen name="CrearEstado" component={CrearEstado} options={{ title: "AGREGAR CATEGORIA" }} />
      <Stack.Screen name="CrearAlumno" component={CrearAlumno} options={{ title: "AGREGAR ALUMNO", headerTitleAlign: "center" }} />
      <Stack.Screen name="DetalleAlumno" component={DetalleAlumno} options={{ title: "INFORMACIÓN ALUMNO", headerTitleAlign: "center" }} />
      <Stack.Screen name="DetalleEvento" component={DetalleEvento} options={{ title: "INFORMACIÓN EVENTO", headerTitleAlign: "center" }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;