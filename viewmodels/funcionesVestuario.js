import { useState } from 'react';
import { obtenerVestuario, obtenerVestuarioDisponible } from '../services/ServicioVestuario';
import ModeloVestuario from '../models/ModeloVestuario';

export default function funcionesVestuario(estado) {
  const [vestuarios, setVestuarios] = useState([]);

  const cargarVestuario = async () => {
    try {
      const data = await obtenerVestuario(estado);
      setVestuarios(data.map(v => new ModeloVestuario(v.id, v.disponibilidad, v.genero, v.talla, v.tipo)));
    } catch (error) {
      console.error('Error en ViewModel:', error.message);
    }
  };

  const actualizarDisponibilidad = async (id, currentDisponibilidad) => {
    try {
      const newDisponibilidad = await obtenerVestuarioDisponible(id, currentDisponibilidad);
      setVestuarios(prev => prev.map(v => v.id === id ? { ...v, disponibilidad: newDisponibilidad } : v));
    } catch (error) {
      console.error('Error en ViewModel al actualizar:', error.message);
    }
  };

  return { vestuarios, cargarVestuario, actualizarDisponibilidad };
}
