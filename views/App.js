import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import funcionesApp from './viewmodels/funcionesApp';

export default function App() {
  funcionesApp(); // Manejo de permisos

  return <AppNavigator />;
}
