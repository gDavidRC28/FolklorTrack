import { useState } from 'react';
import { obtenerEventos } from '../services/ServicioEventos';
import ModeloEvento from '../models/ModeloEvento';

export default function funcionesEventos() {
  const [eventos, setEventos] = useState([]);

  const cargarEventos = async () => {
    try {
      const datosEventos = await obtenerEventos();
      setEventos(datosEventos.map(e => new ModeloEvento(e.id, e.Titulo, e.Fecha, e.Lugar, e.Detalles)));
    } catch (error) {
      console.error('Error en ViewModel:', error.message);
    }
  };

  return { eventos, cargarEventos };
}
