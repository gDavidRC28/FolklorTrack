import { useState } from 'react';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';
import appFirebase from '../firebaseConfig';
import ModeloAlumno from '../models/ModeloAlumno';

const agregarAlumno = async (alumnoData) => {
  try {
    const db = getFirestore(appFirebase);
    const alumno = new ModeloAlumno(alumnoData);
    await addDoc(collection(db, 'Alumnos'), { ...alumno });
  } catch (error) {
    console.error('Error al agregar alumno:', error);
    throw error;
  }
};

const funcionesCrearAlumno = (navigation) => {
  const [nombre, setNombre] = useState('');
  const [genero, setGenero] = useState('');
  const [edad, setEdad] = useState('');
  const [talla, setTalla] = useState('');
  const [fechaInicio, setFechaInicio] = useState(Timestamp.fromDate(new Date()));
  const [show, setShow] = useState(false);

  const handleChangeText = (value, field) => {
    if (field === 'nombre') setNombre(value);
    if (field === 'genero') setGenero(value);
    if (field === 'edad') setEdad(value);
    if (field === 'talla') setTalla(value);
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setShow(false);
      setFechaInicio(selectedDate.toLocaleDateString());
    }
  };

  const handleAgregarAlumno = async () => {
    if (!nombre || !fechaInicio || !genero || !edad || !talla) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      const nuevoAlumno = new ModeloAlumno({
        nombre,
        edad,
        genero,
        talla,
        fecha_inicio: fechaInicio
      });

      await agregarAlumno(nuevoAlumno);

      alert('Alumno agregado correctamente');
      navigation.goBack();
    } catch (error) {
      alert(`Error al agregar alumno: ${error.message}`);
    }
  };

  return {
    nombre,
    genero,
    edad,
    talla,
    fechaInicio,
    show,
    setShow,
    handleChangeText,
    handleDateChange,
    handleAgregarAlumno
  };
};

export default funcionesCrearAlumno;