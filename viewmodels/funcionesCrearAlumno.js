import { useState } from 'react';
import ServicioCrearAlumno from '../services/ServicioCrearAlumno';
import { Timestamp } from 'firebase/firestore';

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

  const agregarAlumno = async () => {
    if (!nombre || !fechaInicio || !genero || !edad || !talla) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      await ServicioCrearAlumno.agregarAlumno({ nombre, fecha_inicio: fechaInicio, genero, edad, talla });
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
    agregarAlumno,
  };
};

export default funcionesCrearAlumno;