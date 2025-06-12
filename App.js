import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import funcionesLogin from './viewmodels/funcionesLogin';

export default function App() {
  funcionesLogin(); 

  return <AppNavigator />;
}