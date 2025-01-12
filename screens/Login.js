import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import appFirebase from "../firebaseConfig";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const auth = getAuth(appFirebase);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Inicio de sesión exitoso
        const user = userCredential.user;
        Alert.alert("Éxito", "Inicio de sesión exitoso");
        props.navigation.navigate("Catalogo"); // Navegar al catálogo
      })
      .catch((error) => {
        // Manejar errores
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error", `Código: ${errorCode}\nMensaje: ${errorMessage}`);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Bailarines.jpg")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Entrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#A9A9A9"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail} // Actualizar el estado del correo
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#A9A9A9"
        secureTextEntry
        value={password}
        onChangeText={setPassword} // Actualizar el estado de la contraseña
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
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
