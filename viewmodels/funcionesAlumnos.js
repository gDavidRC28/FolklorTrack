import { useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import appFirebase from "../firebaseConfig";
import Alumno from "../models/ModeloAlumno";

const obtenerAlumnos = async () => {
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

const useAlumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarAlumnos = async () => {
      try {
        const datos = await obtenerAlumnos();
        setAlumnos(datos.map((item) => new Alumno(item)));
      } catch (error) {
        console.error("Error cargando alumnos:", error);
      } finally {
        setLoading(false);
      }
    };

    cargarAlumnos();
  }, []);

  return { alumnos, loading };
};

export default useAlumnos;