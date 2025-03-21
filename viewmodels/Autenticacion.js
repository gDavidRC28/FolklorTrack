import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import appFirebase from "../firebaseConfig";

class ServicioAutenticacion {
  constructor() {
    this.auth = getAuth(appFirebase);
  }

  login(email, password) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout(navigation) {
    try {
      await signOut(this.auth);
      alert("Has cerrado sesión exitosamente");
      navigation.navigate("Login");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Código: ${errorCode}\nMensaje: ${errorMessage}`);
    }
  }
}

export const autenticacion = new ServicioAutenticacion();
