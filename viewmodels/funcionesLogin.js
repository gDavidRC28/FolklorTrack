import { useState } from "react";
import { Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import appFirebase from "../firebaseConfig";

class ServicioAutenticacion {
  constructor() {
    this.auth = getAuth(appFirebase);
  }

  login(email, password) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    try {
      await signOut(this.auth);
      return { success: true, message: "Has cerrado sesión exitosamente" };
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      return { success: false, message: `Código: ${error.code}\nMensaje: ${error.message}` };
    }
  }
}

// Instancia global para ser usada en cualquier parte de la app
const servicioAutenticacion = new ServicioAutenticacion();

export const handleLogout = async (navigation) => {
  const result = await servicioAutenticacion.logout();
  if (result.success) {
    Alert.alert("Éxito", result.message);
    navigation.navigate("Login");
  } else {
    Alert.alert("Error", result.message);
  }
};

export default function funcionesLogin(navigation) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await servicioAutenticacion.login(email, password);
      Alert.alert("Bienvenido", "Inicio de sesión exitoso");
      navigation.navigate("Catalogo");
    } catch (error) {
      Alert.alert("Error", `Código: ${error.code}\nMensaje: ${error.message}`);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
  };
}