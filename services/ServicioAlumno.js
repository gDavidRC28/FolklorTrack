import { getFirestore, collection, getDocs } from "firebase/firestore";
import appFirebase from "../firebaseConfig";

export const obtenerAlumnos = async () => {
  try {
    const db = getFirestore(appFirebase);
    const alumnosCollection = collection(db, "Alumnos");
    const snapshot = await getDocs(alumnosCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error al obtener alumnos:", error);
    throw error;
  }
};
