import { getAuth, signOut } from "firebase/auth";
import appFirebase from "../firebaseConfig";

export const handleLogout = async (navigation) => {
  const auth = getAuth(appFirebase);

  try {
    await signOut(auth);
    alert("Has cerrado sesión exitosamente");
    navigation.navigate("Login");
  } catch (error) {
    // Manejar errores de cierre de sesión
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(`Código: ${errorCode}\nMensaje: ${errorMessage}`);
  }
};
