import React from "react";
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import funcionesLogin from "../viewmodels/funcionesLogin";

export default function Login({ navigation }) {
  const { email, setEmail, password, setPassword, handleLogin, loading } = funcionesLogin(navigation);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/Bailarines.jpg")} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Entrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        editable={!loading} 
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={loading} 
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" /> 
        ) : (
          <Text style={styles.buttonText}>Ingresar</Text> 
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#F5F5F5",
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
  },
});
