import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import useAlumnos from "../viewmodels/funcionesAlumnos";

export default function Alumnos({ navigation }) {
  const { alumnos, loading } = useAlumnos();

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {alumnos.map((alumno) => (
          <TouchableOpacity
            key={alumno.id}
            style={styles.card}
            onPress={() => navigation.navigate("DetalleAlumno", { alumnoId: alumno.id })}
          >
            <Text style={styles.text}>{alumno.nombre}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CrearAlumno")}>
        <Text style={styles.buttonText}>Agregar alumno</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F9F9F9',
      paddingTop: 20,
      paddingHorizontal: 20,
    },
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    circle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 16,
      color: '#333333',
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
      fontSize: 16,
    },
    button: {
      width: "100%",
      height: 50,
      backgroundColor: "#007BFF",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
    }
  });
