import { useState } from "react";
import { Alert } from "react-native";
import ServicioAutenticacion from "../services/ServicioAutenticacion";

export default function funcionesLogin(navigation) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await ServicioAutenticacion.login(email, password);
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
