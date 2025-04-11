import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import appFirebase from "../firebaseConfig";

export default function Catalogo(props) {
  const handleLogout = () => {
    const auth = getAuth(appFirebase);

    signOut(auth)
      .then(() => {
        // Cierre de sesión exitoso
        Alert.alert("Éxito", "Has cerrado sesión exitosamente");
        props.navigation.navigate("Login"); // Redirigir al Login
      })
      .catch((error) => {
        // Manejar errores de cierre de sesión
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error", `Código: ${errorCode}\nMensaje: ${errorMessage}`);
      });
  };

  return (
    <View style={styles.container}>
      {/* Catálogo */}
      <TouchableOpacity
        style={[styles.card, { backgroundColor: "#D9EFFF" }]}
        onPress={() => props.navigation.navigate('Categorias')}
      >
        <Image source={require("../assets/vestuario.png")} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Categorias</Text>
          <Text style={styles.subtitle}>Información</Text>
        </View>
      </TouchableOpacity>

      {/* Alumnos */}
      <TouchableOpacity
        style={[styles.card, { backgroundColor: "#FFFFFF" }]}
        onPress={() => props.navigation.navigate('Alumnos')}
      >
        <Image source={require("../assets/alumnos.png")} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Alumnos</Text>
          <Text style={styles.subtitle}>Información</Text>
        </View>
      </TouchableOpacity>

      {/* Eventos */}
      <TouchableOpacity
        style={[styles.card, { backgroundColor: "#FFD9F2" }]}
        onPress={() => props.navigation.navigate('Eventos')}
      >
        <Image source={require("../assets/eventos.png")} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Eventos</Text>
          <Text style={styles.subtitle}>Información</Text>
        </View>
      </TouchableOpacity>

      {/* Botón de Cerrar Sesión */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  subtitle: {
    fontSize: 14,
    color: "#666666",
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
