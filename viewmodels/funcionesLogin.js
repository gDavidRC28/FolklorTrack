import { useState } from "react";
import { Alert } from "react-native";
import { supabase } from "../supabaseClient";

class ServicioAutenticacion {

  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      throw error;
    }
    return data;
  }

  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error al cerrar sesión en Supabase:", error);
      return { success: false, message: `Error: ${error.message}` };
    }
    return { success: true, message: "Has cerrado sesión exitosamente" };
  }
}

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
    if (!email || !password) {
      Alert.alert("Atención", "Por favor, ingresa correo y contraseña.");
      return;
    }
    try {
      await servicioAutenticacion.login(email, password);
      Alert.alert("Bienvenido", "Inicio de sesión exitoso");
      navigation.navigate("Catalogo");
    } catch (error) {
      Alert.alert("Error de inicio de sesión", error.message || "Ocurrió un error desconocido.");
      console.error("Error en handleLogin:", error);
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