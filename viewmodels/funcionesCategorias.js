import { useState } from 'react';
import { obtenerCategorias } from '../services/ServicioCategoria';
import ModeloCategoria from '../models/ModeloCategoria';

export default function funcionesCategorias() {
  const [categorias, setCategorias] = useState([]);

  const cargarCategorias = async () => {
    try {
      const categoriasData = await obtenerCategorias();
      setCategorias(categoriasData.map(c => new ModeloCategoria(c.id, c.estado)));
    } catch (error) {
      console.error('Error en ViewModel:', error.message);
    }
  };

  return { categorias, cargarCategorias };
}
