import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import appFirebase from "../firebaseConfig";

class servicioAutenticacion {
  constructor() {
    this.auth = getAuth(appFirebase);
  }

  login(email, password) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}

export default new servicioAutenticacion();
