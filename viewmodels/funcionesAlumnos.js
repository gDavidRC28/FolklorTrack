import { useState, useEffect } from "react";
import { obtenerAlumnos } from "../services/ServicioAlumno";
import Alumno from "../models/ModeloAlumno";

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

  return { alumnos, loading};
};
export default useAlumnos;
